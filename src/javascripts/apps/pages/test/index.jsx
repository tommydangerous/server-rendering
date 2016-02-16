const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');

// const FileForm = React.createClass({
//   getInitialState: function() {
//     return {
//       data_uri: null,
//     };
//   },

//   handleSubmit: function(e) {
//     e.preventDefault();
//   },

//   handleFile: function(e) {
//     let self = this;
//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onload = function(upload) {
//       const data = upload.target.result;
//       const image = data.split(',')[1];
//       self.setState({
//         data_uri: image,
//       });

//       $.ajax({
//         data: {
//           image: {
//             content_type: self.state.type,
//             image_data: self.state.data_uri,
//             original_filename: self.state.name,
//           },
//         },
//         method: 'POST',
//         url: '/activities/51/images',
//         success: function(response) {
//           console.log(response);
//         },
//         error: function(xhr) {
//           console.log(xhr);
//         }
//       });
//     };

//     this.setState({
//       name: file.name,
//       type: file.type,
//     });

//     reader.readAsDataURL(file);
//   },

//   render: function() {
//     return (
//       <form onSubmit={this.handleSubmit} encType="multipart/form-data">
//         <input type="file" onChange={this.handleFile} />
//       </form>
//     );
//   }
// })

// ReactDOM.render(
//   <FileForm />,
//   $('.react-app').get(0)
// );

// console.log('test')

window.Test = class Test extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
