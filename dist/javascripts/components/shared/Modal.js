'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var propTypes = {
  onClose: React.PropTypes.func,
  // Set terminal to true if you want to only use this modal once
  terminal: React.PropTypes.bool,
  visible: React.PropTypes.bool
};

var defaultProps = {
  onClose: function onClose() {},
  terminal: false,
  visible: false
};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).call(this));

    _this.close = _this.close.bind(_this);
    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.visible) {
        this.setState({ visible: this.props.visible });
      }
    }
  }, {
    key: 'close',
    value: function close(e) {
      var self = this;
      var classes = ['modal__container', 'modal__table', 'modal__cell', 'modal__close--button'];
      e.target.className.split(' ').forEach(function (name) {
        if (classes.indexOf(name) != -1) {
          e.preventDefault();
          self.props.onClose();
          if (self.props.terminal) {
            self.setState({ visible: false });
          }
          return;
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var isVisible = undefined;
      if (this.props.terminal) {
        isVisible = this.state.visible;
      } else {
        isVisible = this.props.visible;
      }
      return React.createElement(
        'div',
        {
          'aria-hidden': !isVisible,
          className: 'modal modal__container',
          onClick: this.close
        },
        React.createElement(
          'div',
          { className: 'modal__table' },
          React.createElement(
            'div',
            { className: 'modal__cell' },
            React.createElement(
              'div',
              { className: 'modal__content' },
              this.props.children
            )
          )
        )
      );
    }
  }]);

  return Modal;
}(React.Component);

;

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

module.exports = Modal;