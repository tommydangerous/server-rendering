'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _envelope = require('../utils/envelope');

var _envelope2 = _interopRequireDefault(_envelope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Parse application/json
var jsonParser = _bodyParser2.default.json();

// Utils
// Libs

var router = _express2.default.Router();

router.get('/health', function (req, res) {
  res.sendStatus(200);
});

router.post('/render', jsonParser, function (req, res) {
  res.json((0, _envelope2.default)(req));
});

router.get('/test/render', function (req, res) {
  if (process.env.NODE_ENV === 'development') {
    res.json((0, _envelope2.default)(req));
  } else {
    res.sendStatus(404);
  }
});

exports.default = router;