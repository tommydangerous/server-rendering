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

var defaultProps = {
  date: '',
  dateFormat: 'dd-mm-yy',
  inputOnChange: null,
  inputRef: 'input',
  max_date: null,
  min_date: new Date(),
  name: 'date'
};

var propTypes = {
  date: _react.PropTypes.string,
  dateFormat: _react.PropTypes.string.isRequired,
  inputOnChange: _react.PropTypes.func,
  inputRef: _react.PropTypes.string.isRequired,
  max_date: _react.PropTypes.instanceOf(Date),
  min_date: _react.PropTypes.instanceOf(Date),
  name: _react.PropTypes.string.isRequired
};

var DatepickerInput = function (_React$Component) {
  _inherits(DatepickerInput, _React$Component);

  function DatepickerInput(props) {
    _classCallCheck(this, DatepickerInput);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DatepickerInput).call(this, props));

    var defaultDate = props.date || '';
    _this2.state = {
      date: defaultDate,
      formattedDate: _this2._formatDate(defaultDate)
    };
    return _this2;
  }

  _createClass(DatepickerInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;
      $(this.refs[this.props.inputRef]).datepicker({
        dateFormat: _this.props.dateFormat,
        maxDate: _this.props.max_date,
        minDate: _this.props.min_date,
        onSelect: function onSelect(date, datepicker) {
          _this._dateSelected(date);
          $(this).val(_this.state.formattedDate);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { key: this.props.inputRef + "1" },
        _react2.default.createElement('input', {
          autoComplete: 'off',
          className: 'datepicker-input',
          defaultValue: this.state.formattedDate,
          key: this.props.inputRef + "2",
          placeholder: this.props.placeholder,
          ref: this.props.inputRef
        }),
        _react2.default.createElement('input', {
          name: this.props.name,
          key: this.props.inputRef + "3",
          readOnly: true,
          type: 'hidden',
          value: this.state.date
        })
      );
    }
  }, {
    key: '_dateSelected',
    value: function _dateSelected(date) {
      this.setState({
        date: date,
        formattedDate: this._formatDate(date)
      });

      if (this.props.inputOnChange) {
        this.props.inputOnChange(date);
      }
    }
  }, {
    key: '_formatDate',
    value: function _formatDate(date) {
      var values = date.split('-');
      if (values.length == 3) {
        return [values[1], values[0], values[2]].join('-');
      } else {
        return '';
      }
    }
  }]);

  return DatepickerInput;
}(_react2.default.Component);

exports.default = DatepickerInput;
;

DatepickerInput.defaultProps = defaultProps;
DatepickerInput.propTypes = propTypes;