'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/App');

var element = $('.react-app__activity').get(0);
ReactDOM.render(React.createElement(App, {
  activityId: parseInt(element.dataset.id),
  categories: JSON.parse(element.dataset.categories),
  currencies: JSON.parse(element.dataset.currencies)
}), element);