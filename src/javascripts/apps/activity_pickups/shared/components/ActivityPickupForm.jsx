const connectToStores = require('alt/utils/connectToStores');
const React = require('react');

const activityPickupActions = require('../actions/ActivityPickupActions');

const activityPickupStore = require('../stores/ActivityPickupStore');

const SimpleForm = require('../../../../components/shared/SimpleForm');

const propTypes = {
  showFlashMessage: React.PropTypes.func.isRequired,
};

class ActivityPickupForm extends React.Component {
  static getPropsFromStores() {
    return activityPickupStore.getState();
  }

  static getStores() {
    return [activityPickupStore];
  }

  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  fields() {
    return [
      {
        label: 'Name of pickup location',
        name: 'name',
        type: 'text',
      },
      {
        label: 'Where is this location?',
        name: 'location',
        placeholder: '',
        type: 'location',
      },
    ];
  }

  onSubmitForm(hash) {
    const _this = this;
    return new Promise(function(fulfill, reject) {
      activityPickupActions.create({
        format: 'for_owner',
        payload: Object.assign({
          activity_id: _this.props.activity.id,
        }, hash),
      }).then(
        function(response) {
          _this.props.showFlashMessage({
            message: 'Pickup location successfully added.',
            status: 'success',
          });
          fulfill({
            response: response,
          });
        },
        function(xhr) {
          reject(xhr);
        }
      );
    });
  }

  render() {
    return (
      <SimpleForm
        header={"Add a new pickup location"}
        fields={this.fields()}
        onSubmitForm={this.onSubmitForm}
      />
    );
  }
};

ActivityPickupForm.propTypes = propTypes;

module.exports = connectToStores(ActivityPickupForm);
module.exports.ActivityPickupForm = ActivityPickupForm;
