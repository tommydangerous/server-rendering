'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

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

window.Test = function (_React$Component) {
  _inherits(Test, _React$Component);

  function Test() {
    _classCallCheck(this, Test);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));
  }

  _createClass(Test, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'h1',
        null,
        'Hello'
      );
    }
  }]);

  return Test;
}(React.Component);