'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityBlackoutDateForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectToStores = require('alt/utils/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formatDate = require('../../../../utilities/format-date');

var _formatDate2 = _interopRequireDefault(_formatDate);

var _ActivityBlackoutDateActions = require('../actions/ActivityBlackoutDateActions');

var _ActivityBlackoutDateActions2 = _interopRequireDefault(_ActivityBlackoutDateActions);

var _ActivityBlackoutDateStore = require('../stores/ActivityBlackoutDateStore');

var _ActivityBlackoutDateStore2 = _interopRequireDefault(_ActivityBlackoutDateStore);

var _SimpleForm = require('../../../../components/shared/SimpleForm');

var _SimpleForm2 = _interopRequireDefault(_SimpleForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Libs


// Utils


// Actions


// Stores


// Components


var propTypes = {
  activity: _react.PropTypes.object.isRequired,
  showFlashMessage: _react.PropTypes.func.isRequired
};

var ActivityBlackoutDateForm = function (_Component) {
  _inherits(ActivityBlackoutDateForm, _Component);

  _createClass(ActivityBlackoutDateForm, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return _ActivityBlackoutDateStore2.default.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [_ActivityBlackoutDateStore2.default];
    }
  }]);

  function ActivityBlackoutDateForm(props) {
    _classCallCheck(this, ActivityBlackoutDateForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityBlackoutDateForm).call(this, props));

    _this.onSubmitForm = _this.onSubmitForm.bind(_this);
    return _this;
  }

  _createClass(ActivityBlackoutDateForm, [{
    key: 'fields',
    value: function fields() {
      var maxDate = undefined;
      var minDate = undefined;
      if (this.props.activity.end_at) {
        maxDate = new Date((0, _formatDate2.default)(this.props.activity.end_at));
      }
      if (this.props.activity.start_at) {
        minDate = new Date((0, _formatDate2.default)(this.props.activity.start_at));
      }
      return [{
        label: 'Start date of blackout',
        maxDate: maxDate,
        minDate: minDate,
        name: 'start_at',
        type: 'date'
      }, {
        label: 'Last date of blackout',
        maxDate: maxDate,
        minDate: minDate,
        name: 'end_at',
        type: 'date'
      }];
    }
  }, {
    key: 'onSubmitForm',
    value: function onSubmitForm(hash) {
      var _this2 = this;

      return new Promise(function (fulfill, reject) {
        _ActivityBlackoutDateActions2.default.create({
          format: 'for_owner',
          payload: Object.assign({
            activity_id: _this2.props.activity.id
          }, hash)
        }).then(function (response) {
          _this2.props.showFlashMessage({
            message: 'Successfully added.',
            status: 'success'
          });
          fulfill({
            response: response
          });
        }, function (xhr) {
          reject(xhr);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_SimpleForm2.default, {
        header: "Add a Blackout Date (optional)",
        fields: this.fields(),
        onSubmitForm: this.onSubmitForm
      });
    }
  }]);

  return ActivityBlackoutDateForm;
}(_react.Component);

;

ActivityBlackoutDateForm.propTypes = propTypes;

exports.default = (0, _connectToStores2.default)(ActivityBlackoutDateForm);
exports.ActivityBlackoutDateForm = ActivityBlackoutDateForm;