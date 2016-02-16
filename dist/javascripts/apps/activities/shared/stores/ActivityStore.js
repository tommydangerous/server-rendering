'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var activityActions = require('../actions/ActivityActions');

module.exports = simpleStore.init(alt, activityActions, 'activities', 'ActivityStore');