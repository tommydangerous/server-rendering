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
  className: _react.PropTypes.string,
  defaultValue: _react.PropTypes.string,
  id: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onAutocomplete: _react.PropTypes.func.isRequired,
  placeholder: _react.PropTypes.string
};

var defaultProps = {
  id: 'location-autocomplete',
  name: 'location'
};

var LocationAutocompleteInput = function (_Component) {
  _inherits(LocationAutocompleteInput, _Component);

  function LocationAutocompleteInput(props) {
    _classCallCheck(this, LocationAutocompleteInput);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocationAutocompleteInput).call(this, props));

    _this.initializeAutocomplete = _this.initializeAutocomplete.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }

  _createClass(LocationAutocompleteInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initializeAutocomplete();
    }
  }, {
    key: 'initializeAutocomplete',
    value: function (_initializeAutocomplete) {
      function initializeAutocomplete() {
        return _initializeAutocomplete.apply(this, arguments);
      }

      initializeAutocomplete.toString = function () {
        return _initializeAutocomplete.toString();
      };

      return initializeAutocomplete;
    }(function () {
      initializeAutocomplete(document.getElementById(this.props.id), this.props.onAutocomplete);
    })
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', {
        className: this.props.className,
        defaultValue: this.props.defaultValue,
        id: this.props.id,
        name: this.props.name,
        onKeyDown: this.onKeyDown,
        placeholder: this.props.placeholder,
        type: 'text'
      });
    }
  }]);

  return LocationAutocompleteInput;
}(_react.Component);

exports.default = LocationAutocompleteInput;
;

LocationAutocompleteInput.propTypes = propTypes;
LocationAutocompleteInput.defaultProps = defaultProps;