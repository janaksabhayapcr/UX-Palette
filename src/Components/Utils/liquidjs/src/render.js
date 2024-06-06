const Syntax = require('./syntax.js');
const Promise = require('any-promise');
const mapSeries = require('./util/promise.js').mapSeries;
const RenderBreakError = require('./util/error.js').RenderBreakError;
const RenderError = require('./util/error.js').RenderError;
const assert = require('./util/assert.js');

var render = {
  renderTemplates: function renderTemplates(templates, scope) {
    assert(scope, 'unable to evalTemplates: scope undefined');
    var _this = this;
    var html = '';
    return mapSeries(templates, function (tpl) {
      return renderTemplate
        .call(this, tpl)
        .then(function (partial) {
          return (html += partial);
        })
        .catch(function (e) {
          if (e instanceof RenderBreakError) {
            e.resolvedHTML = html;
            throw e;
          }
          throw new RenderError(e, tpl);
        });
    }).then(function () {
      return html;
    });

    function renderTemplate(template) {
      if (template.type === 'tag') {
        return _this.renderTag(template, scope).then(function (partial) {
          return partial === undefined ? '' : partial;
        });
      } else if (template.type === 'value') {
        return Promise.resolve()
          .then(function () {
            return _this.evalValue(template, scope);
          })
          .then(function (partial) {
            return partial === undefined ? '' : stringify(partial);
          });
      } else {
        // template.type === 'html'
        return Promise.resolve(template.value);
      }
    }
  },

  renderTag: function renderTag(template, scope) {
    if (template.name === 'continue') {
      return Promise.reject(new RenderBreakError('continue'));
    }
    if (template.name === 'break') {
      return Promise.reject(new RenderBreakError('break'));
    }
    return template.render(scope);
  },

  evalValue: function (template, scope) {
    assert(scope, 'unable to evalValue: scope undefined');
    return template.filters.reduce(function (prev, filter) {
      return filter.render(prev, scope);
    }, Syntax.evalExp(template.initial, scope));
  },
};

function factory() {
  var instance = Object.create(render);
  return instance;
}

function stringify(val) {
  if (typeof val === 'string') return val;
  return JSON.stringify(val);
}

module.exports = factory;
