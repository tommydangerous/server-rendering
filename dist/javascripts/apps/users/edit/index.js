'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Libs


var element = (0, _jquery2.default)('.react-app__users').get(0);

// Components

_reactDom2.default.render(_react2.default.createElement(_App2.default, {
  userId: parseInt(element.dataset.id)
}), element);