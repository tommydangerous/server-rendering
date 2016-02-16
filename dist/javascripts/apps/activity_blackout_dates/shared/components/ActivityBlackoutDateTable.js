'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityBlackoutDateTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectToStores = require('alt/utils/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formatDate = require('../../../../utilities/format-date');

var _formatDate2 = _interopRequireDefault(_formatDate);

var _ActivityBlackoutDateActions = require('../actions/ActivityBlackoutDateActions');

var _ActivityBlackoutDateActions2 = _interopRequireDefault(_ActivityBlackoutDateActions);

var _ActivityBlackoutDateStore = require('../stores/ActivityBlackoutDateStore');

var _ActivityBlackoutDateStore2 = _interopRequireDefault(_ActivityBlackoutDateStore);

var _SimpleTable = require('../../../../components/shared/SimpleTable');

var _SimpleTable2 = _interopRequireDefault(_SimpleTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Libs


// Utils


// Actions


// Stores


// Components


var propTypes = {
  activity: _react.PropTypes.object.isRequired,
  showFlashMessage: _react.PropTypes.func.isRequired
};

var ActivityBlackoutDateTable = function (_Component) {
  _inherits(ActivityBlackoutDateTable, _Component);

  _createClass(ActivityBlackoutDateTable, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return _ActivityBlackoutDateStore2.default.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [_ActivityBlackoutDateStore2.default];
    }
  }]);

  function ActivityBlackoutDateTable(props) {
    _classCallCheck(this, ActivityBlackoutDateTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityBlackoutDateTable).call(this, props));

    _this.onClickDelete = _this.onClickDelete.bind(_this);
    _this.renderTableRow = _this.renderTableRow.bind(_this);
    return _this;
  }

  _createClass(ActivityBlackoutDateTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _ActivityBlackoutDateActions2.default.index({
        format: 'for_owner',
        query: {
          activity_id: this.props.activity.id
        }
      });
    }
  }, {
    key: 'onClickDelete',
    value: function onClickDelete(object, e) {
      var _this2 = this;

      e.preventDefault();
      _ActivityBlackoutDateActions2.default.delete({
        object: object
      }).then(function (response) {
        _this2.props.showFlashMessage({
          message: 'Successfully deleted.',
          status: 'success'
        });
      }, function (xhr) {
        _this2.props.showFlashMessage({
          message: xhr.responseJSON.error_message,
          status: 'error'
        });
      });
    }
  }, {
    key: 'renderTableRow',
    value: function renderTableRow(object) {
      return _react2.default.createElement(
        'tr',
        { key: object.id },
        _react2.default.createElement(
          'td',
          null,
          (0, _formatDate2.default)(object.start_at)
        ),
        _react2.default.createElement(
          'td',
          null,
          (0, _formatDate2.default)(object.end_at)
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'a',
            { href: '#', onClick: this.onClickDelete.bind(this, object) },
            "Delete"
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)({
            loading: this.props.activity_blackout_dates_request_loading
          }) },
        _react2.default.createElement(_SimpleTable2.default, {
          objects: this.props.activity_blackout_dates,
          renderTableRow: this.renderTableRow,
          tableHeaders: ["Starting date", "Ending date", "Actions"]
        })
      );
    }
  }]);

  return ActivityBlackoutDateTable;
}(_react.Component);

ActivityBlackoutDateTable.propTypes = propTypes;

exports.default = (0, _connectToStores2.default)(ActivityBlackoutDateTable);
exports.ActivityBlackoutDateTable = ActivityBlackoutDateTable;