const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const packageActions = require('../actions/PackageActions');

module.exports = simpleStore.init(alt, packageActions, 'packages', 'PackageStore');
