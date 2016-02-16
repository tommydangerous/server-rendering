'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectToStores = require('alt/utils/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActivityActions = require('../actions/ActivityActions');

var _ActivityActions2 = _interopRequireDefault(_ActivityActions);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _SimpleTable = require('../../../../components/shared/SimpleTable');

var _SimpleTable2 = _interopRequireDefault(_SimpleTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Libs


// Actions


// Stores


// Components


var ActivityTable = function (_Component) {
  _inherits(ActivityTable, _Component);

  _createClass(ActivityTable, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return _ActivityStore2.default.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [_ActivityStore2.default];
    }
  }]);

  function ActivityTable(props) {
    _classCallCheck(this, ActivityTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityTable).call(this, props));

    _this.renderTableRow = _this.renderTableRow.bind(_this);
    return _this;
  }

  _createClass(ActivityTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _ActivityActions2.default.index({
        format: 'for_owner',
        meta: {
          order: 'id DESC'
        }
      });
    }
  }, {
    key: 'renderTableRow',
    value: function renderTableRow(object) {
      var backgroundImageStyle = {};
      if (object.cover_image_url) {
        backgroundImageStyle.backgroundImage = 'url(' + object.cover_image_url + ')';
      }
      return _react2.default.createElement(
        'tr',
        { key: object.id },
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'div',
            { className: 'img-height-2' },
            _react2.default.createElement('div', {
              className: 'img-cover',
              style: backgroundImageStyle
            })
          )
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'div',
            { className: 'h5' },
            _react2.default.createElement(
              'a',
              { className: 'link-block link-reset', href: '/activities/' + object.id, target: '_blank' },
              object.name
            )
          )
        ),
        _react2.default.createElement(
          'td',
          null,
          object.category
        ),
        _react2.default.createElement(
          'td',
          null,
          object.city
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)({
                'color-green': object.status === 'active',
                'color-red': object.status === 'incomplete',
                'text-muted': object.status === 'inactive'
              }) },
            object.status
          )
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'a',
            { href: '/activities/' + object.id + '/edit' },
            "Manage"
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
            loading: this.props.activities_request_loading
          }) },
        _react2.default.createElement(_SimpleTable2.default, {
          objects: this.props.activities,
          renderTableRow: this.renderTableRow,
          tableHeaders: ["Cover image", "Name", "Activity type", "City", "Status", "Actions"]
        })
      );
    }
  }]);

  return ActivityTable;
}(_react.Component);

exports.default = (0, _connectToStores2.default)(ActivityTable);
exports.ActivityTable = ActivityTable;