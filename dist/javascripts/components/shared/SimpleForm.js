'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SimpleCheckbox = require('./SimpleCheckbox');

var _SimpleCheckbox2 = _interopRequireDefault(_SimpleCheckbox);

var _SimpleSelectField = require('./SimpleSelectField');

var _SimpleSelectField2 = _interopRequireDefault(_SimpleSelectField);

var _SimpleTextField = require('./SimpleTextField');

var _SimpleTextField2 = _interopRequireDefault(_SimpleTextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = require('classnames');
var React = require('react');

// Utils
var handleError = require('../../utilities/handle-error');

// Components
var DatepickerInput = require('./DatepickerInput');
var LocationAutocompleteInput = require('./LocationAutocompleteInput');


var propTypes = {
  header: React.PropTypes.string,
  fields: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onClickCancel: React.PropTypes.func,
  onSubmitForm: React.PropTypes.func.isRequired,
  submitFormButtonText: React.PropTypes.string
};

var SimpleForm = function (_React$Component) {
  _inherits(SimpleForm, _React$Component);

  function SimpleForm() {
    _classCallCheck(this, SimpleForm);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleForm).call(this));

    _this2.onAutocompleteLocation = _this2.onAutocompleteLocation.bind(_this2);
    _this2.onChangeInput = _this2.onChangeInput.bind(_this2);
    _this2.onClickCancel = _this2.onClickCancel.bind(_this2);
    _this2.onSubmitForm = _this2.onSubmitForm.bind(_this2);
    _this2.state = _this2.initialState();
    return _this2;
  }

  _createClass(SimpleForm, [{
    key: 'initialState',
    value: function initialState() {
      return {
        errors: null,
        loading: false,
        timestamp: new Date()
      };
    }
  }, {
    key: 'onAutocompleteLocation',
    value: function onAutocompleteLocation(hash) {
      this.setState(hash);
    }
  }, {
    key: 'onChangeDatepickerInput',
    value: function onChangeDatepickerInput(name, date) {
      this.onChangeInput({
        target: {
          name: name,
          value: date
        }
      });
    }
  }, {
    key: 'onChangeInput',
    value: function onChangeInput(e) {
      this.state[e.target.name] = e.target.value;
    }
  }, {
    key: 'onClickCancel',
    value: function onClickCancel(e) {
      e.preventDefault();
      this.props.onClickCancel();
    }
  }, {
    key: 'onSubmitForm',
    value: function onSubmitForm(e) {
      // This method (this.props.onSubmitForm) needs to return a promise
      e.preventDefault();
      this.setState({ loading: true });
      var _this = this;
      var promise = this.props.onSubmitForm(this.submitFormPayload());

      promise.then(function (options) {
        _this.reset(options.response);
      }, function (xhr) {
        _this.setState({
          errors: handleError(xhr),
          loading: false
        });
      });
    }
  }, {
    key: 'submitFormPayload',
    value: function submitFormPayload() {
      var payload = Object.assign({}, this.state);
      delete payload['errors'];
      delete payload['loading'];
      delete payload['timestamp'];
      return payload;
    }
  }, {
    key: 'reset',
    value: function reset(response) {
      var state = this.state;
      var keys = Object.keys(this.state);
      for (var i = 0; i < keys.length; i++) {
        state[keys[i]] = null;
      }
      this.setState(Object.assign(state, this.initialState()));
    }
  }, {
    key: 'renderCancelButton',
    value: function renderCancelButton() {
      if (this.props.cancelUrl) {
        return React.createElement(
          'a',
          { className: 'btn', href: this.props.cancelUrl },
          "Cancel"
        );
      } else if (this.props.onClickCancel) {
        return React.createElement(
          'a',
          { className: 'btn', href: '#', onClick: this.onClickCancel },
          "Cancel"
        );
      }
    }
  }, {
    key: 'renderCheckbox',
    value: function renderCheckbox(hash) {
      return React.createElement(_SimpleCheckbox2.default, {
        defaultValue: this.props[hash.name],
        name: hash.name,
        onChangeInput: this.onChangeInput,
        value: this.props[hash.name]
      });
    }
  }, {
    key: 'renderDateField',
    value: function renderDateField(hash) {
      return React.createElement(DatepickerInput, {
        date: this.props[hash.name],
        inputOnChange: this.onChangeDatepickerInput.bind(this, hash.name),
        max_date: hash.maxDate,
        min_date: hash.minDate,
        name: hash.name
      });
    }
  }, {
    key: 'renderErrors',
    value: function renderErrors() {
      if (this.state.errors) {
        return React.createElement(
          'div',
          { className: 'background-red panel-body-small space-1 text-center text-contrast' },
          this.state.errors
        );
      }
    }
  }, {
    key: 'renderField',
    value: function renderField() {
      var _this = this;
      return this.props.fields.map(function (hash) {
        var header;
        if (hash.label) {
          header = React.createElement(
            'label',
            null,
            hash.label
          );
        }
        var field;
        switch (hash.type) {
          case 'date':
            field = _this.renderDateField(hash);
            break;
          case 'checkbox':
            field = _this.renderCheckbox(hash);
            break;
          case 'location':
            field = _this.renderLocationField(hash);
            break;
          case 'select':
            field = _this.renderSelectField(hash);
            break;
          case 'text':
            field = _this.renderTextField(hash);
            break;
          case 'textarea':
            field = _this.renderTextarea(hash);
            break;
        };
        return React.createElement(
          'div',
          { className: 'space-2', key: hash.name },
          header,
          field
        );
      });
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      if (this.props.header) {
        return React.createElement(
          'div',
          { className: 'panel-header' },
          this.props.header
        );
      }
    }
  }, {
    key: 'renderLocationField',
    value: function renderLocationField(hash) {
      var id = (new Date() + Math.random()).split(' ').join('');
      return React.createElement(LocationAutocompleteInput, {
        defaultValue: this.props[hash.name],
        id: id,
        name: hash.name,
        onAutocomplete: this.onAutocompleteLocation,
        placeholder: hash.placeholder
      });
    }
  }, {
    key: 'renderSelectField',
    value: function renderSelectField(hash) {
      return React.createElement(_SimpleSelectField2.default, {
        defaultValue: this.props[hash.name],
        name: hash.name,
        onChangeSelect: this.onChangeInput,
        options: hash.options
      });
    }
  }, {
    key: 'renderTextarea',
    value: function renderTextarea(hash) {
      return React.createElement('textarea', {
        autoComplete: 'off',
        defaultValue: this.props[hash.name],
        name: hash.name,
        onChange: this.onChangeInput,
        placeholder: hash.placeholder,
        rows: hash.rows,
        value: this.props[hash.name]
      });
    }
  }, {
    key: 'renderTextField',
    value: function renderTextField(hash) {
      return React.createElement(_SimpleTextField2.default, {
        name: hash.name,
        numberOnly: !!hash.numberOnly,
        onChangeInput: this.onChangeInput,
        placeholder: hash.placeholder,
        scale: hash.scale,
        value: this.props[hash.name]
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { key: this.state.timestamp },
        this.renderErrors(),
        React.createElement(
          'div',
          { className: 'panel' },
          this.renderHeader(),
          React.createElement(
            'form',
            { action: '#', onSubmit: this.onSubmitForm },
            React.createElement(
              'div',
              { className: 'panel-body' },
              this.renderField(),
              this.props.children
            ),
            React.createElement(
              'div',
              { className: 'panel-footer' },
              React.createElement(
                'div',
                null,
                this.renderCancelButton(),
                React.createElement(
                  'button',
                  {
                    className: cx("btn btn-primary", { loading: this.state.loading })
                  },
                  this.props.submitFormButtonText ? this.props.submitFormButtonText : "Save"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return SimpleForm;
}(React.Component);

;

SimpleForm.propTypes = propTypes;

module.exports = SimpleForm;