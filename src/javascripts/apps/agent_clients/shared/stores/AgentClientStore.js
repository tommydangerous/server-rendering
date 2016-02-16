const alt = require('../alt');

const simpleStore = require('../../../../stores/shared/SimpleStore');

const agentClientActions = require('../actions/AgentClientActions');

module.exports = simpleStore.init(alt, agentClientActions, 'agent_clients', 'AgentClientStore');
