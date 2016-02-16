"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// defaultValue: The default value of the select field
// name: The name of the select parameter
var propTypes = {
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string]),
  name: _react.PropTypes.string.isRequired,
  onChangeInput: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string])
};

var SimpleCheckbox = function (_React$Component) {
  _inherits(SimpleCheckbox, _React$Component);

  function SimpleCheckbox(props) {
    _classCallCheck(this, SimpleCheckbox);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleCheckbox).call(this, props));

    _this.onChangeInput = _this.onChangeInput.bind(_this);
    return _this;
  }

  _createClass(SimpleCheckbox, [{
    key: "onChangeInput",
    value: function onChangeInput(e) {
      this.props.onChangeInput(e);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "checkbox" },
        _react2.default.createElement("input", {
          defaultValue: this.props.defaultValue,
          name: this.props.name,
          onChange: this.onChangeInput,
          type: "checkbox",
          value: this.props.value
        })
      );
    }
  }]);

  return SimpleCheckbox;
}(_react2.default.Component);

;

SimpleCheckbox.propTypes = propTypes;

exports.default = SimpleCheckbox;