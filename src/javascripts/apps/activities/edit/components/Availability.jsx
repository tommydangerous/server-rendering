// Libs
import React, { Component, PropTypes } from 'react';

// Components
import ActivityForm from './ActivityForm';

// Utils
import pluralize from '../../../../utilities/pluralize';

const propTypes = {
  activity: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  showFlashMessage: PropTypes.func.isRequired,
};

class Availability extends Component {
  constructor(props) {
    super(props);
    this.fields = this.fields.bind(this);
  }

  fields() {
    const durationOptions = [
      {
        disabled: this.props.activity.duration ? true : false,
        text: '',
        value: '',
      },
    ];
    for (let i = 0; i < 25; i++) {
      durationOptions.push({
        disabled: false,
        text: pluralize('hour', i),
        value: i,
      });
    }
    return [
      {
        label: 'What date will this activity start on?',
        name: 'start_at',
        type: 'date',
      },
      {
        label: 'What date will this activity end on?',
        name: 'end_at',
        type: 'date',
      },
      {
        label: 'What is the duration of this activity?',
        name: 'duration',
        options: durationOptions,
        type: 'select',
      },
    ];
  }

  render() {
    return (
      <div>
        <ActivityForm
          fields={this.fields()}
          header={"Availability"}
          onSubmitForm={this.props.onSubmitForm}
        />
      </div>
    );
  }
}

Availability.propTypes = propTypes;

module.exports = Availability;
