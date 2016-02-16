'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var React = require('react');
var ReactDOM = require('react-dom');

var SearchActions = require('../../shared/actions/SearchActions');
var SearchStore = require('../../shared/stores/SearchStore');

var inputId = 'headerSearchBar';

var HeaderLocationSearch = function (_React$Component) {
  _inherits(HeaderLocationSearch, _React$Component);

  function HeaderLocationSearch() {
    _classCallCheck(this, HeaderLocationSearch);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HeaderLocationSearch).apply(this, arguments));
  }

  _createClass(HeaderLocationSearch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      initializeAutocomplete(document.getElementById(inputId), this.autocompleteCallback.bind(this));
    }
  }, {
    key: 'autocompleteCallback',
    value: function autocompleteCallback(hashFromGoogle) {
      SearchActions.updateAttributes(hashFromGoogle);
      if (SearchStore.getState().submitted) {
        this.onSubmitSearch();
      }
    }
  }, {
    key: 'onSubmitSearch',
    value: function onSubmitSearch(e) {
      if (e) {
        e.preventDefault();
      }
      if (SearchStore.getState().submitted) {
        this.refs.searchForm.submit();
      } else {
        SearchActions.updateAttributes({ submitted: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        {
          action: "/search",
          method: "GET",
          onSubmit: this.onSubmitSearch.bind(this),
          ref: 'searchForm'
        },
        React.createElement(
          'div',
          { className: 'search-form__container' },
          React.createElement('i', { className: 'fa fa-search' }),
          React.createElement('input', {
            autoComplete: 'off',
            defaultValue: this.props.location,
            id: inputId,
            name: 'location',
            placeholder: 'Where do you want to explore?'
          }),
          React.createElement('input', {
            name: 'latitude',
            readOnly: true,
            type: 'hidden',
            value: this.props.latitude
          }),
          React.createElement('input', {
            name: 'longitude',
            readOnly: true,
            type: 'hidden',
            value: this.props.longitude
          })
        )
      );
    }
  }], [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return SearchStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [SearchStore];
    }
  }]);

  return HeaderLocationSearch;
}(React.Component);

;

module.exports = connectToStores(HeaderLocationSearch);
module.exports.HeaderLocationSearch = HeaderLocationSearch;