'use strict';

var ADD_EDIT_PHOTOS = 'Add/Edit Photos';
var AVAILABILITY = 'Availability';
var BASIC_INFO = 'Basic Info';
var BLACKOUT_DATES = 'Blackout Dates';
var HOURS_OF_OPERATION = 'Hours of Operation';
var LOCATION = 'Location';
var MANAGE_PACKAGES = 'Manage Packages';
var PICKUP_LOCATIONS = 'Pickup/Dropoff Locations';

var sections = [{
  name: 'Activity Information',
  tabs: [{
    name: BASIC_INFO,
    required: true
  }, {
    name: LOCATION,
    required: true
  }, {
    name: AVAILABILITY,
    required: true
  }]
}, {
  name: 'Packages',
  tabs: [{
    name: MANAGE_PACKAGES,
    required: true
  }]
}, {
  name: 'Photos',
  tabs: [{
    name: ADD_EDIT_PHOTOS,
    required: true
  }]
}, {
  name: 'Optional',
  tabs: [{
    name: PICKUP_LOCATIONS,
    required: false
  }, {
    name: BLACKOUT_DATES,
    required: false
  }, {
    name: HOURS_OF_OPERATION,
    required: false
  }]
}];

module.exports = {
  ADD_EDIT_PHOTOS: ADD_EDIT_PHOTOS,
  AVAILABILITY: AVAILABILITY,
  BASIC_INFO: BASIC_INFO,
  BLACKOUT_DATES: BLACKOUT_DATES,
  HOURS_OF_OPERATION: HOURS_OF_OPERATION,
  LOCATION: LOCATION,
  MANAGE_PACKAGES: MANAGE_PACKAGES,
  PICKUP_LOCATIONS: PICKUP_LOCATIONS,
  sections: sections,
  tabs: [].concat.apply([], sections.map(function (section) {
    return section.tabs;
  }))
};