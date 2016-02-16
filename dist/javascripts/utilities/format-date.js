'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Date needs to be in the form of: dd-mm-yyyy e.g. 28-11-2015
// This function will return mm-dd-yyyy, e.g. 11-28-2015

exports.default = function (date) {
  var values = date.split('-');
  if (values.length == 3) {
    return [values[1], values[0], values[2]].join('-');
  } else {
    return '';
  }
};