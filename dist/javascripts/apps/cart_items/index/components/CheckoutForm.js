'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var React = require('react');

var checkoutActions = require('../actions/CheckoutActions');

var agentClientStore = require('../../../agent_clients/shared/stores/AgentClientStore');
var cartStore = require('../stores/CartStore');

var SimpleForm = require('../../../../components/shared/SimpleForm');

var propTypes = {
  setContainerLoadingState: React.PropTypes.func.isRequired
};

var CheckoutForm = function (_React$Component) {
  _inherits(CheckoutForm, _React$Component);

  _createClass(CheckoutForm, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return Object.assign(agentClientStore.getState(), cartStore.getState());
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [agentClientStore, cartStore];
    }
  }]);

  function CheckoutForm() {
    _classCallCheck(this, CheckoutForm);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckoutForm).call(this));

    _this2.onSubmitForm = _this2.onSubmitForm.bind(_this2);
    return _this2;
  }

  _createClass(CheckoutForm, [{
    key: 'onSubmitForm',
    value: function onSubmitForm(hash) {
      this.props.setContainerLoadingState(true);
      var _this = this;
      return new Promise(function (fulfill, reject) {
        checkoutActions.create({
          payload: Object.assign(hash, {
            cart_items: _this.props.cart_items.map(function (object) {
              return object.id;
            })
          })
        }).then(function (response) {
          fulfill({
            response: response
          });
          window.location = '/cart/complete';
        }, function (xhr) {
          reject(xhr);
          _this.props.setContainerLoadingState(false);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var options = [{
        disabled: true,
        text: '',
        value: ''
      }];
      this.props.agent_clients.map(function (client) {
        options.push({
          text: client.name,
          value: client.id
        });
      });
      var fields = [{
        defaultValue: '',
        label: 'Client name',
        name: 'agent_client_id',
        options: options,
        type: 'select'
      }];
      var submitFormButtonText = 'Confirm Booking';
      if (this.props.cart_items.length > 1) {
        submitFormButtonText += 's';
      }
      return React.createElement(SimpleForm, {
        header: "Which client are these bookings for?",
        fields: fields,
        onSubmitForm: this.onSubmitForm,
        submitFormButtonText: submitFormButtonText
      });
    }
  }]);

  return CheckoutForm;
}(React.Component);

;

CheckoutForm.propTypes = propTypes;

module.exports = connectToStores(CheckoutForm);
module.exports.CheckoutForm = CheckoutForm;