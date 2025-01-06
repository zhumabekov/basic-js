const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const digits = n.toString().split('');
  let maxNumber = -Infinity;

  for (let i = 0; i < digits.length; i++) {
    const numberWithoutDigit = parseInt(digits.slice(0, i).concat(digits.slice(i + 1)).join(''), 10);
    maxNumber = Math.max(maxNumber, numberWithoutDigit);
  }

  return maxNumber;
}

module.exports = {
  deleteDigit
};
