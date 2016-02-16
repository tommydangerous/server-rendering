const connectToStores = require('alt/utils/connectToStores');
const React = require('react');

const financialInstrumentActions = require('../../shared/actions/FinancialInstrumentActions');
const financialInstrumentStore = require('../../shared/stores/FinancialInstrumentStore');

const SimpleForm = require('../../../../components/shared/SimpleForm');

class FinancialInstrumentForm extends React.Component {
  static getPropsFromStores() {
    return financialInstrumentStore.getState();
  }

  static getStores() {
    return [financialInstrumentStore];
  }

  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(hash) {
    const _this = this;
    return new Promise(function(fulfill, reject) {
      financialInstrumentActions.create({
        payload: hash,
      }).then(
        function(response) {
          _this.props.showFlashMessage({
            message: 'Financial instrument successfully added.',
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
    const fields = [
      {
        defaultValue: '',
        label: 'Instrument type',
        name: 'instrument_type',
        options: [
          {
            disabled: true,
            text: '',
            value: '',
          },
          {
            text: 'Bank account',
            value: 'bank_account',
          },
          {
            text: 'Card',
            value: 'card',
          },
        ],
        type: 'select',
      },
    ];
    return (
      <SimpleForm
        header={"Add a new financial instrument"}
        fields={fields}
        onSubmitForm={this.onSubmitForm}
      />
    );
  }
};

FinancialInstrumentForm.propTypes = {
  showFlashMessage: React.PropTypes.func.isRequired,
};

module.exports = connectToStores(FinancialInstrumentForm);
module.exports.FinancialInstrumentForm = FinancialInstrumentForm;
