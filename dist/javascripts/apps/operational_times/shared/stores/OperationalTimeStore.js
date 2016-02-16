'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _SimpleStore = require('../../../../stores/shared/SimpleStore');

var _SimpleStore2 = _interopRequireDefault(_SimpleStore);

var _OperationalTimeActions = require('../actions/OperationalTimeActions');

var _OperationalTimeActions2 = _interopRequireDefault(_OperationalTimeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SimpleStore2.default.init(_alt2.default, _OperationalTimeActions2.default, 'operational_times', 'OperationalTimeStore');