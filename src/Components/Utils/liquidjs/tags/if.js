const Liquid = require('..');

module.exports = function (liquid) {
  liquid.registerTag('if', {
    parse: function parse(tagToken, remainTokens) {
      var _this = this;
      this.branches = [];
      this.elseTemplates = [];

      var p;
      var stream = liquid.parser
        .parseStream(remainTokens)
        .on('start', function () {
          return _this.branches.push({
            cond: tagToken.args,
            templates: (p = []),
          });
        })
        .on('tag:elsif', function (token) {
          _this.branches.push({
            cond: token.args,
            templates: (p = []),
          });
        })
        .on('tag:else', function () {
          return (p = _this.elseTemplates);
        })
        .on('tag:endif', function (token) {
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
      for (var i = 0; i < this.branches.length; i++) {
        var branch = this.branches[i];
        var cond = Liquid.evalExp(branch.cond, scope);
        if (Liquid.isTruthy(cond)) {
          return liquid.renderer.renderTemplates(branch.templates, scope);
        }
      }
      return liquid.renderer.renderTemplates(this.elseTemplates, scope);
    },
  });
};
