'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _Factory = require('../factories/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Libs

exports.default = function (req) {
  var component = req.body ? req.body.component : req.query.component;
  var props = req.body ? req.body.props : req.query;
  return {
    metadata: {
      component: component,
      props: props
    },
    html: _server2.default.renderToStaticMarkup((0, _Factory2.default)(component)(props))
  };
};

// Factories