'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

// Components
var Modal = require('../../../../components/shared/Modal');

var propTypes = {
  numberOfStepsRemaining: React.PropTypes.number.isRequired,
  visible: React.PropTypes.bool.isRequired
};

var CongratulationsModal = function (_React$Component) {
  _inherits(CongratulationsModal, _React$Component);

  function CongratulationsModal() {
    _classCallCheck(this, CongratulationsModal);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CongratulationsModal).apply(this, arguments));
  }

  _createClass(CongratulationsModal, [{
    key: 'render',
    value: function render() {
      var step = 'Step';
      if (this.props.numberOfStepsRemaining != 1) {
        step += 's';
      }
      return React.createElement(
        Modal,
        { terminal: true, visible: this.props.visible },
        React.createElement(
          'div',
          { className: 'panel-body' },
          React.createElement(
            'div',
            { className: 'text-center' },
            React.createElement(
              'h1',
              { className: 'color-blue' },
              this.props.numberOfStepsRemaining
            ),
            React.createElement(
              'h5',
              null,
              'More ' + step
            ),
            React.createElement(
              'div',
              { className: 'space-2 space-top-4' },
              "Congratulations! You have successfully created an activity. ",
              React.createElement('br', null),
              "A few more things left to do and you will be able to complete and activate it."
            ),
            React.createElement(
              'button',
              { className: 'btn btn-special modal__close--button space-2' },
              "Continue"
            )
          )
        )
      );
    }
  }]);

  return CongratulationsModal;
}(React.Component);

;

CongratulationsModal.propTypes = propTypes;

module.exports = CongratulationsModal;