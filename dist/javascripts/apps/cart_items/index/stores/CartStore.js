'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var cartActions = require('../actions/CartActions');

module.exports = simpleStore.init(alt, cartActions, 'cart_items', 'CartStore');