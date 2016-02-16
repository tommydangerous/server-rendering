const React = require('react');
const ReactDOM = require('react-dom');

const DatepickerInput = require('../../../components/shared/DatepickerInput');

const datepicker = $('.react-component-filter-datepicker');
ReactDOM.render(
  <DatepickerInput
    date={datepicker.data('date')}
    name={datepicker.data('name')}
    placeholder={datepicker.data('placeholder')}
  />,
  datepicker.get(0)
);
