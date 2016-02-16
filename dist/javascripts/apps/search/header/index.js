'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var HeaderLocationSearch = require('./components/HeaderLocationSearch');

ReactDOM.render(React.createElement(HeaderLocationSearch, null), $('.react-app-header-search').get(0));