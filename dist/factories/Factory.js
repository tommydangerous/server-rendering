'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Config = require('../config/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Libs

exports.default = function (name) {
  var component = require(_Config2.default.componentDirPath + '/' + name);
  if (component.default) {
    component = component.default;
  }
  return _react2.default.createFactory(component);
};

// Config