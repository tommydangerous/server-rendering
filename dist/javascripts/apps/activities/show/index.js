'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var ActivityBookIt = require('./components/ActivityBookIt');
var ActivitySimilar = require('./components/ActivitySimilar');
var GoogleMapComponent = require('../../../components/shared/GoogleMapComponent');

$('.react-component-activity-book-it').each(function () {
  ReactDOM.render(React.createElement(ActivityBookIt, {
    activityId: this.dataset.activityId,
    maxDate: this.dataset.maxDate,
    minDate: this.dataset.minDate
  }), this);
});

$('.react-component-activity-similar').each(function () {
  ReactDOM.render(React.createElement(ActivitySimilar, {
    activityId: this.dataset.activityId,
    url: this.dataset.url
  }), this);
});

$('.react-component-google-map').each(function () {
  ReactDOM.render(React.createElement(GoogleMapComponent, {
    latitude: this.dataset.latitude,
    longitude: this.dataset.longitude
  }), this);
});