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
// onChangeSelect: The function that is called when the select field changes
// options: An array of option hashes for the select field
var propTypes = {
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string]),
  name: _react.PropTypes.string.isRequired,
  onChangeSelect: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    disabled: _react.PropTypes.bool,
    text: _react.PropTypes.string.isRequired,
    value: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string]).isRequired
  })).isRequired
};

var SimpleSelectField = function (_React$Component) {
  _inherits(SimpleSelectField, _React$Component);

  function SimpleSelectField(props) {
    _classCallCheck(this, SimpleSelectField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleSelectField).call(this, props));

    _this.onChangeSelect = _this.onChangeSelect.bind(_this);
    return _this;
  }

  _createClass(SimpleSelectField, [{
    key: "onChangeSelect",
    value: function onChangeSelect(e) {
      this.props.onChangeSelect(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var firstLoop = false;
      var initiallySelectedOption = undefined;
      var selectOptions = this.props.options.map(function (selectOption) {
        // If the first option is not disabled, set the state to use that value
        if (!firstLoop && !selectOption.disabled) {
          initiallySelectedOption = selectOption.value;
        }
        firstLoop = true;
        return _react2.default.createElement(
          "option",
          {
            disabled: selectOption.disabled && _this2.props.defaultValue,
            key: selectOption.value,
            value: selectOption.value
          },
          selectOption.text
        );
      });
      return _react2.default.createElement(
        "div",
        { className: "select select-block" },
        _react2.default.createElement(
          "select",
          {
            defaultValue: this.props.defaultValue,
            name: this.props.name,
            onChange: this.onChangeSelect,
            value: this.props.defaultValue
          },
          selectOptions
        )
      );
    }
  }]);

  return SimpleSelectField;
}(_react2.default.Component);

;

SimpleSelectField.propTypes = propTypes;

exports.default = SimpleSelectField;