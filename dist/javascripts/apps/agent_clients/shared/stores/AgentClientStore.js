'use strict';

var alt = require('../alt');

var simpleStore = require('../../../../stores/shared/SimpleStore');

var agentClientActions = require('../actions/AgentClientActions');

module.exports = simpleStore.init(alt, agentClientActions, 'agent_clients', 'AgentClientStore');