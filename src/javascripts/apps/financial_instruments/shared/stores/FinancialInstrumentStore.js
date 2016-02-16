const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const financialInstrumentActions = require('../actions/FinancialInstrumentActions');

module.exports = simpleStore.init(
  alt, financialInstrumentActions, 'financial_instruments', 'FinancialInstrumentStore'
);
