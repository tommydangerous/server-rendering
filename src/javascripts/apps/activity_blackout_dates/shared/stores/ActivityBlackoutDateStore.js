const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const activityBlackoutDateActions = require('../actions/ActivityBlackoutDateActions');

module.exports = simpleStore.init(
  alt, activityBlackoutDateActions, 'activity_blackout_dates', 'ActivityBlackoutDateStore'
);
