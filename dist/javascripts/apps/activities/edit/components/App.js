'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActivityBlackoutDateForm = require('../../../activity_blackout_dates/shared/components/ActivityBlackoutDateForm');

var _ActivityBlackoutDateForm2 = _interopRequireDefault(_ActivityBlackoutDateForm);

var _ActivityBlackoutDateTable = require('../../../activity_blackout_dates/shared/components/ActivityBlackoutDateTable');

var _ActivityBlackoutDateTable2 = _interopRequireDefault(_ActivityBlackoutDateTable);

var _OperationalTimes = require('./OperationalTimes');

var _OperationalTimes2 = _interopRequireDefault(_OperationalTimes);

var _PickupLocations = require('./PickupLocations');

var _PickupLocations2 = _interopRequireDefault(_PickupLocations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var className = require('classnames');
var React = require('react');

// Utils
var Constants = require('../utils/Constants');
var parameterWithName = require('../../../../utilities/parameter-with-name');

// Actions
var activityActions = require('../../shared/actions/ActivityActions');
var packageActions = require('../../../packages/shared/actions/PackageActions');
var imageActions = require('../../../images/shared/actions/ImageActions');

// Stores
var activityStore = require('../../shared/stores/ActivityStore');
var packageStore = require('../../../packages/shared/stores/PackageStore');
var imageStore = require('../../../images/shared/stores/ImageStore');

// Components

var ActivityLocationAutocomplete = require('../../shared/components/ActivityLocationAutocomplete');
var AppWithFlashMessage = require('../../../../components/shared/AppWithFlashMessage');
var Availability = require('./Availability');
var BasicInfo = require('./BasicInfo');
var CongratulationsModal = require('./CongratulationsModal');
var Images = require('./Images');
var Location = require('./Location');
var Modal = require('../../../../components/shared/Modal');
var PackageForm = require('../../../packages/shared/components/PackageForm');
var PackageTable = require('../../../packages/shared/components/PackageTable');


var propTypes = {
  activityId: React.PropTypes.number.isRequired
};

var App = function (_AppWithFlashMessage) {
  _inherits(App, _AppWithFlashMessage);

  _createClass(App, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return Object.assign(activityStore.getState(), imageStore.getState(), packageStore.getState());
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [activityStore, imageStore, packageStore];
    }
  }]);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this2.onClickChangeStatus = _this2.onClickChangeStatus.bind(_this2);
    _this2.onClosePublishedModal = _this2.onClosePublishedModal.bind(_this2);
    _this2.onSubmitForm = _this2.onSubmitForm.bind(_this2);
    _this2.switchTabAfterSave = _this2.switchTabAfterSave.bind(_this2);
    _this2.state = {
      activeTab: Constants.tabs[0],
      isPublishedModalVisible: false
    };
    return _this2;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      activityActions.show({
        format: 'for_owner',
        object: {
          id: this.props.activityId
        }
      });

      imageActions.index({
        format: 'for_owner',
        query: {
          activity_id: this.props.activityId
        }
      });

      packageActions.index({
        format: 'for_owner',
        query: {
          activity_id: this.props.activityId
        }
      });
    }
  }, {
    key: 'autosaveIfAttributesChanged',
    value: function autosaveIfAttributesChanged() {
      if (Object.keys(this.props.activity_attributes_changed).length) {
        this.onSubmitForm(this.props.activity_attributes_changed).then();
      }
    }
  }, {
    key: 'isTabComplete',
    value: function isTabComplete(tab) {
      switch (tab.name) {
        case Constants.ADD_EDIT_PHOTOS:
          return this.props.images.length > 0;
        case Constants.BASIC_INFO:
          return this.props.activity && this.props.activity.category && this.props.activity.category.length && this.props.activity.currency && this.props.activity.currency.length && this.props.activity.description && this.props.activity.description.length && this.props.activity.name && this.props.activity.name.length > 0;
        case Constants.LOCATION:
          return this.props.activity && this.props.activity.latitude !== null && this.props.activity.longitude !== null;
        case Constants.AVAILABILITY:
          return this.props.activity && this.props.activity.duration !== null && this.props.activity.end_at && this.props.activity.end_at.length && this.props.activity.start_at && this.props.activity.start_at.length > 0;
        case Constants.MANAGE_PACKAGES:
          return this.props.packages.length > 0;
      }
    }
  }, {
    key: 'numberOfStepsRemaining',
    value: function numberOfStepsRemaining() {
      var _this3 = this;

      var stepsRemaining = 5;
      Constants.sections.map(function (section) {
        section.tabs.map(function (tab) {
          if (_this3.isTabComplete(tab)) {
            stepsRemaining--;
          }
        });
      });
      return stepsRemaining;
    }
  }, {
    key: 'onClickChangeStatus',
    value: function onClickChangeStatus(e) {
      e.preventDefault();
      var self = this;
      this.onSubmitForm({
        status: this.props.activity.status === 'active' ? 'inactive' : 'active'
      }).then(function (response) {
        if (self.props.activity.status === 'active') {
          self.setState({ isPublishedModalVisible: true });
        }
      });
    }
  }, {
    key: 'onClickTab',
    value: function onClickTab(tab, e) {
      e.preventDefault();
      this.autosaveIfAttributesChanged();
      this.setState({ activeTab: tab });
    }
  }, {
    key: 'onClosePublishedModal',
    value: function onClosePublishedModal() {
      this.setState({ isPublishedModalVisible: false });
    }
  }, {
    key: 'onSubmitForm',
    value: function onSubmitForm(payload) {
      var self = this;
      return new Promise(function (fulfill, reject) {
        activityActions.update({
          format: 'for_owner',
          object: {
            id: self.props.activityId
          },
          payload: payload
        }).then(function (response) {
          fulfill({ response: response });
          self.switchTabAfterSave();
        }, function (xhr) {
          reject(xhr);
        });
      });
    }
  }, {
    key: 'switchTabAfterSave',
    value: function switchTabAfterSave() {
      var _this4 = this;

      // Only switch to the next tab if the activity has never been completed,
      // the current tab is complete, and the number of remaining steps is greater than 0
      if (this.props.activity.status === 'incomplete' && this.isTabComplete(this.state.activeTab) && this.numberOfStepsRemaining() > 0) {

        setTimeout(function () {
          var currentIndex = Constants.tabs.indexOf(_this4.state.activeTab);
          var nextTab = Constants.tabs[currentIndex + 1];
          while (_this4.isTabComplete(nextTab) && nextTab.required) {
            currentIndex++;
            nextTab = Constants.tabs[currentIndex];
          }
          if (nextTab.required) {
            _this4.setState({ activeTab: nextTab });
          }
        }, 100);
      }
    }
  }, {
    key: 'renderMainContent',
    value: function renderMainContent() {
      switch (this.state.activeTab.name) {
        case Constants.ADD_EDIT_PHOTOS:
          return React.createElement(Images, {
            onSubmitFormCallback: this.switchTabAfterSave,
            showFlashMessage: this.showFlashMessage
          });
          break;
        case Constants.BLACKOUT_DATES:
          return React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'space-4' },
              React.createElement(_ActivityBlackoutDateTable2.default, {
                activity: this.props.activity,
                showFlashMessage: this.showFlashMessage
              })
            ),
            React.createElement(_ActivityBlackoutDateForm2.default, {
              activity: this.props.activity,
              showFlashMessage: this.showFlashMessage
            })
          );
          break;
        case Constants.PICKUP_LOCATIONS:
          return React.createElement(_PickupLocations2.default, {
            activity: this.props.activity,
            showFlashMessage: this.showFlashMessage
          });
          break;
        case Constants.BASIC_INFO:
          return React.createElement(BasicInfo, {
            categories: this.props.categories,
            currencies: this.props.currencies,
            onSubmitForm: this.onSubmitForm
          });
          break;
        case Constants.AVAILABILITY:
          return React.createElement(Availability, {
            activity: this.props.activity,
            onSubmitForm: this.onSubmitForm,
            showFlashMessage: this.showFlashMessage
          });
          break;
        case Constants.LOCATION:
          return React.createElement(Location, {
            activity: this.props.activity,
            onSubmitForm: this.onSubmitForm
          });
          break;
        case Constants.MANAGE_PACKAGES:
          return React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'space-4' },
              React.createElement(PackageTable, {
                activity: this.props.activity,
                showFlashMessage: this.showFlashMessage
              })
            ),
            React.createElement(PackageForm, {
              activity: this.props.activity,
              onSubmitFormCallback: this.switchTabAfterSave,
              showFlashMessage: this.showFlashMessage
            })
          );
          break;
        case Constants.HOURS_OF_OPERATION:
          return React.createElement(_OperationalTimes2.default, {
            activity: this.props.activity,
            showFlashMessage: this.showFlashMessage
          });
          break;
      }
    }
  }, {
    key: 'renderPublishedModal',
    value: function renderPublishedModal() {
      return React.createElement(
        Modal,
        { onClose: this.onClosePublishedModal, visible: this.state.isPublishedModalVisible },
        React.createElement(
          'div',
          { className: 'panel-body' },
          React.createElement(
            'div',
            { className: 'text-center' },
            React.createElement(
              'h3',
              { className: 'space-top-4' },
              "Congratulations!"
            ),
            React.createElement(
              'h3',
              null,
              'You have published ' + this.props.activity.name
            ),
            React.createElement(
              'div',
              { className: 'space-2 space-top-4' },
              "Now the whole world can experience this activity.",
              React.createElement('br', null)
            ),
            React.createElement(
              'a',
              { className: 'btn btn-special', href: '/bookings/requests/pending' },
              "View Booking Requests"
            )
          )
        )
      );
    }
  }, {
    key: 'renderSideNav',
    value: function renderSideNav(stepsRemaining) {
      var _this = this;
      var tabs = Constants.sections.map(function (section) {
        var sectionTabs = section.tabs.map(function (tab) {
          var complete = _this.isTabComplete(tab);
          return React.createElement(
            'li',
            { key: tab.name },
            React.createElement(
              'a',
              {
                className: 'link-block link-reset list__item',
                href: '#',
                onClick: _this.onClickTab.bind(_this, tab)
              },
              React.createElement(
                'div',
                { className: 'pull-right' },
                tab.required && React.createElement('i', { className: className("fa fa-check", {
                    "icon-green": complete,
                    "icon-incomplete": !complete
                  })
                })
              ),
              React.createElement(
                'h5',
                { className: 'text-normal-font-weight' },
                tab.name
              )
            )
          );
        });
        return React.createElement(
          'div',
          { key: section.name },
          React.createElement(
            'div',
            { className: 'panel-body-h-small space-1 text-muted' },
            React.createElement(
              'strong',
              null,
              section.name
            )
          ),
          React.createElement(
            'ul',
            { className: 'list-unstyled space-4' },
            sectionTabs
          )
        );
      });
      return React.createElement(
        'div',
        { className: 'col-lg-3 col-md-4' },
        tabs,
        this.renderStepsRemaining(stepsRemaining)
      );
    }
  }, {
    key: 'renderStepsRemaining',
    value: function renderStepsRemaining(stepsRemaining) {
      var element = undefined;

      if (stepsRemaining === 0) {
        var buttonText = 'Publish Activity';
        if (this.props.activity.status === 'active') {
          buttonText = 'Unlist Activity';
        }
        element = React.createElement(
          'a',
          {
            className: className("btn btn-block btn-large", {
              'btn-special': this.props.activity.status != 'active',
              'loading': this.props.activities_request_loading
            }),
            href: '#',
            onClick: this.onClickChangeStatus
          },
          buttonText
        );
      } else {
        var step = 'step';
        if (stepsRemaining > 1) {
          step += 's';
        }
        element = React.createElement(
          'button',
          { className: 'btn btn-block btn-large', disabled: true },
          stepsRemaining + ' more ' + step
        );
      }

      return React.createElement(
        'div',
        { className: 'space-4 space-top-4 text-center' },
        element
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var numberOfStepsRemaining = this.numberOfStepsRemaining();
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'background-dark-gray clearfix panel-body-h panel-body-v-small' },
          React.createElement(
            'a',
            {
              className: 'link-media pull-left text-contrast',
              href: '/activities'
            },
            React.createElement('i', { className: 'fa fa-caret-left space-right-1' }),
            "Manage Activities"
          ),
          React.createElement(
            'a',
            {
              className: 'link-media pull-right text-contrast',
              href: '/activities/' + this.props.activity.id,
              target: '_blank'
            },
            "Preview Activity"
          )
        ),
        this.renderFlashMessage(),
        this.renderPublishedModal(),
        React.createElement(CongratulationsModal, {
          numberOfStepsRemaining: numberOfStepsRemaining,
          visible: numberOfStepsRemaining && parameterWithName("new") && parameterWithName("new") === "true" ? true : false
        }),
        React.createElement(
          'div',
          { className: 'panel-body-v' },
          React.createElement(
            'div',
            { className: 'page-container' },
            React.createElement(
              'div',
              { className: 'row' },
              this.renderSideNav(numberOfStepsRemaining),
              React.createElement(
                'div',
                { className: className("col-lg-9 col-md-8", { loading: this.props.activities_request_loading }) },
                this.renderMainContent()
              )
            )
          )
        )
      );
    }
  }]);

  return App;
}(AppWithFlashMessage);

;

App.propTypes = propTypes;

module.exports = connectToStores(App);
module.exports.App = App;