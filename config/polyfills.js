'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// console.log('In my POLYFILL')
// console.log(String, Array, Object.prototype)

// if (!String.prototype.includes) {
//   console.log('In my POLYFILL -> String.Includes')
//   Object.defineProperty(String.prototype, 'includes', {
//     value: function(search, start) {
//       if (typeof start !== 'number') {
//         start = 0
//       }

//       if (start + search.length > this.length) {
//         return false
//       } else {
//         return this.indexOf(search, start) !== -1
//       }
//     }
//   })
// }

// if (!Array.prototype.includes) {
//   console.log('In my POLYFILL -> Array.Includes')
//   Object.defineProperty(Array.prototype, 'includes', {
//     value: function(searchElement, fromIndex) {

//       if (this == null) {
//         throw new TypeError('"this" is null or not defined');
//       }

//       // 1. Let O be ? ToObject(this value).
//       var o = Object(this);

//       // 2. Let len be ? ToLength(? Get(O, "length")).
//       var len = o.length >>> 0;

//       // 3. If len is 0, return false.
//       if (len === 0) {
//         return false;
//       }

//       // 4. Let n be ? ToInteger(fromIndex).
//       //    (If fromIndex is undefined, this step produces the value 0.)
//       var n = fromIndex | 0;

//       // 5. If n ≥ 0, then
//       //  a. Let k be n.
//       // 6. Else n < 0,
//       //  a. Let k be len + n.
//       //  b. If k < 0, let k be 0.
//       var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

//       function sameValueZero(x, y) {
//         return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
//       }

//       // 7. Repeat, while k < len
//       while (k < len) {
//         // a. Let elementK be the result of ? Get(O, ! ToString(k)).
//         // b. If SameValueZero(searchElement, elementK) is true, return true.
//         if (sameValueZero(o[k], searchElement)) {
//           return true;
//         }
//         // c. Increase k by 1.
//         k++;
//       }

//       // 8. Return false
//       return false;
//     }
//   });
// }

// if (!Object.keys) {
//   console.log('In my POLYFILL -> Object.Keys')
//   Object.keys = (function() {
//     'use strict';
//     var hasOwnProperty = Object.prototype.hasOwnProperty,
//         hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
//         dontEnums = [
//           'toString',
//           'toLocaleString',
//           'valueOf',
//           'hasOwnProperty',
//           'isPrototypeOf',
//           'propertyIsEnumerable',
//           'constructor'
//         ],
//         dontEnumsLength = dontEnums.length;

//     return function(obj) {
//       if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
//         throw new TypeError('Object.keys called on non-object');
//       }

//       var result = [], prop, i;

//       for (prop in obj) {
//         if (hasOwnProperty.call(obj, prop)) {
//           result.push(prop);
//         }
//       }

//       if (hasDontEnumBug) {
//         for (i = 0; i < dontEnumsLength; i++) {
//           if (hasOwnProperty.call(obj, dontEnums[i])) {
//             result.push(dontEnums[i]);
//           }
//         }
//       }
//       return result;
//     };
//   }());
// }
