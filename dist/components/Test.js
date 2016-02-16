'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Test;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Test(_ref) {
  var name = _ref.name;

  return _react2.default.createElement(
    'h1',
    null,
    'Hello ',
    name
  );
} // Libs