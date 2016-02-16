const React = require('react');
const ReactDOM = require('react-dom');

const ActivityBookIt = require('./components/ActivityBookIt');
const ActivitySimilar = require('./components/ActivitySimilar');
const GoogleMapComponent = require('../../../components/shared/GoogleMapComponent');

$('.react-component-activity-book-it').each(function() {
  ReactDOM.render(
    <ActivityBookIt
      activityId={this.dataset.activityId}
      maxDate={this.dataset.maxDate}
      minDate={this.dataset.minDate}
    />,
    this
  );
});

$('.react-component-activity-similar').each(function() {
  ReactDOM.render(
    <ActivitySimilar
      activityId={this.dataset.activityId}
      url={this.dataset.url}
    />,
    this
  );
});

$('.react-component-google-map').each(function() {
  ReactDOM.render(
    <GoogleMapComponent
      latitude={this.dataset.latitude}
      longitude={this.dataset.longitude}
    />,
    this
  );
});
