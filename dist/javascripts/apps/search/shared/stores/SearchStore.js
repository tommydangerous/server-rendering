'use strict';

var alt = require('../alt');

var SearchActions = require('../actions/SearchActions');

function SearchStore() {
  this.latitude = getParameterByName('latitude');
  this.location = getParameterByName('location');
  this.longitude = getParameterByName('longitude');
  this.submitted = false;

  this.bindListeners({
    setAttributes: SearchActions.updateAttributes
  });
};

SearchStore.prototype.setAttributes = function (hash) {
  if (hash.latitude) {
    this.latitude = hash.latitude;
  }
  if (hash.longitude) {
    this.longitude = hash.longitude;
  }
  if (hash.submitted) {
    this.submitted = hash.submitted;
  }
};

SearchStore.displayName = 'SearchStore';
module.exports = alt.createStore(SearchStore);