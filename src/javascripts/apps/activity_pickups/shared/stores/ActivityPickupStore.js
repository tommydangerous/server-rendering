const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const activityPickupActions = require('../actions/ActivityPickupActions');

module.exports = simpleStore.init(
  alt, activityPickupActions, 'activity_pickups', 'ActivityPickupStore'
);
