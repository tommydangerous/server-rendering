const connectToStores = require('alt/utils/connectToStores');
const className = require('classnames');
const React = require('react');

// Utils
const Constants = require('../utils/Constants');
const parameterWithName = require('../../../../utilities/parameter-with-name');

// Actions
const activityActions = require('../../shared/actions/ActivityActions');
const packageActions = require('../../../packages/shared/actions/PackageActions');
const imageActions = require('../../../images/shared/actions/ImageActions');

// Stores
const activityStore = require('../../shared/stores/ActivityStore');
const packageStore = require('../../../packages/shared/stores/PackageStore');
const imageStore = require('../../../images/shared/stores/ImageStore');

// Components
import ActivityBlackoutDateForm from
  '../../../activity_blackout_dates/shared/components/ActivityBlackoutDateForm';
import ActivityBlackoutDateTable from
  '../../../activity_blackout_dates/shared/components/ActivityBlackoutDateTable';
const ActivityLocationAutocomplete = require(
  '../../shared/components/ActivityLocationAutocomplete'
);
const AppWithFlashMessage = require('../../../../components/shared/AppWithFlashMessage');
const Availability = require('./Availability');
const BasicInfo = require('./BasicInfo');
const CongratulationsModal = require('./CongratulationsModal');
const Images = require('./Images');
const Location = require('./Location');
const Modal = require('../../../../components/shared/Modal');
const PackageForm = require('../../../packages/shared/components/PackageForm');
const PackageTable = require('../../../packages/shared/components/PackageTable');
import OperationalTimes from './OperationalTimes';
import PickupLocations from './PickupLocations';

const propTypes = {
  activityId: React.PropTypes.number.isRequired,
};

class App extends AppWithFlashMessage {
  static getPropsFromStores() {
    return Object.assign(
      activityStore.getState(),
      imageStore.getState(),
      packageStore.getState()
    );
  }

  static getStores() {
    return [activityStore, imageStore, packageStore];
  }

  constructor(props) {
    super(props);
    this.onClickChangeStatus = this.onClickChangeStatus.bind(this);
    this.onClosePublishedModal = this.onClosePublishedModal.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.switchTabAfterSave = this.switchTabAfterSave.bind(this);
    this.state = {
      activeTab: Constants.tabs[0],
      isPublishedModalVisible: false,
    };
  }

  componentDidMount() {
    activityActions.show({
      format: 'for_owner',
      object: {
        id: this.props.activityId,
      },
    });

    imageActions.index({
      format: 'for_owner',
      query: {
        activity_id: this.props.activityId,
      },
    });

    packageActions.index({
      format: 'for_owner',
      query: {
        activity_id: this.props.activityId,
      },
    });
  }

  autosaveIfAttributesChanged() {
    if (Object.keys(this.props.activity_attributes_changed).length) {
      this.onSubmitForm(this.props.activity_attributes_changed).then();
    }
  }

  isTabComplete(tab) {
    switch (tab.name) {
      case Constants.ADD_EDIT_PHOTOS:
        return this.props.images.length > 0;
      case Constants.BASIC_INFO:
        return this.props.activity &&
               this.props.activity.category && this.props.activity.category.length &&
               this.props.activity.currency && this.props.activity.currency.length &&
               this.props.activity.description && this.props.activity.description.length &&
               this.props.activity.name && this.props.activity.name.length > 0;
      case Constants.LOCATION:
        return this.props.activity &&
               this.props.activity.latitude !== null &&
               this.props.activity.longitude !== null;
      case Constants.AVAILABILITY:
        return this.props.activity &&
               this.props.activity.duration !== null &&
               this.props.activity.end_at && this.props.activity.end_at.length &&
               this.props.activity.start_at && this.props.activity.start_at.length > 0;
      case Constants.MANAGE_PACKAGES:
        return this.props.packages.length > 0;
    }
  }

  numberOfStepsRemaining() {
    let stepsRemaining = 5;
    Constants.sections.map((section) => {
      section.tabs.map((tab) => {
        if (this.isTabComplete(tab)) {
          stepsRemaining--;
        }
      })
    });
    return stepsRemaining;
  }

  onClickChangeStatus(e) {
    e.preventDefault();
    const self = this;
    this.onSubmitForm({
      status: this.props.activity.status === 'active' ? 'inactive' : 'active',
    }).then(
      (response) => {
        if (self.props.activity.status === 'active') {
          self.setState({ isPublishedModalVisible: true });
        }
      }
    );
  }

  onClickTab(tab, e) {
    e.preventDefault();
    this.autosaveIfAttributesChanged();
    this.setState({ activeTab: tab });
  }

  onClosePublishedModal() {
    this.setState({ isPublishedModalVisible: false });
  }

  onSubmitForm(payload) {
    const self = this;
    return new Promise(function(fulfill, reject) {
      activityActions.update({
        format: 'for_owner',
        object: {
          id: self.props.activityId,
        },
        payload: payload,
      }).then(
        function(response) {
          fulfill({ response: response });
          self.switchTabAfterSave();
        },
        function(xhr) {
          reject(xhr);
        }
      );
    });
  }

  switchTabAfterSave() {
    // Only switch to the next tab if the activity has never been completed,
    // the current tab is complete, and the number of remaining steps is greater than 0
    if (this.props.activity.status === 'incomplete' && this.isTabComplete(this.state.activeTab) &&
      this.numberOfStepsRemaining() > 0) {

      setTimeout(() => {
        let currentIndex = Constants.tabs.indexOf(this.state.activeTab);
        let nextTab = Constants.tabs[currentIndex + 1];
        while (this.isTabComplete(nextTab) && nextTab.required) {
          currentIndex++;
          nextTab = Constants.tabs[currentIndex];
        }
        if (nextTab.required) {
          this.setState({ activeTab: nextTab });
        }
      }, 100);
    }
  }

  renderMainContent() {
    switch (this.state.activeTab.name) {
      case Constants.ADD_EDIT_PHOTOS:
        return (
          <Images
            onSubmitFormCallback={this.switchTabAfterSave}
            showFlashMessage={this.showFlashMessage}
          />
        );
        break;
      case Constants.BLACKOUT_DATES:
        return (
          <div>
            <div className="space-4">
              <ActivityBlackoutDateTable
                activity={this.props.activity}
                showFlashMessage={this.showFlashMessage}
              />
            </div>

            <ActivityBlackoutDateForm
              activity={this.props.activity}
              showFlashMessage={this.showFlashMessage}
            />
          </div>
        );
        break;
      case Constants.PICKUP_LOCATIONS:
        return (
          <PickupLocations
            activity={this.props.activity}
            showFlashMessage={this.showFlashMessage}
          />
        );
        break;
      case Constants.BASIC_INFO:
        return (
          <BasicInfo
            categories={this.props.categories}
            currencies={this.props.currencies}
            onSubmitForm={this.onSubmitForm}
          />
        );
        break;
      case Constants.AVAILABILITY:
        return (
          <Availability
            activity={this.props.activity}
            onSubmitForm={this.onSubmitForm}
            showFlashMessage={this.showFlashMessage}
          />
        );
        break;
      case Constants.LOCATION:
        return (
          <Location
            activity={this.props.activity}
            onSubmitForm={this.onSubmitForm}
          />
        );
        break;
      case Constants.MANAGE_PACKAGES:
        return (
          <div>
            <div className="space-4">
              <PackageTable
                activity={this.props.activity}
                showFlashMessage={this.showFlashMessage}
              />
            </div>

            <PackageForm
              activity={this.props.activity}
              onSubmitFormCallback={this.switchTabAfterSave}
              showFlashMessage={this.showFlashMessage}
            />
          </div>
        );
        break;
      case Constants.HOURS_OF_OPERATION:
        return (
          <OperationalTimes
            activity={this.props.activity}
            showFlashMessage={this.showFlashMessage}
          />
        );
        break;
    }
  }

  renderPublishedModal() {
    return (
      <Modal onClose={this.onClosePublishedModal} visible={this.state.isPublishedModalVisible}>
        <div className="panel-body">
          <div className="text-center">
            <h3 className="space-top-4">
              {"Congratulations!"}
            </h3>
            <h3>
              {`You have published ${this.props.activity.name}`}
            </h3>
            <div className="space-2 space-top-4">
              {"Now the whole world can experience this activity."}
              <br />
            </div>
            <a className="btn btn-special" href="/bookings/requests/pending">
              {"View Booking Requests"}
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  renderSideNav(stepsRemaining) {
    const _this = this;
    const tabs = Constants.sections.map(function(section) {
      const sectionTabs = section.tabs.map(function(tab) {
        const complete = _this.isTabComplete(tab);
        return (
          <li key={tab.name}>
            <a
              className="link-block link-reset list__item"
              href="#"
              onClick={_this.onClickTab.bind(_this, tab)}
            >
              <div className="pull-right">
                {tab.required && (
                  <i className={
                      className("fa fa-check", {
                        "icon-green": complete,
                        "icon-incomplete": !complete,
                      })
                    }
                  />
                )}
              </div>
              <h5 className="text-normal-font-weight">
                {tab.name}
              </h5>
            </a>
          </li>
        );
      });
      return (
        <div key={section.name}>
          <div className="panel-body-h-small space-1 text-muted">
            <strong>
              {section.name}
            </strong>
          </div>
          <ul className="list-unstyled space-4">
            {sectionTabs}
          </ul>
        </div>
      )
    });
    return (
      <div className="col-lg-3 col-md-4">
        {tabs}
        {this.renderStepsRemaining(stepsRemaining)}
      </div>
    );
  }

  renderStepsRemaining(stepsRemaining) {
    let element;

    if (stepsRemaining === 0) {
      let buttonText = 'Publish Activity';
      if (this.props.activity.status === 'active') {
        buttonText = 'Unlist Activity';
      }
      element = (
        <a
          className={
            className("btn btn-block btn-large", {
              'btn-special': this.props.activity.status != 'active',
              'loading': this.props.activities_request_loading,
            })
          }
          href="#"
          onClick={this.onClickChangeStatus}
        >
          {buttonText}
        </a>
      );
    } else {
      let step = 'step';
      if (stepsRemaining > 1) {
        step += 's';
      }
      element = (
        <button className="btn btn-block btn-large" disabled={true}>
          {`${stepsRemaining} more ${step}`}
        </button>
      );
    }

    return (
      <div className="space-4 space-top-4 text-center">
        {element}
      </div>
    );
  }

  render() {
    const numberOfStepsRemaining = this.numberOfStepsRemaining();
    return (
      <div>
        <div className="background-dark-gray clearfix panel-body-h panel-body-v-small">
          <a
            className="link-media pull-left text-contrast"
            href="/activities"
          >
            <i className="fa fa-caret-left space-right-1" />
            {"Manage Activities"}
          </a>
          <a
            className="link-media pull-right text-contrast"
            href={`/activities/${this.props.activity.id}`}
            target="_blank"
          >
            {"Preview Activity"}
          </a>
        </div>

        {this.renderFlashMessage()}

        {this.renderPublishedModal()}

        <CongratulationsModal
          numberOfStepsRemaining={numberOfStepsRemaining}
          visible={numberOfStepsRemaining &&
            parameterWithName("new") && parameterWithName("new") === "true" ? true : false
          }
        />

        <div className="panel-body-v">
          <div className="page-container">
            <div className="row">
              {this.renderSideNav(numberOfStepsRemaining)}
              <div className={
                className("col-lg-9 col-md-8", { loading: this.props.activities_request_loading })
              }>
                {this.renderMainContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

App.propTypes = propTypes;

module.exports = connectToStores(App);
module.exports.App = App;
