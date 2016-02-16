import alt from '../alt';

import simpleStore from '../../../../stores/shared/SimpleStore';

import operationalTimeActions from '../actions/OperationalTimeActions';

export default simpleStore.init(
  alt, operationalTimeActions, 'operational_times', 'OperationalTimeStore'
);
