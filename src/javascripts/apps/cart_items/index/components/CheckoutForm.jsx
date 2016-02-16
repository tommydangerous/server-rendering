const connectToStores = require('alt/utils/connectToStores');
const React = require('react');

const checkoutActions = require('../actions/CheckoutActions');

const agentClientStore = require('../../../agent_clients/shared/stores/AgentClientStore');
const cartStore = require('../stores/CartStore');

const SimpleForm = require('../../../../components/shared/SimpleForm');

const propTypes = {
  setContainerLoadingState: React.PropTypes.func.isRequired,
};

class CheckoutForm extends React.Component {
  static getPropsFromStores() {
    return Object.assign(agentClientStore.getState(), cartStore.getState());
  }

  static getStores() {
    return [agentClientStore, cartStore];
  }

  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(hash) {
    this.props.setContainerLoadingState(true);
    const _this = this;
    return new Promise(function(fulfill, reject) {
      checkoutActions.create({
        payload: Object.assign(hash, {
          cart_items: _this.props.cart_items.map(function(object) {
            return object.id;
          })
        }),
      }).then(
        function(response) {
          fulfill({
            response: response,
          });
          window.location = '/cart/complete';
        },
        function(xhr) {
          reject(xhr);
          _this.props.setContainerLoadingState(false);
        }
      );
    });
  }

  render() {
    const options = [
      {
        disabled: true,
        text: '',
        value: '',
      }
    ];
    this.props.agent_clients.map(function(client) {
      options.push({
        text: client.name,
        value: client.id,
      });
    });
    const fields = [
      {
        defaultValue: '',
        label: 'Client name',
        name: 'agent_client_id',
        options: options,
        type: 'select',
      }
    ];
    var submitFormButtonText = 'Confirm Booking';
    if (this.props.cart_items.length > 1) {
      submitFormButtonText += 's';
    }
    return (
      <SimpleForm
        header={"Which client are these bookings for?"}
        fields={fields}
        onSubmitForm={this.onSubmitForm}
        submitFormButtonText={submitFormButtonText}
      />
    );
  }
};

CheckoutForm.propTypes = propTypes;

module.exports = connectToStores(CheckoutForm);
module.exports.CheckoutForm = CheckoutForm;
