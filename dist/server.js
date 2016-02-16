'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Port


// Routes
// Libs
var port = process.env.PORT || 8080;

// Express App
var app = (0, _express2.default)();

// Logging
app.use((0, _morgan2.default)('combined'));
// Routes
app.use('/', _routes2.default);

// Start server
var server = app.listen(port, function () {
  var _server$address = server.address();

  var address = _server$address.address;
  var port = _server$address.port;

  console.log('Server running in ' + process.env.NODE_ENV + ' at http://' + address + ':' + port);
});