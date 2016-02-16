'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var React = require('react');

var agentClientActions = require('../actions/AgentClientActions');
var agentClientStore = require('../stores/AgentClientStore');

var SimpleForm = require('../../../../components/shared/SimpleForm');

var AgentClientForm = function (_React$Component) {
  _inherits(AgentClientForm, _React$Component);

  _createClass(AgentClientForm, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return agentClientStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [agentClientStore];
    }
  }]);

  function AgentClientForm() {
    _classCallCheck(this, AgentClientForm);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(AgentClientForm).call(this));

    _this2.onSubmitForm = _this2.onSubmitForm.bind(_this2);
    return _this2;
  }

  _createClass(AgentClientForm, [{
    key: 'onSubmitForm',
    value: function onSubmitForm(payload) {
      var _this = this;
      return new Promise(function (fulfill, reject) {
        agentClientActions.create({
          payload: payload
        }).then(function (response) {
          _this.props.showFlashMessage({
            message: 'Client successfully added.',
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
      var agentClientFields = [{
        label: 'Full name',
        name: 'name',
        type: 'text'
      }];

      var submitFormPromise = new Promise(function (fulfill, reject) {});

      return React.createElement(SimpleForm, {
        header: "Add a new client",
        fields: agentClientFields,
        onSubmitForm: this.onSubmitForm
      });
    }
  }]);

  return AgentClientForm;
}(React.Component);

;

AgentClientForm.propTypes = {
  showFlashMessage: React.PropTypes.func.isRequired
};

module.exports = connectToStores(AgentClientForm);
module.exports.AgentClientForm = AgentClientForm;