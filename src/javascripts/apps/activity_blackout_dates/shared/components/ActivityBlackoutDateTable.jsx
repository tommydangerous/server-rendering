// Libs
import connectToStores from 'alt/utils/connectToStores';
import className from 'classnames';
import React, { Component, PropTypes } from 'react';

// Utils
import formatDate from '../../../../utilities/format-date';

// Actions
import activityBlackoutDateActions from '../actions/ActivityBlackoutDateActions';

// Stores
import activityBlackoutDateStore from '../stores/ActivityBlackoutDateStore';

// Components
import SimpleTable from '../../../../components/shared/SimpleTable';

const propTypes = {
  activity: PropTypes.object.isRequired,
  showFlashMessage: PropTypes.func.isRequired,
};

class ActivityBlackoutDateTable extends Component {
  static getPropsFromStores() {
    return activityBlackoutDateStore.getState();
  }

  static getStores() {
    return [activityBlackoutDateStore];
  }

  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  componentDidMount() {
    activityBlackoutDateActions.index({
      format: 'for_owner',
      query: {
        activity_id: this.props.activity.id,
      },
    });
  }

  onClickDelete(object, e) {
    e.preventDefault();
    activityBlackoutDateActions.delete({
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
          message: xhr.responseJSON.error_message,
          status: 'error',
        });
      }
    );
  }

  renderTableRow(object) {
    return (
      <tr key={object.id}>
        <td>{formatDate(object.start_at)}</td>
        <td>{formatDate(object.end_at)}</td>
        <td>
          <a href="#" onClick={this.onClickDelete.bind(this, object)}>
            {"Delete"}
          </a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className={className({
        loading: this.props.activity_blackout_dates_request_loading
      })}>
        <SimpleTable
          objects={this.props.activity_blackout_dates}
          renderTableRow={this.renderTableRow}
          tableHeaders={["Starting date", "Ending date", "Actions"]}
        />
      </div>
    );
  }
}

ActivityBlackoutDateTable.propTypes = propTypes;

export default connectToStores(ActivityBlackoutDateTable);
export { ActivityBlackoutDateTable };
