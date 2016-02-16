'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var activityPickupActions = require('../actions/ActivityPickupActions');

module.exports = simpleStore.init(alt, activityPickupActions, 'activity_pickups', 'ActivityPickupStore');