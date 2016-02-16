'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var activityBlackoutDateActions = require('../actions/ActivityBlackoutDateActions');

module.exports = simpleStore.init(alt, activityBlackoutDateActions, 'activity_blackout_dates', 'ActivityBlackoutDateStore');