'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = require('classnames');
var React = require('react');

var ActivityForm = require('./ActivityForm');

var propTypes = {
  categories: React.PropTypes.array.isRequired,
  currencies: React.PropTypes.array.isRequired,
  onSubmitForm: React.PropTypes.func.isRequired
};

var BasicInfo = function (_React$Component) {
  _inherits(BasicInfo, _React$Component);

  function BasicInfo() {
    _classCallCheck(this, BasicInfo);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BasicInfo).apply(this, arguments));
  }

  _createClass(BasicInfo, [{
    key: 'fields',
    value: function fields() {
      var categoryOptions = [{
        disabled: true,
        text: '',
        value: ''
      }];
      var currencyOptions = categoryOptions.slice();

      this.props.categories.forEach(function (cat) {
        categoryOptions.push({
          disabled: false,
          text: cat,
          value: cat
        });
      });
      this.props.currencies.forEach(function (cat) {
        currencyOptions.push({
          disabled: false,
          text: cat,
          value: cat
        });
      });

      return [{
        label: 'Name',
        name: 'name',
        type: 'text'
      }, {
        label: 'Type of activity',
        name: 'category',
        options: categoryOptions,
        type: 'select'
      }, {
        label: 'Currency',
        name: 'currency',
        options: currencyOptions,
        type: 'select'
      }, {
        label: 'Describe your activity',
        name: 'description',
        placeholder: 'Give some details about how fun and awesome this experience will be.',
        rows: 6,
        type: 'textarea'
      }];
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(ActivityForm, {
        fields: this.fields(),
        header: "Basic Info",
        onSubmitForm: this.props.onSubmitForm
      });
    }
  }]);

  return BasicInfo;
}(React.Component);

BasicInfo.propTypes = propTypes;

module.exports = BasicInfo;