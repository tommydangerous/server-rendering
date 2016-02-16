'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  autoComplete: _react.PropTypes.string,
  label: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  numberOnly: _react.PropTypes.bool,
  onChangeInput: _react.PropTypes.func.isRequired,
  scale: _react.PropTypes.number,
  value: _react.PropTypes.string
};

var defaultProps = {
  autoComplete: 'off',
  numberOnly: false,
  scale: 0
};

var SimpleTextField = function (_React$Component) {
  _inherits(SimpleTextField, _React$Component);

  function SimpleTextField(props) {
    _classCallCheck(this, SimpleTextField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleTextField).call(this, props));

    _this.onChangeInput = _this.onChangeInput.bind(_this);
    return _this;
  }

  _createClass(SimpleTextField, [{
    key: 'onChangeInput',
    value: function onChangeInput(e) {
      if (this.props.numberOnly) {
        var regex = new RegExp('[0-9]*');
        if (this.props.scale > 0) {
          regex = new RegExp('[0-9]*[.]{0,1}[0-9]{0,' + this.props.scale + '}');
        }
        e.target.value = e.target.value.match(regex);
      }
      this.props.onChangeInput(e);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.label && _react2.default.createElement(
          'label',
          null,
          this.props.label
        ),
        _react2.default.createElement('input', {
          autoComplete: this.props.autoComplete,
          name: this.props.name,
          onChange: this.onChangeInput,
          type: 'text',
          value: this.props.value
        })
      );
    }
  }]);

  return SimpleTextField;
}(_react2.default.Component);

exports.default = SimpleTextField;
;

SimpleTextField.defaultProps = defaultProps;
SimpleTextField.propTypes = propTypes;