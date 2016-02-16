const React = require('react');

const propTypes = {
  onUpload: React.PropTypes.func.isRequired,
};

// The onUpload() method will be called when the image is uploaded.
// This method must return a promise.
// The method will pass a hash with the following keys: image_data and original_filename
// Example:
// {
//   image_data: "SOME_LONG_TEXT",
//   original_filename: "sauron",
// }

class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.state = {
      dataUri: null,
      name: null,
      type: null,
    };
  }

  onChangeInput(e) {
    const self = this;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(upload) {
      const data = upload.target.result;
      const image = data.split(',')[1];
      self.setState({
        dataUri: image,
      });

      self.props.onUpload({
        image_data: self.state.dataUri,
        original_filename: self.state.name,
      }).then(
        function(response) {
          self.resetState();
          e.target.value = null;
        }
      );
    };

    this.setState({
      name: file.name,
      type: file.type,
    });
    reader.readAsDataURL(file);
  }

  onSubmitForm(e) {
    e.preventDefault();
  }

  resetState() {
    this.setState({
      dataUri: null,
      name: null,
      type: null,
    });
  }

  render() {
    return (
      <form encType="multipart/form-data" onSubmit={this.onSubmitForm}>
        <input onChange={this.onChangeInput} type="file" />
      </form>
    );
  }
};

ImageForm.propTypes = propTypes;

module.exports = ImageForm;
