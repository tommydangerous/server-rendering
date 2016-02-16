const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const checkoutActions = require('../actions/CheckoutActions');

module.exports = simpleStore.init(alt, checkoutActions, 'checkouts', 'CheckoutStore');
