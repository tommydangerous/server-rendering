'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var LocationSearch = require('./components/LocationSearch');

ReactDOM.render(React.createElement(LocationSearch, null), $('.react-app-home-index').get(0));