'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var financialInstrumentActions = require('../actions/FinancialInstrumentActions');

module.exports = simpleStore.init(alt, financialInstrumentActions, 'financial_instruments', 'FinancialInstrumentStore');