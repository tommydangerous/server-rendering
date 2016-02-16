'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationalTimes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _connectToStores = require('alt/utils/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OperationalTimeStore = require('../../../operational_times/shared/stores/OperationalTimeStore');

var _OperationalTimeStore2 = _interopRequireDefault(_OperationalTimeStore);

var _OperationalTimeForm = require('../../../operational_times/shared/components/OperationalTimeForm');

var _OperationalTimeForm2 = _interopRequireDefault(_OperationalTimeForm);

var _OperationalTimeTable = require('../../../operational_times/shared/components/OperationalTimeTable');

var _OperationalTimeTable2 = _interopRequireDefault(_OperationalTimeTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Libs


// Stores


// Components


var propTypes = {
  activity: _react.PropTypes.object.isRequired,
  showFlashMessage: _react.PropTypes.func.isRequired
};

var OperationalTimes = function (_React$Component) {
  _inherits(OperationalTimes, _React$Component);

  function OperationalTimes() {
    _classCallCheck(this, OperationalTimes);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OperationalTimes).apply(this, arguments));
  }

  _createClass(OperationalTimes, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'space-4' },
          _react2.default.createElement(_OperationalTimeTable2.default, {
            activity: this.props.activity,
            showFlashMessage: this.props.showFlashMessage
          })
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)({ hide: this.props.operational_times.length > 0 }) },
          _react2.default.createElement(_OperationalTimeForm2.default, {
            activity: this.props.activity,
            showFlashMessage: this.props.showFlashMessage
          })
        )
      );
    }
  }], [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return _OperationalTimeStore2.default.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [_OperationalTimeStore2.default];
    }
  }]);

  return OperationalTimes;
}(_react2.default.Component);

;

OperationalTimes.propTypes = propTypes;

exports.default = (0, _connectToStores2.default)(OperationalTimes);
exports.OperationalTimes = OperationalTimes;