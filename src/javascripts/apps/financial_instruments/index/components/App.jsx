const React = require('react');
const ReactDOM = require('react-dom');

const FinancialInstrumentForm = require('../../shared/components/FinancialInstrumentForm');
const FinancialInstrumentTable = require('../../shared/components/FinancialInstrumentTable');
const FlashMessage = require('../../../../components/shared/FlashMessage');

class App extends React.Component {
  constructor() {
    super();
    this.onCloseFlashMessage = this.onCloseFlashMessage.bind(this);
    this.showFlashMessage = this.showFlashMessage.bind(this);
    this.state = {
      flashMessage: null,
      flashStatus: null,
    };
  }

  onCloseFlashMessage() {
    this.setState({ flashMessage: null, flashStatus: null });
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

        <div className="panel-body">
          <div className="space-2">
            <FinancialInstrumentTable showFlashMessage={this.showFlashMessage} />
          </div>

          <FinancialInstrumentForm showFlashMessage={this.showFlashMessage} />
        </div>
      </div>
    );
  }
};

module.exports = App;
