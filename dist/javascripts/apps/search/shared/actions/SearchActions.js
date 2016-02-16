'use strict';

var alt = require('../alt');

var SearchActions = alt.createActions(function () {
  this.updateAttributes = function (hash) {
    this.dispatch(hash);
  };
});

module.exports = SearchActions;