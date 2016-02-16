'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _capitalize = require('./capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (word) {
  return word.split(' ').map(function (word) {
    return (0, _capitalize2.default)(word);
  }).join('_').split('_').map(function (word) {
    return (0, _capitalize2.default)(word);
  }).join('');
};