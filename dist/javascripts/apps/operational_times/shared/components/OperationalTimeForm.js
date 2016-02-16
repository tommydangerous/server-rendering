'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationalTimeForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _connectToStores = require('alt/utils/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OperationalTimeActions = require('../actions/OperationalTimeActions');

var _OperationalTimeActions2 = _interopRequireDefault(_OperationalTimeActions);

var _OperationalTimeStore = require('../stores/OperationalTimeStore');

var _OperationalTimeStore2 = _interopRequireDefault(_OperationalTimeStore);

var _SimpleCheckbox = require('../../../../components/shared/SimpleCheckbox');

var _SimpleCheckbox2 = _interopRequireDefault(_SimpleCheckbox);

var _SimpleForm = require('../../../../components/shared/SimpleForm');

var _SimpleForm2 = _interopRequireDefault(_SimpleForm);

var _SimpleSelectField = require('../../../../components/shared/SimpleSelectField');

var _SimpleSelectField2 = _interopRequireDefault(_SimpleSelectField);

var _handleError = require('../../../../utilities/handle-error');

var _handleError2 = _interopRequireDefault(_handleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Libs


// Actions


// Stores


// Components


// Utils


var propTypes = {
  activity: _react.PropTypes.object.isRequired,
  showFlashMessage: _react.PropTypes.func.isRequired
};

var daysOfTheWeek = [[0, 'Sunday'], [1, 'Monday'], [2, 'Tuesday'], [3, 'Wednesday'], [4, 'Thursday'], [5, 'Friday'], [6, 'Saturday']];

var OperationalTimeForm = function (_React$Component) {
  _inherits(OperationalTimeForm, _React$Component);

  _createClass(OperationalTimeForm, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return _OperationalTimeStore2.default.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [_OperationalTimeStore2.default];
    }
  }]);

  function OperationalTimeForm(props) {
    _classCallCheck(this, OperationalTimeForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OperationalTimeForm).call(this, props));

    _this.onChangeCheckbox = _this.onChangeCheckbox.bind(_this);
    _this.onChangeInput = _this.onChangeInput.bind(_this);
    _this.onSubmitForm = _this.onSubmitForm.bind(_this);
    var visibleDays = {};
    visibleDays[0] = false;
    _this.state = {
      close: {},
      loading: false,
      open: {},
      visibleDays: visibleDays
    };
    return _this;
  }

  _createClass(OperationalTimeForm, [{
    key: 'generateTimeOptions',
    value: function generateTimeOptions() {
      var options = [];
      var i = 0;
      while (i < 24) {
        for (var n in [0, 1]) {
          var value = i * 100 + n * 30;
          var text = '';
          if (value === 0) {
            text = '000';
          } else if (value < 100) {
            text = '00';
          } else if (value < 1000) {
            text = '0';
          }
          text = '' + text + value;
          options.push({
            disabled: false,
            text: text.slice(0, 2) + ':' + text.slice(2, 4),
            value: value
          });
        }
        i++;
      }
      return options;
    }
  }, {
    key: 'onChangeCheckbox',
    value: function onChangeCheckbox(e) {
      var hash = this.state;
      var name = parseInt(e.target.name);
      hash.visibleDays[name] = !this.state.visibleDays[name];
      this.setState(hash);
    }
  }, {
    key: 'onChangeInput',
    value: function onChangeInput(e) {
      var name = e.target.name.split('-');
      var index = parseInt(name[1]);
      var openOrclose = name[0];
      var hash = this.state;
      hash[openOrclose][index] = parseInt(e.target.value);
      this.setState(hash);
    }
  }, {
    key: 'onSubmitForm',
    value: function onSubmitForm() {
      var _this2 = this;

      var times = {};
      var i = 0;
      while (i < daysOfTheWeek.length) {
        var open = this.state.open[i];
        var close = this.state.close[i];
        if (this.state.visibleDays[i]) {
          if (open === close) {
            open = 0;
            close = 0;
          }
          times[i] = [open, close];
        } else {
          times[i] = null;
        }
        i++;
      }
      this.setState({ loading: true });
      return new Promise(function (fulfill, reject) {
        _OperationalTimeActions2.default.create({
          format: 'for_owner',
          payload: {
            activity_id: _this2.props.activity.id,
            times: times
          }
        }).then(function (response) {
          _this2.props.showFlashMessage({
            message: 'Successfully added.',
            status: 'success'
          });
          fulfill({
            response: response
          });
          _this2.setState({ loading: false });
        }, function (xhr) {
          _this2.props.showFlashMessage({
            message: (0, _handleError2.default)(xhr),
            status: 'error'
          });
          reject(xhr);
          _this2.setState({ loading: false });
        });
      });
    }
  }, {
    key: 'renderDay',
    value: function renderDay(array) {
      var index = array[0];
      var timeOptions = this.generateTimeOptions();
      return _react2.default.createElement(
        'div',
        { key: array },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement(
            'div',
            { className: 'pull-left' },
            _react2.default.createElement(_SimpleCheckbox2.default, {
              name: '' + index,
              onChangeInput: this.onChangeCheckbox,
              value: this.state.visibleDays[index]
            })
          ),
          array[1]
        ),
        _react2.default.createElement('hr', { className: 'space-2 space-top-2' }),
        this.state.visibleDays[index] && _react2.default.createElement(
          'div',
          { className: 'row space-4' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-6' },
            _react2.default.createElement(
              'label',
              null,
              "Open time"
            ),
            _react2.default.createElement(_SimpleSelectField2.default, {
              defaultValue: this.state.open[index],
              name: 'open-' + index,
              onChangeSelect: this.onChangeInput,
              options: timeOptions
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-md-6' },
            _react2.default.createElement(
              'label',
              null,
              "Close time"
            ),
            _react2.default.createElement(_SimpleSelectField2.default, {
              defaultValue: this.state.close[index],
              name: 'close-' + index,
              onChangeSelect: this.onChangeInput,
              options: timeOptions
            })
          )
        )
      );
    }
  }, {
    key: 'renderInputsForDays',
    value: function renderInputsForDays() {
      var _this3 = this;

      return daysOfTheWeek.map(function (array) {
        return _this3.renderDay(array);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'panel' },
        _react2.default.createElement(
          'div',
          { className: 'panel-header' },
          "What days are you open?"
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          this.renderInputsForDays()
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-footer' },
          _react2.default.createElement(
            'a',
            {
              className: (0, _classnames2.default)("btn btn-primary", { loading: this.state.loading }),
              href: '#',
              onClick: this.onSubmitForm
            },
            "Save"
          )
        )
      );
    }
  }]);

  return OperationalTimeForm;
}(_react2.default.Component);

;

OperationalTimeForm.propTypes = propTypes;

exports.default = (0, _connectToStores2.default)(OperationalTimeForm);
exports.OperationalTimeForm = OperationalTimeForm;