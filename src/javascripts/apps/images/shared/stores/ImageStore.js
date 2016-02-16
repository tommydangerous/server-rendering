const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const imageActions = require('../actions/ImageActions');

module.exports = simpleStore.init(alt, imageActions, 'images', 'ImageStore');
