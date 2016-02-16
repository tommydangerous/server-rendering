'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var React = require('react');

var packageActions = require('../actions/PackageActions');
var packageStore = require('../stores/PackageStore');

var SimpleForm = require('../../../../components/shared/SimpleForm');

var propTypes = {
  onSubmitFormCallback: React.PropTypes.func,
  showFlashMessage: React.PropTypes.func.isRequired
};

var PackageForm = function (_React$Component) {
  _inherits(PackageForm, _React$Component);

  _createClass(PackageForm, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return packageStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [packageStore];
    }
  }]);

  function PackageForm(props) {
    _classCallCheck(this, PackageForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PackageForm).call(this, props));

    _this.onSubmitForm = _this.onSubmitForm.bind(_this);
    return _this;
  }

  _createClass(PackageForm, [{
    key: 'fields',
    value: function fields() {
      return [{
        label: 'Price',
        name: 'price',
        numberOnly: true,
        scale: 2,
        type: 'text'
      }, {
        label: 'Number of people',
        name: 'number_of_people',
        numberOnly: true,
        type: 'text'
      }, {
        label: 'Approval required?',
        name: 'approval_required',
        type: 'checkbox'
      }, {
        label: 'Is this package for a private group?',
        name: 'private',
        type: 'checkbox'
      }, {
        label: 'What age is this package for?',
        name: 'age_type',
        type: 'select',
        options: [{
          disabled: false,
          text: 'All ages',
          value: 0
        }, {
          disabled: false,
          text: 'Adult',
          value: 1
        }, {
          disabled: false,
          text: 'Child',
          value: 2
        }]
      }];
    }
  }, {
    key: 'onSubmitForm',
    value: function onSubmitForm(hash) {
      var self = this;
      return new Promise(function (fulfill, reject) {
        packageActions.create({
          payload: Object.assign({
            activity_id: self.props.activity.id
          }, hash)
        }).then(function (response) {
          self.props.showFlashMessage({
            message: 'Package successfully added.',
            status: 'success'
          });
          if (self.props.onSubmitFormCallback) {
            self.props.onSubmitFormCallback();
          }
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
        header: "Add a new package",
        fields: this.fields(),
        onSubmitForm: this.onSubmitForm
      });
    }
  }]);

  return PackageForm;
}(React.Component);

;

PackageForm.propTypes = propTypes;

module.exports = connectToStores(PackageForm);
module.exports.PackageForm = PackageForm;