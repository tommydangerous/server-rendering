'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var checkoutActions = require('../actions/CheckoutActions');

module.exports = simpleStore.init(alt, checkoutActions, 'checkouts', 'CheckoutStore');