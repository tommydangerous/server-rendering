'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var propTypes = {
  onUpload: React.PropTypes.func.isRequired
};

// The onUpload() method will be called when the image is uploaded.
// This method must return a promise.
// The method will pass a hash with the following keys: image_data and original_filename
// Example:
// {
//   image_data: "SOME_LONG_TEXT",
//   original_filename: "sauron",
// }

var ImageForm = function (_React$Component) {
  _inherits(ImageForm, _React$Component);

  function ImageForm(props) {
    _classCallCheck(this, ImageForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageForm).call(this, props));

    _this.onChangeInput = _this.onChangeInput.bind(_this);
    _this.state = {
      dataUri: null,
      name: null,
      type: null
    };
    return _this;
  }

  _createClass(ImageForm, [{
    key: 'onChangeInput',
    value: function onChangeInput(e) {
      var self = this;

      var file = e.target.files[0];
      var reader = new FileReader();

      reader.onload = function (upload) {
        var data = upload.target.result;
        var image = data.split(',')[1];
        self.setState({
          dataUri: image
        });

        self.props.onUpload({
          image_data: self.state.dataUri,
          original_filename: self.state.name
        }).then(function (response) {
          self.resetState();
          e.target.value = null;
        });
      };

      this.setState({
        name: file.name,
        type: file.type
      });
      reader.readAsDataURL(file);
    }
  }, {
    key: 'onSubmitForm',
    value: function onSubmitForm(e) {
      e.preventDefault();
    }
  }, {
    key: 'resetState',
    value: function resetState() {
      this.setState({
        dataUri: null,
        name: null,
        type: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { encType: 'multipart/form-data', onSubmit: this.onSubmitForm },
        React.createElement('input', { onChange: this.onChangeInput, type: 'file' })
      );
    }
  }]);

  return ImageForm;
}(React.Component);

;

ImageForm.propTypes = propTypes;

module.exports = ImageForm;