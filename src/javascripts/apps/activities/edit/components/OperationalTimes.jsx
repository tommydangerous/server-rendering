// Libs
import className from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import React, { PropTypes } from 'react';

// Stores
import operationalTimeStore from '../../../operational_times/shared/stores/OperationalTimeStore';

// Components
import OperationalTimeForm from
  '../../../operational_times/shared/components/OperationalTimeForm';
import OperationalTimeTable from
  '../../../operational_times/shared/components/OperationalTimeTable';

const propTypes = {
  activity: PropTypes.object.isRequired,
  showFlashMessage: PropTypes.func.isRequired,
};

class OperationalTimes extends React.Component {
  static getPropsFromStores() {
    return operationalTimeStore.getState();
  }

  static getStores() {
    return [operationalTimeStore];
  }

  render() {
    return (
      <div>
        <div className="space-4">
          <OperationalTimeTable
            activity={this.props.activity}
            showFlashMessage={this.props.showFlashMessage}
          />
        </div>

        <div className={className({ hide: this.props.operational_times.length > 0 })}>
          <OperationalTimeForm
            activity={this.props.activity}
            showFlashMessage={this.props.showFlashMessage}
          />
        </div>
      </div>
    );
  }
};

OperationalTimes.propTypes = propTypes;

export default connectToStores(OperationalTimes);
export { OperationalTimes };
