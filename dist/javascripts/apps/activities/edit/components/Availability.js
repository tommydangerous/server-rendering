'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActivityForm = require('./ActivityForm');

var _ActivityForm2 = _interopRequireDefault(_ActivityForm);

var _pluralize = require('../../../../utilities/pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Libs


// Components


// Utils


var propTypes = {
  activity: _react.PropTypes.object.isRequired,
  onSubmitForm: _react.PropTypes.func.isRequired,
  showFlashMessage: _react.PropTypes.func.isRequired
};

var Availability = function (_Component) {
  _inherits(Availability, _Component);

  function Availability(props) {
    _classCallCheck(this, Availability);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Availability).call(this, props));

    _this.fields = _this.fields.bind(_this);
    return _this;
  }

  _createClass(Availability, [{
    key: 'fields',
    value: function fields() {
      var durationOptions = [{
        disabled: this.props.activity.duration ? true : false,
        text: '',
        value: ''
      }];
      for (var i = 0; i < 25; i++) {
        durationOptions.push({
          disabled: false,
          text: (0, _pluralize2.default)('hour', i),
          value: i
        });
      }
      return [{
        label: 'What date will this activity start on?',
        name: 'start_at',
        type: 'date'
      }, {
        label: 'What date will this activity end on?',
        name: 'end_at',
        type: 'date'
      }, {
        label: 'What is the duration of this activity?',
        name: 'duration',
        options: durationOptions,
        type: 'select'
      }];
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ActivityForm2.default, {
          fields: this.fields(),
          header: "Availability",
          onSubmitForm: this.props.onSubmitForm
        })
      );
    }
  }]);

  return Availability;
}(_react.Component);

Availability.propTypes = propTypes;

module.exports = Availability;