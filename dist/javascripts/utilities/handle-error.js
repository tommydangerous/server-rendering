'use strict';

module.exports = function (xhr) {
  var error = xhr.responseJSON.error_message;
  if (/Validation failed: /.exec(error)) {
    error = error.replace('Validation failed: ', '');
    error = error.split(',');
    error = error[0].trim();
  }
  return error;
};