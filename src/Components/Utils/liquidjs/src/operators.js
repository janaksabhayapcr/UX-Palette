module.exports = function (isTruthy) {
  return {
    '==': function (l, r) {
      return l === r;
    },
    '!=': function (l, r) {
      return l !== r;
    },
    '>': function (l, r) {
      return l !== null && r !== null && l > r;
    },
    '<': function (l, r) {
      return l !== null && r !== null && l < r;
    },
    '>=': function (l, r) {
      return l !== null && r !== null && l >= r;
    },
    '<=': function (l, r) {
      return l !== null && r !== null && l <= r;
    },
    contains: function (l, r) {
      if (!l) return false;
      if (typeof l.indexOf !== 'function') return false;
      return l.indexOf(r) > -1;
    },
    and: function (l, r) {
      return isTruthy(l) && isTruthy(r);
    },
    or: function (l, r) {
      return isTruthy(l) || isTruthy(r);
    },
  };
};
