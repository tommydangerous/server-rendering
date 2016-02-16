'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationalTimeTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectToStores = require('alt/utils/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OperationalTimeActions = require('../actions/OperationalTimeActions');

var _OperationalTimeActions2 = _interopRequireDefault(_OperationalTimeActions);

var _OperationalTimeStore = require('../stores/OperationalTimeStore');

var _OperationalTimeStore2 = _interopRequireDefault(_OperationalTimeStore);

var _SimpleTable = require('../../../../components/shared/SimpleTable');

var _SimpleTable2 = _interopRequireDefault(_SimpleTable);

var _handleError = require('../../../../utilities/handle-error');

var _handleError2 = _interopRequireDefault(_handleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Libs


// Actions


// Stores


// Components


// Utils


var propTypes = {
  activity: _react.PropTypes.object.isRequired,
  showFlashMessage: _react.PropTypes.func.isRequired
};

var OperationalTimeTable = function (_React$Component) {
  _inherits(OperationalTimeTable, _React$Component);

  _createClass(OperationalTimeTable, null, [{
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

  function OperationalTimeTable(props) {
    _classCallCheck(this, OperationalTimeTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OperationalTimeTable).call(this, props));

    _this.onClickDelete = _this.onClickDelete.bind(_this);
    _this.renderTableRow = _this.renderTableRow.bind(_this);
    return _this;
  }

  _createClass(OperationalTimeTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _OperationalTimeActions2.default.index({
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
      _OperationalTimeActions2.default.delete({
        object: object
      }).then(function (response) {
        _this2.props.showFlashMessage({
          message: 'Successfully deleted.',
          status: 'success'
        });
      }, function (xhr) {
        _this2.props.showFlashMessage({
          message: (0, _handleError2.default)(xhr),
          status: 'error'
        });
      });
    }
  }, {
    key: 'renderTableRow',
    value: function renderTableRow(object) {
      var tds = [];
      var i = 0;
      while (i < 7) {
        var times = object.times[i];
        var text = undefined;
        if (times) {
          var open = times[0];
          var closed = times[1];
          if (open === 0 && closed === 0) {
            text = 'All day';
          } else {
            text = open + '-' + closed;
          }
        } else {
          text = 'Closed';
        }
        tds.push(_react2.default.createElement(
          'td',
          { key: 'hour-' + i },
          text
        ));
        i++;
      };
      return _react2.default.createElement(
        'tr',
        { key: object.id },
        tds,
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
      var headers = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa', 'Actions'];
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)({
            loading: this.props.operationalTimesRequestLoading
          }) },
        _react2.default.createElement(_SimpleTable2.default, {
          objects: this.props.operational_times,
          renderTableRow: this.renderTableRow,
          tableHeaders: headers
        })
      );
    }
  }]);

  return OperationalTimeTable;
}(_react2.default.Component);

OperationalTimeTable.propTypes = propTypes;

exports.default = (0, _connectToStores2.default)(OperationalTimeTable);
exports.OperationalTimeTable = OperationalTimeTable;