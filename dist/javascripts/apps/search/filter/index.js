'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var DatepickerInput = require('../../../components/shared/DatepickerInput');

var datepicker = $('.react-component-filter-datepicker');
ReactDOM.render(React.createElement(DatepickerInput, {
  date: datepicker.data('date'),
  name: datepicker.data('name'),
  placeholder: datepicker.data('placeholder')
}), datepicker.get(0));