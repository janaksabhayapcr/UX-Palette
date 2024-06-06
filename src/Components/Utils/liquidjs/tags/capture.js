const Liquid = require('..');
const lexical = Liquid.lexical;
const re = new RegExp('(' + lexical.identifier.source + ')');
const assert = require('../src/util/assert.js');

module.exports = function (liquid) {
  liquid.registerTag('capture', {
    parse: function (tagToken, remainTokens) {
      var _this = this;
      var match = tagToken.args.match(re);
      assert(match, tagToken.args + ' not valid identifier');

      this.variable = match[1];
      this.templates = [];

      var stream = liquid.parser.parseStream(remainTokens);
      stream
        .on('tag:endcapture', function (token) {
          return stream.stop();
        })
        .on('template', function (tpl) {
          return _this.templates.push(tpl);
        })
        .on('end', function (x) {
          throw new Error('tag ' + tagToken.raw + ' not closed');
        });
      stream.start();
    },
    render: function (scope, hash) {
      var _this = this;
      return liquid.renderer.renderTemplates(_this.templates, scope).then(function (html) {
        scope.set(_this.variable, html);
      });
    },
  });
};
