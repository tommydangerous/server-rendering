'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var AgentClientApp = require('./components/AgentClientApp');

ReactDOM.render(React.createElement(AgentClientApp, null), $('.react-app__agent-client').get(0));