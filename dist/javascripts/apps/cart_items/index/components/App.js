'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = require('classnames');
var React = require('react');

var AgentClientForm = require('../../../agent_clients/shared/components/AgentClientForm');
var AgentClientTable = require('../../../agent_clients/shared/components/AgentClientTable');
var CartItemTable = require('./CartItemTable');
var CheckoutForm = require('./CheckoutForm');
var FinancialInstrumentTable = require('../../../financial_instruments/shared/components/FinancialInstrumentTable');
var FinancialInstrumentForm = require('../../../financial_instruments/shared/components/FinancialInstrumentForm');
var FlashMessage = require('../../../../components/shared/FlashMessage');

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

    _this.onCloseFlashMessage = _this.onCloseFlashMessage.bind(_this);
    _this.setContainerLoadingState = _this.setContainerLoadingState.bind(_this);
    _this.showFlashMessage = _this.showFlashMessage.bind(_this);
    _this.state = {
      flashMessage: null,
      flashStatus: null,
      loading: false
    };
    return _this;
  }

  _createClass(App, [{
    key: 'onCloseFlashMessage',
    value: function onCloseFlashMessage() {
      this.setState({ flashMessage: null, flashStatus: null });
    }
  }, {
    key: 'setContainerLoadingState',
    value: function setContainerLoadingState(value) {
      this.setState({ loading: value });
    }
  }, {
    key: 'showFlashMessage',
    value: function showFlashMessage(options) {
      this.setState({
        flashMessage: options.message,
        flashStatus: options.status
      });
    }
  }, {
    key: 'renderFlashMessage',
    value: function renderFlashMessage() {
      if (this.state.flashMessage && this.state.flashStatus) {
        return React.createElement(FlashMessage, {
          message: this.state.flashMessage,
          onClose: this.onCloseFlashMessage,
          status: this.state.flashStatus
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.renderFlashMessage(),
        React.createElement(
          'div',
          { className: cx("panel-body", { loading: this.state.loading }) },
          React.createElement(
            'div',
            { className: 'space-2' },
            React.createElement(CartItemTable, { showFlashMessage: this.showFlashMessage })
          ),
          React.createElement(
            'div',
            { className: 'space-2' },
            React.createElement(FinancialInstrumentTable, { showFlashMessage: this.showFlashMessage })
          ),
          React.createElement(
            'div',
            { className: 'space-2' },
            React.createElement(FinancialInstrumentForm, { showFlashMessage: this.showFlashMessage })
          ),
          React.createElement(
            'div',
            { className: 'space-2' },
            React.createElement(AgentClientTable, { showFlashMessage: this.showFlashMessage })
          ),
          React.createElement(
            'div',
            { className: 'space-2' },
            React.createElement(AgentClientForm, { showFlashMessage: this.showFlashMessage })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(CheckoutForm, { setContainerLoadingState: this.setContainerLoadingState })
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

;

module.exports = App;