const Api = require('../../api/Api');

import singularize from '../../utilities/singularize';

module.exports = {
  init: function(alt, resource) {
    return alt.createActions(function() {
      const singular = singularize(resource);

      // API methods

      this.create = function(options) {
        const self = this;
        return new Promise(function(fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.create({
            format: options.format,
            payload: options.payload,
            resource: resource,
            done: function(response) {
              self.dispatch(response[singular]);
              fulfill(response);
            },
            fail: function(xhr) {
              reject(xhr);
            },
            always: function() {
              self.actions.endRequestLoading();
            },
          });
        });
      };

      this.delete = function(options) {
        const self = this;
        return new Promise(function(fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.delete({
            format: options.format,
            id: options.object.id,
            resource: resource,
            done: function(response) {
              self.dispatch(options.object);
              fulfill(response);
            },
            fail: function(xhr) {
              reject(xhr);
            },
            always: function() {
              self.actions.endRequestLoading();
            },
          });
        });
      };

      this.index = function(options) {
        if (!options) {
          options = {};
        }
        const self = this;
        return new Promise(function(fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.index({
            format: options.format,
            meta: options.meta,
            query: options.query,
            resource: resource,
            done: function(response) {
              self.dispatch(response[resource]);
              fulfill(response);
            },
            fail: function(xhr) {
              reject(xhr);
            },
            always: function() {
              self.actions.endRequestLoading();
            },
          });
        });
      };

      this.show = function(options) {
        const self = this;
        return new Promise(function(fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.show({
            format: options.format,
            id: options.object.id,
            resource: resource,
            done: function(response) {
              self.dispatch(response[singular]);
              fulfill(reject);
            },
            fail: function(xhr) {
              reject(xhr);
            },
            always: function() {
              self.actions.endRequestLoading();
            },
          });
        });
      };

      this.update = function(options) {
        const self = this;
        return new Promise(function(fulfill, reject) {
          self.actions.startRequestLoading();
          Api.resource.update({
            format: options.format,
            id: options.object.id,
            payload: options.payload,
            resource: resource,
            done: function(response) {
              self.dispatch(options.payload);
              fulfill(response);
            },
            fail: function(xhr) {
              reject(xhr);
            },
            always: function() {
              self.actions.endRequestLoading();
            },
          });
        })
      };

      // Non-API methods

      this.endRequestLoading = function() {
        this.dispatch(false);
      };

      this.startRequestLoading = function() {
        this.dispatch(true);
      };

      this.updateAttributes = function(hash) {
        this.dispatch(hash);
      };
    });
  },
};
