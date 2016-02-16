const React = require('react');

// Components
const Modal = require('../../../../components/shared/Modal');

const propTypes = {
  numberOfStepsRemaining: React.PropTypes.number.isRequired,
  visible: React.PropTypes.bool.isRequired,
};

class CongratulationsModal extends React.Component {
  render() {
    let step = 'Step';
    if (this.props.numberOfStepsRemaining != 1) {
      step += 's';
    }
    return (
      <Modal terminal={true} visible={this.props.visible}>
        <div className="panel-body">
          <div className="text-center">
            <h1 className="color-blue">
              {this.props.numberOfStepsRemaining}
            </h1>
            <h5>
              {`More ${step}`}
            </h5>
            <div className="space-2 space-top-4">
              {"Congratulations! You have successfully created an activity. "}
              <br />
              {"A few more things left to do and you will be able to complete and activate it."}
            </div>
            <button className="btn btn-special modal__close--button space-2">
              {"Continue"}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
};

CongratulationsModal.propTypes = propTypes;

module.exports = CongratulationsModal;
