'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var LocationSearch = React.createClass({
  displayName: 'LocationSearch',
  getDefaultProps: function getDefaultProps() {
    return {
      inputId: "homeSearchBar"
    };
  },
  getInitialState: function getInitialState() {
    return {
      latitude: 0,
      longitude: 0,
      submitted: false
    };
  },
  componentDidMount: function componentDidMount() {
    initializeAutocomplete(document.getElementById(this.props.inputId), this.autocompleteCallback);
  },
  autocompleteCallback: function autocompleteCallback(hashFromGoogle) {
    this.setState(hashFromGoogle);
    if (this.state.submitted) {
      this.onSubmitSearch();
    }
  },
  onSubmitSearch: function onSubmitSearch(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.submitted) {
      this.refs.searchForm.submit();
    } else {
      this.setState({ submitted: true });
    }
  },
  render: function render() {
    return React.createElement(
      'form',
      {
        action: "/search",
        method: "GET",
        onSubmit: this.onSubmitSearch,
        ref: 'searchForm'
      },
      React.createElement(
        'div',
        { className: 'searchbar__input' },
        React.createElement(
          'label',
          { className: 'searchbar__input__label' },
          React.createElement('input', {
            className: 'input-large searchbar__location',
            autoComplete: 'off',
            id: this.props.inputId,
            name: 'location',
            placeholder: 'Where do you want to explore?'
          }),
          React.createElement('input', {
            name: 'latitude',
            readOnly: true,
            type: 'hidden',
            value: this.state.latitude
          }),
          React.createElement('input', {
            name: 'longitude',
            readOnly: true,
            type: 'hidden',
            value: this.state.longitude
          })
        )
      ),
      React.createElement(
        'button',
        {
          className: 'btn btn-large btn-primary searchbar__button',
          name: 'button',
          type: 'submit'
        },
        "Search"
      )
    );
  }
});

module.exports = LocationSearch;