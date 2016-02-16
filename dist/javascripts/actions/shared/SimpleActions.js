'use strict';

var _singularize = require('../../utilities/singularize');

var _singularize2 = _interopRequireDefault(_singularize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Api = require('../../api/Api');

module.exports = {
  init: function init(alt, resource) {
    return alt.createActions(function () {
      var singular = (0, _singularize2.default)(resource);

      // API methods

      this.create = function (options) {
        var self = this;
        return new Promise(function (fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.create({
            format: options.format,
            payload: options.payload,
            resource: resource,
            done: function done(response) {
              self.dispatch(response[singular]);
              fulfill(response);
            },
            fail: function fail(xhr) {
              reject(xhr);
            },
            always: function always() {
              self.actions.endRequestLoading();
            }
          });
        });
      };

      this.delete = function (options) {
        var self = this;
        return new Promise(function (fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.delete({
            format: options.format,
            id: options.object.id,
            resource: resource,
            done: function done(response) {
              self.dispatch(options.object);
              fulfill(response);
            },
            fail: function fail(xhr) {
              reject(xhr);
            },
            always: function always() {
              self.actions.endRequestLoading();
            }
          });
        });
      };

      this.index = function (options) {
        if (!options) {
          options = {};
        }
        var self = this;
        return new Promise(function (fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.index({
            format: options.format,
            meta: options.meta,
            query: options.query,
            resource: resource,
            done: function done(response) {
              self.dispatch(response[resource]);
              fulfill(response);
            },
            fail: function fail(xhr) {
              reject(xhr);
            },
            always: function always() {
              self.actions.endRequestLoading();
            }
          });
        });
      };

      this.show = function (options) {
        var self = this;
        return new Promise(function (fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.show({
            format: options.format,
            id: options.object.id,
            resource: resource,
            done: function done(response) {
              self.dispatch(response[singular]);
              fulfill(reject);
            },
            fail: function fail(xhr) {
              reject(xhr);
            },
            always: function always() {
              self.actions.endRequestLoading();
            }
          });
        });
      };

      this.update = function (options) {
        var self = this;
        return new Promise(function (fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.update({
            format: options.format,
            id: options.object.id,
            payload: options.payload,
            resource: resource,
            done: function done(response) {
              self.dispatch(options.payload);
              fulfill(response);
            },
            fail: function fail(xhr) {
              reject(xhr);
            },
            always: function always() {
              self.actions.endRequestLoading();
            }
          });
        });
      };

      // Non-API methods

      this.endRequestLoading = function () {
        this.dispatch(false);
      };

      this.startRequestLoading = function () {
        this.dispatch(true);
      };

      this.updateAttributes = function (hash) {
        this.dispatch(hash);
      };
    });
  }
};