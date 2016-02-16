'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Test;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Test(_ref) {
  var message = _ref.message;

  return _react2.default.createElement(
    'span',
    null,
    'You said: ',
    message
  );
} // Libs