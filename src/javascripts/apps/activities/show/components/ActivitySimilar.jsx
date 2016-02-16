const React = require('react');
const ReactDOM = require('react-dom');

const ActivitySimilarElement = require('./ActivitySimilarElement');

const ActivitySimilar = React.createClass({
  componentDidMount: function() {
    var _this = this;
    $.ajax({
      dataType: 'json',
      method: 'get',
      url: _this.props.url,
      success: function(response) {
        _this.setState({
          activities: response
        });
      }
    });
  },

  getDefaultProps: function() {
    return {
      activityId: '',
      url: ''
    };
  },

  getInitialState: function() {
    return {
      activities: []
    };
  },

  render: function() {
    var activities = this.state.activities;
    var elements = [];

    for (var key in activities) {
      var activity = activities[key];

      if (elements.length < 3 && this.props.activityId != activity.id) {
        elements.unshift(
          <ActivitySimilarElement key={key} activity={activity} />
        );
      }
    }

    return (
      <div className="row">
        {elements}
      </div>
    );
  }
});

module.exports = ActivitySimilar;
