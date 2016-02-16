import React, { Component, PropTypes } from 'react';

const propTypes = {
  message: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
};

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose(e) {
    e.preventDefault();
    this.props.onClose();
  }

  render() {
    return (
      <div className={"flash text-center flash--" + this.props.status}>
        <a className="flash__close" href="#" onClick={this.onClickClose}>
          <i className="fa fa-times" />
        </a>
        <h5>
          {this.props.message}
        </h5>
      </div>
    );
  }
};

FlashMessage.propTypes = propTypes;

module.exports = FlashMessage;
