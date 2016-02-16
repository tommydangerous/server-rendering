'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  var length = string.length;
  if (string.slice(length - 3, length) === 'ies') {
    return string.slice(0, length - 3) + 'y';
  } else {
    return string.slice(0, length - 1);
  }
};