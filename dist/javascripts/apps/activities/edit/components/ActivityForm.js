'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');

var activityActions = require('../../shared/actions/ActivityActions');
var activityStore = require('../../shared/stores/ActivityStore');

var SimpleFormWithStore = require('../../../../components/shared/SimpleFormWithStore');

var ActivityForm = function (_SimpleFormWithStore) {
  _inherits(ActivityForm, _SimpleFormWithStore);

  function ActivityForm() {
    _classCallCheck(this, ActivityForm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityForm).apply(this, arguments));
  }

  return ActivityForm;
}(SimpleFormWithStore('activity', activityActions, activityStore));

;

module.exports = connectToStores(ActivityForm);
module.exports.ActivityForm = ActivityForm;