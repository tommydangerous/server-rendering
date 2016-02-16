'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _titleize = require('../../../../utilities/titleize');

var _titleize2 = _interopRequireDefault(_titleize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var cx = require('classnames');
var React = require('react');

var packageActions = require('../../shared/actions/PackageActions');
var packageStore = require('../../shared/stores/PackageStore');

var SimpleTable = require('../../../../components/shared/SimpleTable');

// Utils


var propTypes = {
  activity: React.PropTypes.object.isRequired,
  showFlashMessage: React.PropTypes.func.isRequired
};

var PackageTable = function (_React$Component) {
  _inherits(PackageTable, _React$Component);

  _createClass(PackageTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      packageActions.index({
        format: 'for_owner',
        query: {
          activity_id: this.props.activity.id
        }
      });
    }
  }], [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return packageStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [packageStore];
    }
  }]);

  function PackageTable() {
    _classCallCheck(this, PackageTable);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PackageTable).call(this));

    _this2.onClickDelete = _this2.onClickDelete.bind(_this2);
    _this2.renderTableRow = _this2.renderTableRow.bind(_this2);
    return _this2;
  }

  _createClass(PackageTable, [{
    key: 'onClickDelete',
    value: function onClickDelete(object, e) {
      e.preventDefault();
      var _this = this;
      packageActions.delete({
        object: object
      }).then(function (response) {
        _this.props.showFlashMessage({
          message: 'Package successfully deleted.',
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
      var purpose = undefined;
      if (object.activity_pickup) {
        if (object.activity_pickup.name) {
          purpose = object.activity_pickup.name;
        } else {
          purpose = (0, _titleize2.default)(object.activity_pickup.location_type);
        }
      } else {
        purpose = 'Activity';
      }
      return React.createElement(
        'tr',
        { key: object.id },
        React.createElement(
          'td',
          null,
          purpose
        ),
        React.createElement(
          'td',
          null,
          '$' + object.price
        ),
        React.createElement(
          'td',
          null,
          object.number_of_people
        ),
        React.createElement(
          'td',
          null,
          object.approval_required ? "Yes" : "No"
        ),
        React.createElement(
          'td',
          null,
          object.private ? "Private" : "Public"
        ),
        React.createElement(
          'td',
          null,
          object.age_type
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
      var tableHeaders = ['For', 'Price', '# people', 'Approval required', 'Private', 'Age', 'Actions'];
      return React.createElement(
        'div',
        { className: cx({ loading: this.props.requestLoading }) },
        React.createElement(SimpleTable, {
          objects: this.props.packages,
          renderTableRow: this.renderTableRow,
          tableHeaders: tableHeaders
        })
      );
    }
  }]);

  return PackageTable;
}(React.Component);

PackageTable.propTypes = propTypes;

module.exports = connectToStores(PackageTable);
module.exports.PackageTable = PackageTable;