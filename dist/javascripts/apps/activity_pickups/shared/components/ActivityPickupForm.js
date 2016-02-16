'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var React = require('react');

var activityPickupActions = require('../actions/ActivityPickupActions');

var activityPickupStore = require('../stores/ActivityPickupStore');

var SimpleForm = require('../../../../components/shared/SimpleForm');

var propTypes = {
  showFlashMessage: React.PropTypes.func.isRequired
};

var ActivityPickupForm = function (_React$Component) {
  _inherits(ActivityPickupForm, _React$Component);

  _createClass(ActivityPickupForm, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return activityPickupStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [activityPickupStore];
    }
  }]);

  function ActivityPickupForm(props) {
    _classCallCheck(this, ActivityPickupForm);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityPickupForm).call(this, props));

    _this2.onSubmitForm = _this2.onSubmitForm.bind(_this2);
    return _this2;
  }

  _createClass(ActivityPickupForm, [{
    key: 'fields',
    value: function fields() {
      return [{
        label: 'Name of pickup location',
        name: 'name',
        type: 'text'
      }, {
        label: 'Where is this location?',
        name: 'location',
        placeholder: '',
        type: 'location'
      }];
    }
  }, {
    key: 'onSubmitForm',
    value: function onSubmitForm(hash) {
      var _this = this;
      return new Promise(function (fulfill, reject) {
        activityPickupActions.create({
          format: 'for_owner',
          payload: Object.assign({
            activity_id: _this.props.activity.id
          }, hash)
        }).then(function (response) {
          _this.props.showFlashMessage({
            message: 'Pickup location successfully added.',
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
      return React.createElement(SimpleForm, {
        header: "Add a new pickup location",
        fields: this.fields(),
        onSubmitForm: this.onSubmitForm
      });
    }
  }]);

  return ActivityPickupForm;
}(React.Component);

;

ActivityPickupForm.propTypes = propTypes;

module.exports = connectToStores(ActivityPickupForm);
module.exports.ActivityPickupForm = ActivityPickupForm;