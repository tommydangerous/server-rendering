const cx = require('classnames');
const React = require('react');

const AgentClientForm = require('../../../agent_clients/shared/components/AgentClientForm');
const AgentClientTable = require('../../../agent_clients/shared/components/AgentClientTable');
const CartItemTable = require('./CartItemTable');
const CheckoutForm = require('./CheckoutForm');
const FinancialInstrumentTable = require(
  '../../../financial_instruments/shared/components/FinancialInstrumentTable'
);
const FinancialInstrumentForm = require(
  '../../../financial_instruments/shared/components/FinancialInstrumentForm'
);
const FlashMessage = require('../../../../components/shared/FlashMessage');

class App extends React.Component {
  constructor() {
    super();
    this.onCloseFlashMessage = this.onCloseFlashMessage.bind(this);
    this.setContainerLoadingState = this.setContainerLoadingState.bind(this);
    this.showFlashMessage = this.showFlashMessage.bind(this);
    this.state = {
      flashMessage: null,
      flashStatus: null,
      loading: false,
    };
  }

  onCloseFlashMessage() {
    this.setState({ flashMessage: null, flashStatus: null });
  }

  setContainerLoadingState(value) {
    this.setState({ loading: value });
  }

  showFlashMessage(options) {
    this.setState({
      flashMessage: options.message,
      flashStatus: options.status,
    });
  }

  renderFlashMessage() {
    if (this.state.flashMessage && this.state.flashStatus) {
      return (
        <FlashMessage
          message={this.state.flashMessage}
          onClose={this.onCloseFlashMessage}
          status={this.state.flashStatus}
        />
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderFlashMessage()}

        <div className={cx("panel-body", { loading: this.state.loading })}>
          <div className="space-2">
            <CartItemTable showFlashMessage={this.showFlashMessage} />
          </div>

          <div className="space-2">
            <FinancialInstrumentTable showFlashMessage={this.showFlashMessage} />
          </div>

          <div className="space-2">
            <FinancialInstrumentForm showFlashMessage={this.showFlashMessage} />
          </div>

          <div className="space-2">
            <AgentClientTable showFlashMessage={this.showFlashMessage} />
          </div>

          <div className="space-2">
            <AgentClientForm showFlashMessage={this.showFlashMessage} />
          </div>

          <div>
            <CheckoutForm setContainerLoadingState={this.setContainerLoadingState} />
          </div>
        </div>
      </div>
    );
  }
};

module.exports = App;
