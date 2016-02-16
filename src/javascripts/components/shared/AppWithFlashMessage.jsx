const React = require('react');

const FlashMessage = require('./FlashMessage');

class AppWithFlashMessage extends React.Component {
  constructor(props) {
    super(props);
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
};

module.exports = AppWithFlashMessage;
