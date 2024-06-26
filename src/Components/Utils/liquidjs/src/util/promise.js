const Promise = require('any-promise');

/*
 * Call functions in serial until someone resolved.
 * @param {Array} iterable the array to iterate with.
 * @param {Array} iteratee returns a new promise.
 * The iteratee is invoked with three arguments: (value, index, iterable).
 */
function anySeries(iterable, iteratee) {
  var ret = Promise.reject(new Error('init'));
  iterable.forEach(function (item, idx) {
    ret = ret.catch(function (e) {
      return iteratee(item, idx, iterable);
    });
  });
  return ret;
}

/*
 * Call functions in serial until someone rejected.
 * @param {Array} iterable the array to iterate with.
 * @param {Array} iteratee returns a new promise.
 * The iteratee is invoked with three arguments: (value, index, iterable).
 */
function mapSeries(iterable, iteratee) {
  var ret = Promise.resolve('init');
  var result = [];
  iterable.forEach(function (item, idx) {
    ret = ret
      .then(function () {
        return iteratee(item, idx, iterable);
      })
      .then(function (x) {
        return result.push(x);
      });
  });
  return ret.then(function () {
    return result;
  });
}

exports.anySeries = anySeries;
exports.mapSeries = mapSeries;
