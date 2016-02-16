'use strict';

var _singularize = require('../../utilities/singularize');

var _singularize2 = _interopRequireDefault(_singularize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  init: function init(alt, actions, resource, displayName) {
    var singular = (0, _singularize2.default)(resource);

    function SimpleStore() {
      Object.defineProperty(this, singular, {
        value: {},
        enumerable: true,
        configurable: true,
        writable: true
      });

      Object.defineProperty(this, singular + '_attributes_changed', {
        value: {},
        enumerable: true,
        configurable: true,
        writable: true
      });

      Object.defineProperty(this, resource, {
        value: [],
        configurable: true,
        enumerable: true,
        writable: true
      });

      Object.defineProperty(this, resource + '_request_loading', {
        value: false,
        configurable: true,
        enumerable: true,
        writable: true
      });

      this.requestLoading = false;

      this.bindListeners({
        addObject: actions.create,
        removeObject: actions.delete,
        resetAttributesChanged: [actions.create, actions.update],
        setAttributes: [actions.update, actions.updateAttributes],
        setAttributesChanged: actions.updateAttributes,
        setObject: actions.show,
        setObjects: actions.index,
        setRequestLoading: [actions.endRequestLoading, actions.startRequestLoading]
      });
    };

    SimpleStore.prototype.addObject = function (object) {
      this[resource].push(object);
    };

    SimpleStore.prototype.removeObject = function (object) {
      this.setObjects(this[resource].filter(function (object2) {
        return object.id != object2.id;
      }));
    };

    SimpleStore.prototype.resetAttributesChanged = function () {
      this[singular + '_attributes_changed'] = {};
    };

    SimpleStore.prototype.setAttributes = function (hash) {
      this[singular] = Object.assign(this[singular], hash);
    };

    SimpleStore.prototype.setAttributesChanged = function (hash) {
      this[singular + '_attributes_changed'] = Object.assign(this[singular + '_attributes_changed'], hash);
    };

    SimpleStore.prototype.setObject = function (object) {
      this[singular] = object;
    };

    SimpleStore.prototype.setObjects = function (objects) {
      this[resource] = objects;
    };

    SimpleStore.prototype.setRequestLoading = function (value) {
      this.requestLoading = value;
      this[resource + '_request_loading'] = value;
    };

    SimpleStore.displayName = displayName;

    return alt.createStore(SimpleStore);
  }
};