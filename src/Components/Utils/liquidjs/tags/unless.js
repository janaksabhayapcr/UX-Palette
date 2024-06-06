const Liquid = require('..');

module.exports = function (liquid) {
  liquid.registerTag('unless', {
    parse: function (tagToken, remainTokens) {
      this.templates = [];
      this.elseTemplates = [];
      var p;
      var stream = liquid.parser
        .parseStream(remainTokens)
        .on('start', function (x) {
          p = this.templates;
          this.cond = tagToken.args;
        })
        .on('tag:else', function () {
          return (p = this.elseTemplates);
        })
        .on('tag:endunless', function (token) {
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
      var cond = Liquid.evalExp(this.cond, scope);
      return Liquid.isFalsy(cond) ? liquid.renderer.renderTemplates(this.templates, scope) : liquid.renderer.renderTemplates(this.elseTemplates, scope);
    },
  });
};
