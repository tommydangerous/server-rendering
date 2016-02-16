'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Lib
var className = require('classnames');
var connectToStores = require('alt/utils/connectToStores');
var React = require('react');

// Actions
var activityActions = require('../../shared/actions/ActivityActions');
var imageActions = require('../../../images/shared/actions/ImageActions');

// Stores
var activityStore = require('../../shared/stores/ActivityStore');
var imageStore = require('../../../images/shared/stores/ImageStore');

// Components
var ImageForm = require('../../../images/shared/components/ImageForm');

var propTypes = {
  onSubmitFormCallback: React.PropTypes.func,
  showFlashMessage: React.PropTypes.func
};

var Images = function (_React$Component) {
  _inherits(Images, _React$Component);

  _createClass(Images, null, [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return Object.assign(activityStore.getState(), imageStore.getState());
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [activityStore, imageStore];
    }
  }]);

  function Images(props) {
    _classCallCheck(this, Images);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Images).call(this, props));

    _this.onUpload = _this.onUpload.bind(_this);
    _this.state = {
      loadingImageId: null
    };
    return _this;
  }

  _createClass(Images, [{
    key: 'onClickDelete',
    value: function onClickDelete(image, e) {
      e.preventDefault();
      var self = this;
      this.setState({ loadingImageId: image.id });
      imageActions.delete({
        format: 'for_owner',
        object: {
          id: image.id
        }
      }).then(function (response) {
        self.setState({ loadingImageId: null });
      });
    }
  }, {
    key: 'onClickMakeCoverPhoto',
    value: function onClickMakeCoverPhoto(image, e) {
      var self = this;
      e && e.preventDefault();
      self.setState({ loadingImageId: image.id });
      activityActions.update({
        format: 'for_owner',
        object: {
          id: self.props.activity.id
        },
        payload: {
          cover_image_url: image.url
        }
      }).then(function (response) {
        self.setState({ loadingImageId: null });
      }, function (xhr) {
        self.setState({ loadingImageId: null });
      });
    }
  }, {
    key: 'onUpload',
    value: function onUpload(payload) {
      var self = this;
      return imageActions.create({
        format: 'for_owner',
        payload: Object.assign(payload, {
          attachable_id: this.props.activity.id,
          attachable_type: 'Activity'
        })
      }).then(function (response) {
        if (self.props.images.length === 1) {
          var image = self.props.images[0];
          if (self.props.activity.cover_image_url !== image.url) {
            activityActions.updateAttributes({
              cover_image_url: image.url
            });
          }
        }
        if (self.props.onSubmitFormCallback) {
          self.props.onSubmitFormCallback();
        }
        self.props.showFlashMessage({
          flashMessage: 'Photo successfully uploaded.',
          flashStatus: 'success'
        });
      }, function (xhr) {
        self.props.showFlashMessage({
          flashMessage: xhr.responseJSON.error_message,
          flashStatus: 'error'
        });
      });
    }
  }, {
    key: 'renderImages',
    value: function renderImages() {
      var _this2 = this;

      var self = this;
      return this.props.images.map(function (image) {
        var isCoverPhoto = _this2.props.activity.cover_image_url === image.url;
        var isLoading = self.state.loadingImageId == image.id && (self.props.images_request_loading || self.props.activities_request_loading);
        return React.createElement(
          'div',
          {
            className: className("col-md-6 col-lg-omega-2 col-md-omega-2 space-4", {
              loading: isLoading
            }),
            key: image.id
          },
          React.createElement(
            'div',
            { className: 'img-elastic-height-6' },
            React.createElement('div', {
              className: 'img-absolute img-cover',
              style: { backgroundImage: 'url(' + image.url + ')' }
            })
          ),
          React.createElement(
            'div',
            { className: 'clearfix space-top-2' },
            !isCoverPhoto && React.createElement(
              'div',
              null,
              React.createElement(
                'a',
                {
                  className: 'pull-left',
                  href: '#',
                  onClick: self.onClickMakeCoverPhoto.bind(self, image)
                },
                "Make cover photo"
              ),
              React.createElement(
                'a',
                {
                  className: 'link-reset pull-right',
                  href: '#',
                  onClick: self.onClickDelete.bind(self, image)
                },
                "Delete"
              )
            ),
            isCoverPhoto && React.createElement(
              'div',
              { className: 'text-muted' },
              "Cover photo"
            )
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'row' },
          this.renderImages()
        ),
        React.createElement(
          'div',
          { className: 'panel' },
          React.createElement(
            'div',
            { className: 'panel-header' },
            "Add a photo"
          ),
          React.createElement(
            'div',
            { className: 'panel-body' },
            React.createElement(
              'div',
              { className: className({ loading: this.props.images_request_loading }) },
              React.createElement(ImageForm, { onUpload: this.onUpload })
            )
          )
        )
      );
    }
  }]);

  return Images;
}(React.Component);

;

Images.propTypes = propTypes;

module.exports = connectToStores(Images);
module.exports.Images = Images;