'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var packageActions = require('../actions/PackageActions');

module.exports = simpleStore.init(alt, packageActions, 'packages', 'PackageStore');