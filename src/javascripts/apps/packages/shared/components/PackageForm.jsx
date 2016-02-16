const connectToStores = require('alt/utils/connectToStores');
const React = require('react');

const packageActions = require('../actions/PackageActions');
const packageStore = require('../stores/PackageStore');

const SimpleForm = require('../../../../components/shared/SimpleForm');

const propTypes = {
  onSubmitFormCallback: React.PropTypes.func,
  showFlashMessage: React.PropTypes.func.isRequired,
};

class PackageForm extends React.Component {
  static getPropsFromStores() {
    return packageStore.getState();
  }

  static getStores() {
    return [packageStore];
  }

  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  fields() {
    return [
      {
        label: 'Price',
        name: 'price',
        numberOnly: true,
        scale: 2,
        type: 'text',
      },
      {
        label: 'Number of people',
        name: 'number_of_people',
        numberOnly: true,
        type: 'text',
      },
      {
        label: 'Approval required?',
        name: 'approval_required',
        type: 'checkbox',
      },
      {
        label: 'Is this package for a private group?',
        name: 'private',
        type: 'checkbox',
      },
      {
        label: 'What age is this package for?',
        name: 'age_type',
        type: 'select',
        options: [
          {
            disabled: false,
            text: 'All ages',
            value: 0,
          },
          {
            disabled: false,
            text: 'Adult',
            value: 1,
          },
          {
            disabled: false,
            text: 'Child',
            value: 2,
          },
        ],
      }
    ];
  }

  onSubmitForm(hash) {
    const self = this;
    return new Promise(function(fulfill, reject) {
      packageActions.create({
        payload: Object.assign({
          activity_id: self.props.activity.id,
        }, hash),
      }).then(
        function(response) {
          self.props.showFlashMessage({
            message: 'Package successfully added.',
            status: 'success',
          });
          if (self.props.onSubmitFormCallback) {
            self.props.onSubmitFormCallback();
          }
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
        header={"Add a new package"}
        fields={this.fields()}
        onSubmitForm={this.onSubmitForm}
      />
    );
  }
};

PackageForm.propTypes = propTypes;

module.exports = connectToStores(PackageForm);
module.exports.PackageForm = PackageForm;
