'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActivityPickupActions = require('../../../activity_pickups/shared/actions/ActivityPickupActions');

var _ActivityPickupActions2 = _interopRequireDefault(_ActivityPickupActions);

var _ActivityPickupForm = require('../../../activity_pickups/shared/components/ActivityPickupForm');

var _ActivityPickupForm2 = _interopRequireDefault(_ActivityPickupForm);

var _ActivityPickupTable = require('../../../activity_pickups/shared/components/ActivityPickupTable');

var _ActivityPickupTable2 = _interopRequireDefault(_ActivityPickupTable);

var _DatepickerInput = require('../../../../components/shared/DatepickerInput');

var _DatepickerInput2 = _interopRequireDefault(_DatepickerInput);

var _LocationAutocompleteInput = require('../../../../components/shared/LocationAutocompleteInput');

var _LocationAutocompleteInput2 = _interopRequireDefault(_LocationAutocompleteInput);

var _PackageForm = require('../../../packages/shared/components/PackageForm');

var _PackageForm2 = _interopRequireDefault(_PackageForm);

var _SimpleCheckbox = require('../../../../components/shared/SimpleCheckbox');

var _SimpleCheckbox2 = _interopRequireDefault(_SimpleCheckbox);

var _SimpleSelectField = require('../../../../components/shared/SimpleSelectField');

var _SimpleSelectField2 = _interopRequireDefault(_SimpleSelectField);

var _SimpleTextField = require('../../../../components/shared/SimpleTextField');

var _SimpleTextField2 = _interopRequireDefault(_SimpleTextField);

var _handleError = require('../../../../utilities/handle-error');

var _handleError2 = _interopRequireDefault(_handleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Actions


// Components


// Utilities


var propTypes = {
  activity: _react.PropTypes.object.isRequired,
  showFlashMessage: _react.PropTypes.func.isRequired
};

var locationTypes = [{
  text: 'Hotel',
  value: 1
}, {
  text: 'Airbnb',
  value: 2
}, {
  text: 'Specific address',
  value: 0
}];

var PickupLocations = function (_React$Component) {
  _inherits(PickupLocations, _React$Component);

  function PickupLocations(props) {
    _classCallCheck(this, PickupLocations);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PickupLocations).call(this, props));

    _this.onAutocompleteLocation = _this.onAutocompleteLocation.bind(_this);
    _this.onChangeCheckbox = _this.onChangeCheckbox.bind(_this);
    _this.onChangeInput = _this.onChangeInput.bind(_this);
    _this.onChangeLocationType = _this.onChangeLocationType.bind(_this);
    _this.onClickSubmit = _this.onClickSubmit.bind(_this);
    _this.resetState = _this.resetState.bind(_this);
    _this.state = _this.initialState();
    return _this;
  }

  _createClass(PickupLocations, [{
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
    key: 'initialState',
    value: function initialState() {
      return {
        end_time: 0,
        extra_charge: false,
        loading: false,
        location_type: locationTypes[0].value,
        private: false,
        start_time: 0
      };
    }
  }, {
    key: 'onAutocompleteLocation',
    value: function onAutocompleteLocation(hash) {
      this.setState(hash);
    }
  }, {
    key: 'onChangeCheckbox',
    value: function onChangeCheckbox(e) {
      var state = {};
      state[e.target.name] = !this.state[e.target.name];
      this.setState(state);
    }
  }, {
    key: 'onChangeLocationType',
    value: function onChangeLocationType(e) {
      var state = {};
      state[e.target.name] = parseInt(e.target.value);
      this.setState(state);
    }
  }, {
    key: 'onChangeInput',
    value: function onChangeInput(e) {
      var state = {};
      state[e.target.name] = e.target.value;
      this.setState(state);
    }
  }, {
    key: 'onClickSubmit',
    value: function onClickSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      this.setState({ loading: true });
      return new Promise(function (fulfill, reject) {
        _ActivityPickupActions2.default.create({
          format: 'for_owner',
          payload: Object.assign({
            activity_id: _this2.props.activity.id
          }, _this2.state)
        }).then(function (response) {
          _this2.props.showFlashMessage({
            message: 'Pickup location successfully added.',
            status: 'success'
          });
          fulfill({
            response: response
          });
          _this2.resetState();
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
    key: 'resetState',
    value: function resetState() {
      var state = {};
      Object.keys(this.state).forEach(function (attr) {
        state[attr] = null;
      });
      this.setState(Object.assign(state, this.initialState()));
    }
  }, {
    key: 'render',
    value: function render() {
      var timeOptions = this.generateTimeOptions();
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'space-4' },
          _react2.default.createElement(_ActivityPickupTable2.default, {
            activity: this.props.activity,
            showFlashMessage: this.props.showFlashMessage
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel' },
          _react2.default.createElement(
            'div',
            { className: 'panel-header' },
            "Add a pickup location"
          ),
          _react2.default.createElement(
            'div',
            { className: 'panel-body' },
            _react2.default.createElement(
              'div',
              { className: 'space-2' },
              _react2.default.createElement(
                'label',
                null,
                "Type of pickup location? (e.g. Hotel, Airbnb, etc."
              ),
              _react2.default.createElement(_SimpleSelectField2.default, {
                defaultValue: this.state.location_type,
                name: 'location_type',
                onChangeSelect: this.onChangeLocationType,
                options: locationTypes
              })
            ),
            this.state.location_type === 0 && _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'space-2' },
                _react2.default.createElement(_SimpleTextField2.default, {
                  label: 'Name of pickup location',
                  name: 'name',
                  onChangeInput: this.onChangeInput,
                  value: this.state.name
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'space-2' },
                _react2.default.createElement(
                  'label',
                  null,
                  "Where is this location?"
                ),
                _react2.default.createElement(_LocationAutocompleteInput2.default, {
                  id: 'pickup-location-autocomplete-input',
                  name: 'location',
                  onAutocomplete: this.onAutocompleteLocation,
                  placeholder: ''
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 space-2' },
                _react2.default.createElement(
                  'label',
                  null,
                  "Start time of pickup"
                ),
                _react2.default.createElement(_SimpleSelectField2.default, {
                  defaultValue: this.state.start_time,
                  name: 'start_time',
                  onChangeSelect: this.onChangeInput,
                  options: timeOptions
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 space-2' },
                _react2.default.createElement(
                  'label',
                  null,
                  "End time of pickup"
                ),
                _react2.default.createElement(_SimpleSelectField2.default, {
                  defaultValue: this.state.end_time,
                  name: 'end_time',
                  onChangeSelect: this.onChangeInput,
                  options: timeOptions
                })
              )
            ),
            _react2.default.createElement(
              'label',
              null,
              "Is there an extra charge for being picked up?"
            ),
            _react2.default.createElement(_SimpleCheckbox2.default, {
              name: 'extra_charge',
              onChangeInput: this.onChangeCheckbox
            }),
            this.state.extra_charge && _react2.default.createElement(
              'div',
              { className: 'space-top-2' },
              _react2.default.createElement(
                'div',
                { className: 'space-2' },
                _react2.default.createElement(_SimpleTextField2.default, {
                  label: 'Price',
                  name: 'price',
                  numberOnly: true,
                  onChangeInput: this.onChangeInput,
                  scale: 2,
                  value: this.state.price
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'space-2' },
                _react2.default.createElement(_SimpleTextField2.default, {
                  label: 'Number of people',
                  name: 'number_of_people',
                  numberOnly: true,
                  onChangeInput: this.onChangeInput,
                  value: this.state.number_of_people
                })
              ),
              _react2.default.createElement(
                'label',
                null,
                "Is this package for a private group?"
              ),
              _react2.default.createElement(_SimpleCheckbox2.default, {
                name: 'private',
                onChangeInput: this.onChangeCheckbox,
                value: this.state.private
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'panel-footer' },
            _react2.default.createElement(
              'a',
              {
                className: (0, _classnames2.default)("btn btn-primary", { loading: this.state.loading }),
                href: '#',
                onClick: this.onClickSubmit
              },
              "Save"
            )
          )
        )
      );
    }
  }]);

  return PickupLocations;
}(_react2.default.Component);

;

exports.default = PickupLocations;