const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./components/App');

const element = $('.react-app__activity').get(0);
ReactDOM.render(
  <App
    activityId={parseInt(element.dataset.id)}
    categories={JSON.parse(element.dataset.categories)}
    currencies={JSON.parse(element.dataset.currencies)}
  />,
  element
);
