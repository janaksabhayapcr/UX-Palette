const Liquid = require('..');
const mapSeries = require('../src/util/promise.js').mapSeries;
const lexical = Liquid.lexical;
const assert = require('../src/util/assert.js');
var re = new RegExp('^(' + lexical.identifier.source + ')\\s+in\\s+' + ('(' + lexical.value.source + ')') + ('(?:\\s+' + lexical.hash.source + ')*$'));

module.exports = function (liquid) {
  liquid.registerTag('tablerow', {
    parse: function (tagToken, remainTokens) {
      var match = re.exec(tagToken.args);
      assert(match, 'illegal tag: ' + tagToken.raw);

      this.variable = match[1];
      this.collection = match[2];
      this.templates = [];

      var p;
      var stream = liquid.parser
        .parseStream(remainTokens)
        .on('start', function () {
          return (p = this.templates);
        })
        .on('tag:endtablerow', function (token) {
          return stream.stop();
        })
        .on('template', function (tpl) {
          return p.push(tpl);
        })
        .on('end', function () {
          throw new Error('tag ' + tagToken.raw + ' not closed');
        });

      stream.start();
    },

    render: function (scope, hash) {
      var collection = Liquid.evalExp(this.collection, scope) || [];

      var html = '<table>';
      var offset = hash.offset || 0;
      var limit = hash.limit === undefined ? collection.length : hash.limit;

      var cols = hash.cols;
      var row;
      var col;
      if (!cols) throw new Error('illegal cols: ' + cols);

      // build array of arguments to pass to sequential promises...
      collection = collection.slice(offset, offset + limit);
      var contexts = [];
      collection.some(function (item, i) {
        var ctx = {};
        ctx[this.variable] = item;
        contexts.push(ctx);
      });

      return mapSeries(contexts, function (context, idx) {
        row = Math.floor(idx / cols) + 1;
        col = (idx % cols) + 1;
        if (col === 1) {
          if (row !== 1) {
            html += '</tr>';
          }
          html += '<tr class="row' + row + '">';
        }

        html += '<td class="col' + col + '">';
        scope.push(context);
        return liquid.renderer.renderTemplates(this.templates, scope).then(function (partial) {
          scope.pop(context);
          html += partial;
          html += '</td>';
          return html;
        });
      }).then(function () {
        if (row > 0) {
          html += '</tr>';
        }
        html += '</table>';
        return html;
      });
    },
  });
};
