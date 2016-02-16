const React = require('react');

const AgentClientForm = require('../../shared/components/AgentClientForm');
const AgentClientTable = require('../../shared/components/AgentClientTable');
const FlashMessage = require('../../../../components/shared/FlashMessage');

class AgentClientApp extends React.Component {
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
            <AgentClientTable showFlashMessage={this.showFlashMessage} />
          </div>

          <AgentClientForm showFlashMessage={this.showFlashMessage} />
        </div>
      </div>
    );
  }
};

module.exports = AgentClientApp;
