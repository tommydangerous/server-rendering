const getAccessToken = function() {
  return BootstrapData.get('api').access_token;
};

const getApiKey = function() {
  return BootstrapData.get('api').api_key;
};

const getHeaders = function() {
  return {
    'X-Travel-API-Key': getApiKey(),
    'X-Travel-OAuth-Token': getAccessToken(),
  };
};

const ajax = function(method, options) {
  let url = `/api/v1/${options.resource}?key=${getApiKey()}`;
  const urlParameters = [];
  if (options.format) {
    urlParameters.push(`_format=${options.format}`);
  }
  if (options.meta && Object.keys(options.meta).length) {
    Object.keys(options.meta).forEach((metaKey) => {
      urlParameters.push(`_${metaKey}=${options.meta[metaKey]}`);
    });
  }
  url = [url, urlParameters.join('&')].join('&')
  $.ajax({
    contentType: 'application/json',
    data: options.data,
    method: method,
    url: url,
  }).done(function(response) {
    if (options.done) {
      options.done(response);
    }
  }).fail(function(xhr) {
    if (options.fail) {
      options.fail(xhr);
    }
  }).always(function() {
    if (options.always) {
      options.always();
    }
  });
};

const Resource = {
  create: function(options) {
    options.data = JSON.stringify(options.payload);
    ajax('POST', options);
  },

  delete: function(options) {
    options.resource = [options.resource, options.id].join('/');
    ajax('DELETE', options);
  },

  index: function(options) {
    options.data = options.query;
    ajax('GET', options);
  },

  show: function(options) {
    options.resource = [options.resource, options.id].join('/');
    ajax('GET', options);
  },

  update: function(options) {
    options.data = JSON.stringify(options.payload);
    options.resource = [options.resource, options.id].join('/');
    ajax('PUT', options);
  }
};

module.exports = Resource;
