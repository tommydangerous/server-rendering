'use strict';

var getAccessToken = function getAccessToken() {
  return BootstrapData.get('api').access_token;
};

var getApiKey = function getApiKey() {
  return BootstrapData.get('api').api_key;
};

var getHeaders = function getHeaders() {
  return {
    'X-Travel-API-Key': getApiKey(),
    'X-Travel-OAuth-Token': getAccessToken()
  };
};

var ajax = function ajax(method, options) {
  var url = '/api/v1/' + options.resource + '?key=' + getApiKey();
  var urlParameters = [];
  if (options.format) {
    urlParameters.push('_format=' + options.format);
  }
  if (options.meta && Object.keys(options.meta).length) {
    Object.keys(options.meta).forEach(function (metaKey) {
      urlParameters.push('_' + metaKey + '=' + options.meta[metaKey]);
    });
  }
  url = [url, urlParameters.join('&')].join('&');
  $.ajax({
    contentType: 'application/json',
    data: options.data,
    method: method,
    url: url
  }).done(function (response) {
    if (options.done) {
      options.done(response);
    }
  }).fail(function (xhr) {
    if (options.fail) {
      options.fail(xhr);
    }
  }).always(function () {
    if (options.always) {
      options.always();
    }
  });
};

var Resource = {
  create: function create(options) {
    options.data = JSON.stringify(options.payload);
    ajax('POST', options);
  },

  delete: function _delete(options) {
    options.resource = [options.resource, options.id].join('/');
    ajax('DELETE', options);
  },

  index: function index(options) {
    options.data = options.query;
    ajax('GET', options);
  },

  show: function show(options) {
    options.resource = [options.resource, options.id].join('/');
    ajax('GET', options);
  },

  update: function update(options) {
    options.data = JSON.stringify(options.payload);
    options.resource = [options.resource, options.id].join('/');
    ajax('PUT', options);
  }
};

module.exports = Resource;