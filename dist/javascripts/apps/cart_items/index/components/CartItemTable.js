'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var cx = require('classnames');
var React = require('react');

var cartActions = require('../actions/CartActions');
var cartStore = require('../stores/CartStore');

var SimpleTable = require('../../../../components/shared/SimpleTable');

var propTypes = {
  showFlashMessage: React.PropTypes.func
};

var CartItemTable = function (_React$Component) {
  _inherits(CartItemTable, _React$Component);

  _createClass(CartItemTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      cartActions.index();
    }
  }], [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return cartStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [cartStore];
    }
  }]);

  function CartItemTable() {
    _classCallCheck(this, CartItemTable);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(CartItemTable).call(this));

    _this2.onClickDelete = _this2.onClickDelete.bind(_this2);
    _this2.renderTableRow = _this2.renderTableRow.bind(_this2);
    return _this2;
  }

  _createClass(CartItemTable, [{
    key: 'onClickDelete',
    value: function onClickDelete(object, e) {
      e.preventDefault();
      var _this = this;
      cartActions.delete({
        object: object
      }).then(function (response) {
        _this.props.showFlashMessage({
          message: 'Cart item successfully removed.',
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
      var _this = this;
      var dates = object.activity_start_at.split(' ')[0].split('-');
      var formattedDate = dates[1] + '/' + dates[2] + '/' + dates[0];
      return React.createElement(
        'tr',
        { key: object.id },
        React.createElement(
          'td',
          null,
          React.createElement(
            'a',
            { className: 'link-reset', href: "/activities/" + object.product.id },
            object.product.name
          )
        ),
        React.createElement(
          'td',
          null,
          "$" + object.pricing.price
        ),
        React.createElement(
          'td',
          null,
          object.pricing.number_of_people
        ),
        React.createElement(
          'td',
          null,
          formattedDate
        ),
        React.createElement(
          'td',
          null,
          object.pricing.approval_required ? "Yes" : "No"
        ),
        React.createElement(
          'td',
          null,
          React.createElement(
            'a',
            { href: '#', onClick: _this.onClickDelete.bind(this, object) },
            "Remove"
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: cx({ loading: this.props.requestLoading }) },
        React.createElement(SimpleTable, {
          objects: this.props.cart_items,
          renderTableRow: this.renderTableRow,
          tableHeaders: ["Activity name", "Price", "People", "Start date", "Approval required", "Actions"]
        })
      );
    }
  }]);

  return CartItemTable;
}(React.Component);

;

CartItemTable.propTypes = propTypes;

module.exports = connectToStores(CartItemTable);
module.exports.CartItemTable = CartItemTable;