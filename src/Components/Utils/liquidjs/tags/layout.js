const Liquid = require('..');
const Promise = require('any-promise');
const lexical = Liquid.lexical;
const assert = require('../src/util/assert.js');
const staticFileRE = /\S+/;

/*
 * blockMode:
 * * "store": store rendered html into blocks
 * * "output": output rendered html
 */

module.exports = function (liquid) {
  liquid.registerTag('layout', {
    parse: function (token, remainTokens) {
      var match = staticFileRE.exec(token.args);
      if (match) {
        this.staticLayout = match[0];
      }

      match = lexical.value.exec(token.args);
      if (match) {
        this.layout = match[0];
      }

      this.tpls = liquid.parser.parse(remainTokens);
    },
    render: function (scope, hash) {
      var layout = scope.opts.dynamicPartials ? Liquid.evalValue(this.layout, scope) : this.staticLayout;
      assert(layout, 'cannot apply layout with empty filename');

      // render the remaining tokens immediately
      scope.opts.blockMode = 'store';
      return (
        liquid.renderer
          .renderTemplates(this.tpls, scope)
          .then(function (html) {
            if (scope.opts.blocks[''] === undefined) {
              scope.opts.blocks[''] = html;
            }
            return liquid.getTemplate(layout, scope.opts.root);
          })
          .then(function (templates) {
            // push the hash
            scope.push(hash);
            scope.opts.blockMode = 'output';
            return liquid.renderer.renderTemplates(templates, scope);
          })
          // pop the hash
          .then(function (partial) {
            scope.pop();
            return partial;
          })
      );
    },
  });

  liquid.registerTag('block', {
    parse: function (token, remainTokens) {
      var _this = this;
      var match = /\w+/.exec(token.args);
      this.block = match ? match[0] : '';

      this.tpls = [];
      var stream = liquid.parser
        .parseStream(remainTokens)
        .on('tag:endblock', function () {
          return stream.stop();
        })
        .on('template', function (tpl) {
          return _this.tpls.push(tpl);
        })
        .on('end', function () {
          throw new Error('tag ' + token.raw + ' not closed');
        });
      stream.start();
    },
    render: function (scope) {
      var _this = this;
      return Promise.resolve(scope.opts.blocks[this.block])
        .then(function (html) {
          return html === undefined
            ? // render default block
              liquid.renderer.renderTemplates(this.tpls, scope)
            : // use child-defined block
              html;
        })
        .then(function (html) {
          if (scope.opts.blockMode === 'store') {
            scope.opts.blocks[_this.block] = html;
            return '';
          }
          return html;
        });
    },
  });
};
