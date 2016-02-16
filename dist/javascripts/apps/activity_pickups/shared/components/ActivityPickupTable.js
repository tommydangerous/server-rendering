'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _titleize = require('../../../../utilities/titleize');

var _titleize2 = _interopRequireDefault(_titleize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var className = require('classnames');
var React = require('react');

var activityPickupActions = require('../actions/ActivityPickupActions');

var activityPickupStore = require('../stores/ActivityPickupStore');

var SimpleTable = require('../../../../components/shared/SimpleTable');

// Utils


var propTypes = {
  activity: React.PropTypes.object.isRequired,
  showFlashMessage: React.PropTypes.func.isRequired
};

var ActivityPickupTable = function (_React$Component) {
  _inherits(ActivityPickupTable, _React$Component);

  _createClass(ActivityPickupTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      activityPickupActions.index({
        format: 'for_owner',
        query: {
          activity_id: this.props.activity.id
        }
      });
    }
  }], [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return activityPickupStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [activityPickupStore];
    }
  }]);

  function ActivityPickupTable() {
    _classCallCheck(this, ActivityPickupTable);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityPickupTable).call(this));

    _this2.onClickDelete = _this2.onClickDelete.bind(_this2);
    _this2.renderTableRow = _this2.renderTableRow.bind(_this2);
    return _this2;
  }

  _createClass(ActivityPickupTable, [{
    key: 'onClickDelete',
    value: function onClickDelete(object, e) {
      e.preventDefault();
      var _this = this;
      activityPickupActions.delete({
        object: object
      }).then(function (response) {
        _this.props.showFlashMessage({
          message: 'Pickup location successfully deleted.',
          status: 'success'
        });
      }, function (xhr) {
        _this.props.showFlashMessage({
          message: xhr.responseJSON.error_message,
          status: 'error'
        });
      });
    }
  }, {
    key: 'renderTableRow',
    value: function renderTableRow(object) {
      var name = undefined;
      if (object.name) {
        name = object.name;
      } else {
        name = (0, _titleize2.default)(object.location_type);
      }
      return React.createElement(
        'tr',
        { key: object.id },
        React.createElement(
          'td',
          null,
          name
        ),
        React.createElement(
          'td',
          null,
          object.street
        ),
        React.createElement(
          'td',
          null,
          object.start_time + ' - ' + object.end_time
        ),
        React.createElement(
          'td',
          null,
          object.package ? '$' + object.package.price : 'Included in activity'
        ),
        React.createElement(
          'td',
          null,
          React.createElement(
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
      var headers = ['Name', 'Street', 'Time', 'Price', 'Actions'];
      return React.createElement(
        'div',
        { className: className({ loading: this.props.activity_pickups_request_loading }) },
        React.createElement(SimpleTable, {
          objects: this.props.activity_pickups,
          renderTableRow: this.renderTableRow,
          tableHeaders: headers
        })
      );
    }
  }]);

  return ActivityPickupTable;
}(React.Component);

ActivityPickupTable.propTypes = propTypes;

module.exports = connectToStores(ActivityPickupTable);
module.exports.ActivityPickupTable = ActivityPickupTable;