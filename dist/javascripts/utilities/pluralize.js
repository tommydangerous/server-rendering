'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string, number) {
  var hasNumber = number !== undefined && number !== null;
  if (!hasNumber) {
    number = 2;
  }
  var word = undefined;
  if (number === 1) {
    word = string;
  } else {
    var length = string.length;
    switch (string[length - 1]) {
      case 'y':
        word = string.slice(0, length - 1) + 'ies';
        break;
      case 's':
        word = string + 'es';
        break;
      default:
        word = string + 's';
        break;
    }
  }

  if (hasNumber) {
    return number + ' ' + word;
  } else {
    return word;
  }
};