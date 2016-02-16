const React = require('react');
const ReactDOM = require('react-dom');

const AgentClientApp = require('./components/AgentClientApp');

ReactDOM.render(<AgentClientApp />, $('.react-app__agent-client').get(0));
