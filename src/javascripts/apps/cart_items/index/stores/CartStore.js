const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const cartActions = require('../actions/CartActions');

module.exports = simpleStore.init(alt, cartActions, 'cart_items', 'CartStore');
