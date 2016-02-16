const connectToStores = require('alt/utils/connectToStores');

const activityActions = require('../../shared/actions/ActivityActions');
const activityStore = require('../../shared/stores/ActivityStore');

const SimpleFormWithStore = require('../../../../components/shared/SimpleFormWithStore');

class ActivityForm extends SimpleFormWithStore('activity', activityActions, activityStore) {};

module.exports = connectToStores(ActivityForm);
module.exports.ActivityForm = ActivityForm;
