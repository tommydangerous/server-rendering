const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const activityActions = require('../actions/ActivityActions');

module.exports = simpleStore.init(alt, activityActions, 'activities', 'ActivityStore');
