const connectToStores = require('alt/utils/connectToStores');
const React = require('react');

const agentClientActions = require('../actions/AgentClientActions');
const agentClientStore = require('../stores/AgentClientStore');

const SimpleForm = require('../../../../components/shared/SimpleForm');

class AgentClientForm extends React.Component {
  static getPropsFromStores() {
    return agentClientStore.getState();
  }

  static getStores() {
    return [agentClientStore];
  }

  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(payload) {
    const _this = this;
    return new Promise(function(fulfill, reject) {
      agentClientActions.create({
        payload: payload,
      }).then(
        function(response) {
          _this.props.showFlashMessage({
            message: 'Client successfully added.',
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
    const agentClientFields = [
      {
        label: 'Full name',
        name: 'name',
        type: 'text',
      },
    ];

    const submitFormPromise = new Promise(function(fulfill, reject) {

    });

    return (
      <SimpleForm
        header={"Add a new client"}
        fields={agentClientFields}
        onSubmitForm={this.onSubmitForm}
      />
    );
  }
};

AgentClientForm.propTypes = {
  showFlashMessage: React.PropTypes.func.isRequired,
};

module.exports = connectToStores(AgentClientForm);
module.exports.AgentClientForm = AgentClientForm;
