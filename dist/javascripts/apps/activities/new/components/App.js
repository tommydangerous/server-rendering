'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var className = require('classnames');
var React = require('react');

var handleError = require('../../../../utilities/handle-error');

var activityActions = require('../../shared/actions/ActivityActions');
var activityStore = require('../../shared/stores/ActivityStore');

var ActivityLocationAutocomplete = require('../../shared/components/ActivityLocationAutocomplete');
var AppWithFlashMessage = require('../../../../components/shared/AppWithFlashMessage');

var App = function (_AppWithFlashMessage) {
  _inherits(App, _AppWithFlashMessage);

  _createClass(App, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return activityStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [activityStore];
    }
  }]);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this2.onAutocomplete = _this2.onAutocomplete.bind(_this2);
    _this2.onChangeInput = _this2.onChangeInput.bind(_this2);
    _this2.onClickButton = _this2.onClickButton.bind(_this2);
    return _this2;
  }

  _createClass(App, [{
    key: 'onAutocomplete',
    value: function onAutocomplete(hash) {
      this.setState(hash);
    }
  }, {
    key: 'onChangeInput',
    value: function onChangeInput(e) {
      this.state[e.target.name] = e.target.value;
    }
  }, {
    key: 'onClickButton',
    value: function onClickButton(e) {
      e.preventDefault();
      var _this = this;
      activityActions.create({
        payload: this.state
      }).then(function (response) {
        window.location = '/activities/' + response.activity.id + '/edit?new=true';
      }, function (xhr) {
        _this.setState({
          flashMessage: handleError(xhr),
          flashStatus: 'error'
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.renderFlashMessage(),
        React.createElement(
          'div',
          { className: 'panel-body page-container' },
          React.createElement(
            'h2',
            { className: 'space-6' },
            "List Your Activity"
          ),
          React.createElement(
            'div',
            { className: 'space-4' },
            React.createElement(
              'label',
              null,
              React.createElement(
                'h5',
                null,
                "Name of your activity"
              )
            ),
            React.createElement('input', {
              autoComplete: 'off',
              className: 'input-large',
              name: 'name',
              onChange: this.onChangeInput,
              placeholder: 'Something short and exciting',
              type: 'text'
            })
          ),
          React.createElement(
            'div',
            { className: 'space-4' },
            React.createElement(
              'label',
              null,
              React.createElement(
                'h5',
                null,
                "Location"
              )
            ),
            React.createElement(ActivityLocationAutocomplete, {
              inputClassName: "input-large",
              onAutocomplete: this.onAutocomplete
            })
          ),
          React.createElement(
            'div',
            { className: 'text-right' },
            React.createElement(
              'button',
              {
                className: className("btn btn-large btn-primary", { loading: this.props.requestLoading }),
                onClick: this.onClickButton
              },
              "Continue"
            )
          )
        )
      );
    }
  }]);

  return App;
}(AppWithFlashMessage);

;

module.exports = connectToStores(App);
module.exports.App = App;