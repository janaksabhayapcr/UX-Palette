const strftime = require('./src/util/strftime.js');
const _ = require('./src/util/underscore.js');
const isTruthy = require('./src/syntax.js').isTruthy;

var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&#34;',
  "'": '&#39;',
};
var unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&#34;': '"',
  '&#39;': "'",
};

var filters = {
  abs: function (v) {
    return Math.abs(v);
  },
  append: function (v, arg) {
    return v + arg;
  },
  capitalize: function (str) {
    return stringify(str).charAt(0).toUpperCase() + str.slice(1);
  },
  ceil: function (v) {
    return Math.ceil(v);
  },
  concat: function (v, arg) {
    return Array.prototype.concat.call(v, arg);
  },
  date: function (v, arg) {
    var date = v;
    if (v === 'now') {
      date = new Date();
    } else if (_.isString(v)) {
      date = new Date(v);
    }
    return isValidDate(date) ? strftime(date, arg) : v;
  },
  default: function (v, arg) {
    return isTruthy(v) ? v : arg;
  },
  divided_by: function (v, arg) {
    return Math.floor(v / arg);
  },
  downcase: function (v) {
    return v.toLowerCase();
  },
  escape: escape,

  escape_once: function (str) {
    return escape(unescape(str));
  },
  first: function (v) {
    return v[0];
  },
  floor: function (v) {
    return Math.floor(v);
  },
  join: function (v, arg) {
    return v.join(arg);
  },
  last: function (v) {
    return v[v.length - 1];
  },
  lstrip: function (v) {
    return stringify(v).replace(/^\s+/, '');
  },
  map: function (arr, arg) {
    return arr.map(function (v) {
      return v[arg];
    });
  },
  minus: bindFixed(function (v, arg) {
    return v - arg;
  }),
  modulo: bindFixed(function (v, arg) {
    return v % arg;
  }),
  newline_to_br: function (v) {
    return v.replace(/\n/g, '<br />');
  },
  plus: bindFixed(function (v, arg) {
    return Number(v) + Number(arg);
  }),
  prepend: function (v, arg) {
    return arg + v;
  },
  remove: function (v, arg) {
    return v.split(arg).join('');
  },
  remove_first: function (v, l) {
    return v.replace(l, '');
  },
  replace: function (v, pattern, replacement) {
    return stringify(v).split(pattern).join(replacement);
  },
  replace_first: function (v, arg1, arg2) {
    return stringify(v).replace(arg1, arg2);
  },
  reverse: function (v) {
    return v.reverse();
  },
  round: function (v, arg) {
    var amp = Math.pow(10, arg || 0);
    return Math.round(v * amp, arg) / amp;
  },
  rstrip: function (str) {
    return stringify(str).replace(/\s+$/, '');
  },
  size: function (v) {
    return v.length;
  },
  slice: function (v, begin, length) {
    return v.substr(begin, length === undefined ? 1 : length);
  },
  sort: function (v, arg) {
    return v.sort(arg);
  },
  split: function (v, arg) {
    return stringify(v).split(arg);
  },
  strip: function (v) {
    return stringify(v).trim();
  },
  strip_html: function (v) {
    return stringify(v).replace(/<\/?\s*\w+\s*\/?>/g, '');
  },
  strip_newlines: function (v) {
    return stringify(v).replace(/\n/g, '');
  },
  times: function (v, arg) {
    return v * arg;
  },
  truncate: function (v, l, o) {
    v = stringify(v);
    o = o === undefined ? '...' : o;
    l = l || 16;
    if (v.length <= l) return v;
    return v.substr(0, l - o.length) + o;
  },
  truncatewords: function (v, l, o) {
    if (o === undefined) o = '...';
    var arr = v.split(' ');
    var ret = arr.slice(0, l).join(' ');
    if (arr.length > l) ret += o;
    return ret;
  },
  uniq: function (arr) {
    var u = {};
    return (arr || []).filter(function (val) {
      if (u.hasOwnProperty(val)) {
        return false;
      }
      u[val] = true;
      return true;
    });
  },
  upcase: function (str) {
    return stringify(str).toUpperCase();
  },
  url_encode: encodeURIComponent,
};

function escape(str) {
  return stringify(str).replace(/&|<|>|"|'/g, function (m) {
    return escapeMap[m];
  });
}

function unescape(str) {
  return stringify(str).replace(/&(amp|lt|gt|#34|#39);/g, function (m) {
    return unescapeMap[m];
  });
}

function getFixed(v) {
  var p = (v + '').split('.');
  return p.length > 1 ? p[1].length : 0;
}

function getMaxFixed(l, r) {
  return Math.max(getFixed(l), getFixed(r));
}

function stringify(obj) {
  return obj + '';
}

function bindFixed(cb) {
  return function (l, r) {
    var f = getMaxFixed(l, r);
    return cb(l, r).toFixed(f);
  };
}

function registerAll(liquid) {
  return _.forOwn(filters, function (func, name) {
    return liquid.registerFilter(name, func);
  });
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

registerAll.filters = filters;
module.exports = registerAll;
