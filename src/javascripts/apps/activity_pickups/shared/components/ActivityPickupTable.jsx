const connectToStores = require('alt/utils/connectToStores');
const className = require('classnames');
const React = require('react');

const activityPickupActions = require('../actions/ActivityPickupActions');

const activityPickupStore = require('../stores/ActivityPickupStore');

const SimpleTable = require('../../../../components/shared/SimpleTable');

// Utils
import titleize from '../../../../utilities/titleize';

const propTypes = {
  activity: React.PropTypes.object.isRequired,
  showFlashMessage: React.PropTypes.func.isRequired,
};

class ActivityPickupTable extends React.Component {
  static getPropsFromStores() {
    return activityPickupStore.getState();
  }

  static getStores() {
    return [activityPickupStore];
  }

  componentDidMount() {
    activityPickupActions.index({
      format: 'for_owner',
      query: {
        activity_id: this.props.activity.id,
      },
    });
  }

  constructor() {
    super();
    this.onClickDelete = this.onClickDelete.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  onClickDelete(object, e) {
    e.preventDefault();
    const _this = this;
    activityPickupActions.delete({
      object: object,
    }).then(
      function(response) {
        _this.props.showFlashMessage({
          message: 'Pickup location successfully deleted.',
          status: 'success',
        });
      },
      function(xhr) {
        _this.props.showFlashMessage({
          message: xhr.responseJSON.error_message,
          status: 'error',
        });
      }
    );
  }

  renderTableRow(object) {
    let name;
    if (object.name) {
      name = object.name;
    } else {
      name = titleize(object.location_type);
    }
    return (
      <tr key={object.id}>
        <td>
          {name}
        </td>
        <td>{object.street}</td>
        <td>{`${object.start_time} - ${object.end_time}`}</td>
        <td>{object.package ? `$${object.package.price}` : 'Included in activity'}</td>
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
      'Name',
      'Street',
      'Time',
      'Price',
      'Actions',
    ];
    return (
      <div className={className({ loading: this.props.activity_pickups_request_loading })}>
        <SimpleTable
          objects={this.props.activity_pickups}
          renderTableRow={this.renderTableRow}
          tableHeaders={headers}
        />
      </div>
    );
  }
}

ActivityPickupTable.propTypes = propTypes;

module.exports = connectToStores(ActivityPickupTable);
module.exports.ActivityPickupTable = ActivityPickupTable;
