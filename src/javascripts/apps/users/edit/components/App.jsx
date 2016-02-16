// Libs
import React, { PropTypes } from 'react';

// Stores
import imageActions from '../../../images/shared/actions/ImageActions';

// Components
import AppWithFlashMessage from '../../../../components/shared/AppWithFlashMessage';
import ImageForm from '../../../images/shared/components/ImageForm';

const propTypes = {
  userId: PropTypes.number.isRequired,
};

class App extends AppWithFlashMessage {
  constructor(props) {
    super(props);
    this.onUpload = this.onUpload.bind(this);
  }

  onUpload(payload) {
    return imageActions.create({
      format: 'for_owner',
      payload: Object.assign(payload, {
        attachable_id: this.props.userId,
        attachable_type: 'User',
      }),
    }).then(
      (respone) => {
        console.log(respone);
        this.showFlashMessage({
          message: 'Profile image updated.',
          status: 'success',
        });
      },
      (xhr) => {
        this.showFlashMessage({
          message: xhr.responseJSON.error_message,
          status: 'error',
        });
      }
    );
  }

  render() {
    return (
      <div>
        {this.renderFlashMessage()}
        <div className="panel-body">
          <div className="panel">
            <div className="panel-header">
              {"Edit profile image"}
            </div>
            <div className="panel-body">
              <ImageForm onUpload={this.onUpload} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

module.exports = App;
