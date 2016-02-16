const ADD_EDIT_PHOTOS = 'Add/Edit Photos';
const AVAILABILITY = 'Availability';
const BASIC_INFO = 'Basic Info';
const BLACKOUT_DATES = 'Blackout Dates';
const HOURS_OF_OPERATION = 'Hours of Operation';
const LOCATION = 'Location';
const MANAGE_PACKAGES = 'Manage Packages';
const PICKUP_LOCATIONS = 'Pickup/Dropoff Locations';

const sections = [
  {
    name: 'Activity Information',
    tabs: [
      {
        name: BASIC_INFO,
        required: true,
      },
      {
        name: LOCATION,
        required: true,
      },
      {
        name: AVAILABILITY,
        required: true,
      },
    ],
  },
  {
    name: 'Packages',
    tabs: [
      {
        name: MANAGE_PACKAGES,
        required: true,
      },
    ],
  },
  {
    name: 'Photos',
    tabs: [
      {
        name: ADD_EDIT_PHOTOS,
        required: true,
      },
    ],
  },
  {
    name: 'Optional',
    tabs: [
      {
        name: PICKUP_LOCATIONS,
        required: false,
      },
      {
        name: BLACKOUT_DATES,
        required: false,
      },
      {
        name: HOURS_OF_OPERATION,
        required: false,
      },
    ],
  },
];

module.exports = {
  ADD_EDIT_PHOTOS,
  AVAILABILITY,
  BASIC_INFO,
  BLACKOUT_DATES,
  HOURS_OF_OPERATION,
  LOCATION,
  MANAGE_PACKAGES,
  PICKUP_LOCATIONS,
  sections: sections,
  tabs: [].concat.apply([], sections.map(function(section) {
    return section.tabs;
  })),
};
