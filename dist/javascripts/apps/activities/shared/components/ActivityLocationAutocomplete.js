'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var propTypes = {
  inputClassName: React.PropTypes.string,
  inputId: React.PropTypes.string,
  onAutocomplete: React.PropTypes.func.isRequired
};

var defaultProps = {
  inputId: 'location-autocomplete'
};

var ActivityLocationAutocomplete = function (_React$Component) {
  _inherits(ActivityLocationAutocomplete, _React$Component);

  function ActivityLocationAutocomplete(props) {
    _classCallCheck(this, ActivityLocationAutocomplete);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityLocationAutocomplete).call(this, props));

    _this.initializeAutocomplete = _this.initializeAutocomplete.bind(_this);
    return _this;
  }

  _createClass(ActivityLocationAutocomplete, [{
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
      initializeAutocomplete(document.getElementById(this.props.inputId), this.props.onAutocomplete);
    })
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('input', {
        className: this.props.inputClassName,
        defaultValue: this.props.location,
        id: this.props.inputId,
        name: 'location',
        placeholder: 'Where does this activity take place?',
        type: 'text'
      });
    }
  }]);

  return ActivityLocationAutocomplete;
}(React.Component);

;

ActivityLocationAutocomplete.propTypes = propTypes;
ActivityLocationAutocomplete.defaultProps = defaultProps;

module.exports = ActivityLocationAutocomplete;