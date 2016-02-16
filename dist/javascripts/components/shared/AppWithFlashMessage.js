'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var FlashMessage = require('./FlashMessage');

var AppWithFlashMessage = function (_React$Component) {
  _inherits(AppWithFlashMessage, _React$Component);

  function AppWithFlashMessage(props) {
    _classCallCheck(this, AppWithFlashMessage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppWithFlashMessage).call(this, props));

    _this.onCloseFlashMessage = _this.onCloseFlashMessage.bind(_this);
    _this.showFlashMessage = _this.showFlashMessage.bind(_this);
    _this.state = {
      flashMessage: null,
      flashStatus: null
    };
    return _this;
  }

  _createClass(AppWithFlashMessage, [{
    key: 'onCloseFlashMessage',
    value: function onCloseFlashMessage() {
      this.setState({ flashMessage: null, flashStatus: null });
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
  }]);

  return AppWithFlashMessage;
}(React.Component);

;

module.exports = AppWithFlashMessage;