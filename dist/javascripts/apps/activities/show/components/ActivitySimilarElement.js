'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var ActivitySimilarElement = React.createClass({
  displayName: 'ActivitySimilarElement',

  getDefaultProps: function getDefaultProps() {
    return {
      activity: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      city: this.props.activity.city,
      country: this.props.activity.country,
      cover_image_url: this.props.activity.cover_image_url,
      id: this.props.activity.id,
      latitude: this.props.activity.latitude,
      longitude: this.props.activity.longitude,
      min_price: this.props.activity.min_price,
      name: this.props.activity.name,
      state: this.props.activity.state
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'col-md-4' },
      React.createElement(
        'a',
        { className: 'link-block', href: this._showUrl() },
        React.createElement(
          'div',
          { className: 'img-height-4' },
          React.createElement(
            'div',
            { className: 'img-cover', style: this._styles() },
            React.createElement(
              'div',
              { className: 'img-price__container' },
              React.createElement(
                'div',
                { className: 'img-price__value' },
                React.createElement(
                  'h3',
                  { className: 'text-normal-font-weight' },
                  '$' + Math.floor(this.state.min_price)
                )
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'panel-body-small' },
        React.createElement(
          'h5',
          { className: 'text-normal-font-weight' },
          React.createElement(
            'a',
            { className: 'link-reset', href: this._showUrl() },
            this.state.name
          )
        ),
        React.createElement(
          'div',
          { className: 'text-muted' },
          React.createElement(
            'a',
            { className: 'link-reset', href: this._searchUrl() },
            this._location()
          )
        )
      )
    );
  },

  _location: function _location() {
    return [this.state.city, this.state.state, this.state.country].join(', ');
  },

  _searchUrl: function _searchUrl() {
    return '/search?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude;
  },

  _showUrl: function _showUrl() {
    return '/activities/' + this.state.id;
  },

  _styles: function _styles() {
    return {
      backgroundImage: 'url(' + this.state.cover_image_url + ')'
    };
  }
});

module.exports = ActivitySimilarElement;