// Libs
import connectToStores from 'alt/utils/connectToStores';
import className from 'classnames';
import React, { PropTypes } from 'react';

// Actions
import operationalTimeActions from '../actions/OperationalTimeActions';

// Stores
import operationalTimeStore from '../stores/OperationalTimeStore';

// Components
import SimpleTable from '../../../../components/shared/SimpleTable';

// Utils
import handleError from '../../../../utilities/handle-error';

const propTypes = {
  activity: PropTypes.object.isRequired,
  showFlashMessage: PropTypes.func.isRequired,
};

class OperationalTimeTable extends React.Component {
  static getPropsFromStores() {
    return operationalTimeStore.getState();
  }

  static getStores() {
    return [operationalTimeStore];
  }

  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  componentDidMount() {
    operationalTimeActions.index({
      format: 'for_owner',
      query: {
        activity_id: this.props.activity.id,
      },
    });
  }

  onClickDelete(object, e) {
    e.preventDefault();
    operationalTimeActions.delete({
      object: object,
    }).then(
      (response) => {
        this.props.showFlashMessage({
          message: 'Successfully deleted.',
          status: 'success',
        });
      },
      (xhr) => {
        this.props.showFlashMessage({
          message: handleError(xhr),
          status: 'error',
        });
      }
    );
  }

  renderTableRow(object) {
    const tds = [];
    let i = 0;
    while (i < 7) {
      const times = object.times[i];
      let text;
      if (times) {
        const open = times[0];
        const closed = times[1];
        if (open === 0 && closed === 0) {
          text = 'All day';
        } else {
          text = `${open}-${closed}`;
        }
      } else {
        text = 'Closed';
      }
      tds.push(<td key={`hour-${i}`}>{text}</td>);
      i++;
    };
    return (
      <tr key={object.id}>
        {tds}
        <td>
          <a href="#" onClick={this.onClickDelete.bind(this, object)}>
            {"Delete"}
          </a>
        </td>
      </tr>
    );
  }

  render() {
    const headers = [
      'S',
      'M',
      'T',
      'W',
      'Th',
      'F',
      'Sa',
      'Actions',
    ];
    return (
      <div className={className({
        loading: this.props.operationalTimesRequestLoading
      })}>
        <SimpleTable
          objects={this.props.operational_times}
          renderTableRow={this.renderTableRow}
          tableHeaders={headers}
        />
      </div>
    );
  }
}

OperationalTimeTable.propTypes = propTypes;

export default connectToStores(OperationalTimeTable);
export { OperationalTimeTable };
