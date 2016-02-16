'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/App');

ReactDOM.render(React.createElement(App, null), $('.react-app__cart').get(0));