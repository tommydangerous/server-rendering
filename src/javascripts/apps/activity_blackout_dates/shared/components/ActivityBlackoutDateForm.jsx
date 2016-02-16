// Libs
import connectToStores from 'alt/utils/connectToStores';
import React, { Component, PropTypes } from 'react';

// Utils
import formatDate from '../../../../utilities/format-date';

// Actions
import activityBlackoutDateActions from '../actions/ActivityBlackoutDateActions';

// Stores
import activityBlackoutDateStore from '../stores/ActivityBlackoutDateStore';

// Components
import SimpleForm from '../../../../components/shared/SimpleForm';

const propTypes = {
  activity: PropTypes.object.isRequired,
  showFlashMessage: PropTypes.func.isRequired,
};

class ActivityBlackoutDateForm extends Component {
  static getPropsFromStores() {
    return activityBlackoutDateStore.getState();
  }

  static getStores() {
    return [activityBlackoutDateStore];
  }

  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  fields() {
    let maxDate;
    let minDate;
    if (this.props.activity.end_at) {
      maxDate = new Date(formatDate(this.props.activity.end_at));
    }
    if (this.props.activity.start_at) {
      minDate = new Date(formatDate(this.props.activity.start_at));
    }
    return [
      {
        label: 'Start date of blackout',
        maxDate: maxDate,
        minDate: minDate,
        name: 'start_at',
        type: 'date',
      },
      {
        label: 'Last date of blackout',
        maxDate: maxDate,
        minDate: minDate,
        name: 'end_at',
        type: 'date',
      },
    ];
  }

  onSubmitForm(hash) {
    return new Promise((fulfill, reject) => {
      activityBlackoutDateActions.create({
        format: 'for_owner',
        payload: Object.assign({
          activity_id: this.props.activity.id,
        }, hash),
      }).then(
        (response) => {
          this.props.showFlashMessage({
            message: 'Successfully added.',
            status: 'success',
          });
          fulfill({
            response: response,
          });
        },
        (xhr) => {
          reject(xhr);
        }
      );
    });
  }

  render() {
    return (
      <SimpleForm
        header={"Add a Blackout Date (optional)"}
        fields={this.fields()}
        onSubmitForm={this.onSubmitForm}
      />
    );
  }
};

ActivityBlackoutDateForm.propTypes = propTypes;

export default connectToStores(ActivityBlackoutDateForm);
export { ActivityBlackoutDateForm };
