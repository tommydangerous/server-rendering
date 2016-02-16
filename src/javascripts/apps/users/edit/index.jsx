// Libs
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './components/App';

const element = $('.react-app__users').get(0);
ReactDOM.render(
  <App
    userId={parseInt(element.dataset.id)}
  />,
  element
);
