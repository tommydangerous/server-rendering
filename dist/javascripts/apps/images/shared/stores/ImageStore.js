'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var imageActions = require('../actions/ImageActions');

module.exports = simpleStore.init(alt, imageActions, 'images', 'ImageStore');