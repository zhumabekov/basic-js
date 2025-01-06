const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
      const current = arr[i];

      if (current === '--double-next' && i + 1 < arr.length) {
          result.push(arr[i + 1]);
      } else if (current === '--discard-prev' && i - 1 >= 0) {
          result.pop(); 
      } else if (current !== '--double-next' && current !== '--discard-prev') {
          result.push(current);
      }
  }

  return result;
}

module.exports = {
  transform
};
