const Liquid = require('..');

module.exports = function (liquid) {
  liquid.registerTag('case', {
    parse: function (tagToken, remainTokens) {
      var _this = this;
      this.cond = tagToken.args;
      this.cases = [];
      this.elseTemplates = [];

      var p = [];
      var stream = liquid.parser
        .parseStream(remainTokens)
        .on('tag:when', function (token) {
          _this.cases.push({
            val: token.args,
            templates: (p = []),
          });
        })
        .on('tag:else', function () {
          return (p = _this.elseTemplates);
        })
        .on('tag:endcase', function (token) {
          return stream.stop();
        })
        .on('template', function (tpl) {
          return p.push(tpl);
        })
        .on('end', function (x) {
          throw new Error('tag ' + tagToken.raw + ' not closed');
        });

      stream.start();
    },

    render: function (scope, hash) {
      var _this = this;
      for (var i = 0; i < this.cases.length; i++) {
        var branch = _this.cases[i];
        var val = Liquid.evalExp(branch.val, scope);
        var cond = Liquid.evalExp(_this.cond, scope);
        if (val === cond) {
          return liquid.renderer.renderTemplates(branch.templates, scope);
        }
      }
      return liquid.renderer.renderTemplates(_this.elseTemplates, scope);
    },
  });
};
