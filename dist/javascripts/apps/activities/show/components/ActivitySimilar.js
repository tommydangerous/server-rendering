'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var ActivitySimilarElement = require('./ActivitySimilarElement');

var ActivitySimilar = React.createClass({
  displayName: 'ActivitySimilar',

  componentDidMount: function componentDidMount() {
    var _this = this;
    $.ajax({
      dataType: 'json',
      method: 'get',
      url: _this.props.url,
      success: function success(response) {
        _this.setState({
          activities: response
        });
      }
    });
  },

  getDefaultProps: function getDefaultProps() {
    return {
      activityId: '',
      url: ''
    };
  },

  getInitialState: function getInitialState() {
    return {
      activities: []
    };
  },

  render: function render() {
    var activities = this.state.activities;
    var elements = [];

    for (var key in activities) {
      var activity = activities[key];

      if (elements.length < 3 && this.props.activityId != activity.id) {
        elements.unshift(React.createElement(ActivitySimilarElement, { key: key, activity: activity }));
      }
    }

    return React.createElement(
      'div',
      { className: 'row' },
      elements
    );
  }
});

module.exports = ActivitySimilar;