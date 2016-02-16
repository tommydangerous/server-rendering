// Lib
const className = require('classnames');
const connectToStores = require('alt/utils/connectToStores');
const React = require('react');

// Actions
const activityActions = require('../../shared/actions/ActivityActions');
const imageActions = require('../../../images/shared/actions/ImageActions');

// Stores
const activityStore = require('../../shared/stores/ActivityStore');
const imageStore = require('../../../images/shared/stores/ImageStore');

// Components
const ImageForm = require('../../../images/shared/components/ImageForm');

const propTypes = {
  onSubmitFormCallback: React.PropTypes.func,
  showFlashMessage: React.PropTypes.func,
};

class Images extends React.Component {
  static getPropsFromStores() {
    return Object.assign(
      activityStore.getState(),
      imageStore.getState()
    );
  }

  static getStores() {
    return [activityStore, imageStore];
  }

  constructor(props) {
    super(props);
    this.onUpload = this.onUpload.bind(this);
    this.state = {
      loadingImageId: null,
    };
  }

  onClickDelete(image, e) {
    e.preventDefault();
    const self = this;
    this.setState({ loadingImageId: image.id });
    imageActions.delete({
      format: 'for_owner',
      object: {
        id: image.id,
      },
    }).then(
      function(response) {
        self.setState({ loadingImageId: null });
      }
    );
  }

  onClickMakeCoverPhoto(image, e) {
    const self = this;
    e && e.preventDefault();
    self.setState({ loadingImageId: image.id });
    activityActions.update({
      format: 'for_owner',
      object: {
        id: self.props.activity.id,
      },
      payload: {
        cover_image_url: image.url,
      },
    }).then(
      function(response) {
        self.setState({ loadingImageId: null });
      },
      function(xhr) {
        self.setState({ loadingImageId: null });
      }
    );
  }

  onUpload(payload) {
    const self = this;
    return imageActions.create({
      format: 'for_owner',
      payload: Object.assign(payload, {
        attachable_id: this.props.activity.id,
        attachable_type: 'Activity',
      }),
    }).then(
      function(response) {
        if (self.props.images.length === 1) {
          const image = self.props.images[0];
          if (self.props.activity.cover_image_url !== image.url) {
            activityActions.updateAttributes({
              cover_image_url: image.url,
            });
          }
        }
        if (self.props.onSubmitFormCallback) {
          self.props.onSubmitFormCallback();
        }
        self.props.showFlashMessage({
          flashMessage: 'Photo successfully uploaded.',
          flashStatus: 'success',
        });
      },
      function(xhr) {
        self.props.showFlashMessage({
          flashMessage: xhr.responseJSON.error_message,
          flashStatus: 'error',
        });
      }
    );
  }

  renderImages() {
    const self = this;
    return this.props.images.map((image) => {
      const isCoverPhoto = this.props.activity.cover_image_url === image.url;
      const isLoading = self.state.loadingImageId == image.id &&
        (self.props.images_request_loading || self.props.activities_request_loading);
      return (
        <div
          className={className("col-md-6 col-lg-omega-2 col-md-omega-2 space-4", {
            loading: isLoading
          })}
          key={image.id}
        >
          <div className="img-elastic-height-6">
            <div
              className="img-absolute img-cover"
              style={{ backgroundImage: `url(${image.url})` }}
            >
            </div>
          </div>
          <div className="clearfix space-top-2">
            {!isCoverPhoto && (
              <div>
                <a
                  className="pull-left"
                  href="#"
                  onClick={self.onClickMakeCoverPhoto.bind(self, image)}
                >
                  {"Make cover photo"}
                </a>
                <a
                  className="link-reset pull-right"
                  href="#"
                  onClick={self.onClickDelete.bind(self, image)}
                >
                  {"Delete"}
                </a>
              </div>
            )}
            {isCoverPhoto && (
              <div className="text-muted">
                {"Cover photo"}
              </div>
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
    <div>
      <div className="row">
        {this.renderImages()}
      </div>

      <div className="panel">
        <div className="panel-header">
          {"Add a photo"}
        </div>
        <div className="panel-body">
          <div className={className({ loading: this.props.images_request_loading })}>
            <ImageForm onUpload={this.onUpload} />
          </div>
        </div>
      </div>
    </div>
    );
  }
};

Images.propTypes = propTypes;

module.exports = connectToStores(Images);
module.exports.Images = Images;
