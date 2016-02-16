'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImageActions = require('../../../images/shared/actions/ImageActions');

var _ImageActions2 = _interopRequireDefault(_ImageActions);

var _AppWithFlashMessage2 = require('../../../../components/shared/AppWithFlashMessage');

var _AppWithFlashMessage3 = _interopRequireDefault(_AppWithFlashMessage2);

var _ImageForm = require('../../../images/shared/components/ImageForm');

var _ImageForm2 = _interopRequireDefault(_ImageForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Libs


// Stores


// Components


var propTypes = {
  userId: _react.PropTypes.number.isRequired
};

var App = function (_AppWithFlashMessage) {
  _inherits(App, _AppWithFlashMessage);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.onUpload = _this.onUpload.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'onUpload',
    value: function onUpload(payload) {
      var _this2 = this;

      return _ImageActions2.default.create({
        format: 'for_owner',
        payload: Object.assign(payload, {
          attachable_id: this.props.userId,
          attachable_type: 'User'
        })
      }).then(function (respone) {
        console.log(respone);
        _this2.showFlashMessage({
          message: 'Profile image updated.',
          status: 'success'
        });
      }, function (xhr) {
        _this2.showFlashMessage({
          message: xhr.responseJSON.error_message,
          status: 'error'
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderFlashMessage(),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          _react2.default.createElement(
            'div',
            { className: 'panel' },
            _react2.default.createElement(
              'div',
              { className: 'panel-header' },
              "Edit profile image"
            ),
            _react2.default.createElement(
              'div',
              { className: 'panel-body' },
              _react2.default.createElement(_ImageForm2.default, { onUpload: this.onUpload })
            )
          )
        )
      );
    }
  }]);

  return App;
}(_AppWithFlashMessage3.default);

App.propTypes = propTypes;

module.exports = App;