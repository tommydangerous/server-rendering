const connectToStores = require('alt/utils/connectToStores');
const cx = require('classnames');
const React = require('react');

const packageActions = require('../../shared/actions/PackageActions');
const packageStore = require('../../shared/stores/PackageStore');

const SimpleTable = require('../../../../components/shared/SimpleTable');

// Utils
import titleize from '../../../../utilities/titleize';

const propTypes = {
  activity: React.PropTypes.object.isRequired,
  showFlashMessage: React.PropTypes.func.isRequired,
};

class PackageTable extends React.Component {
  static getPropsFromStores() {
    return packageStore.getState();
  }

  static getStores() {
    return [packageStore];
  }

  componentDidMount() {
    packageActions.index({
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
    packageActions.delete({
      object: object,
    }).then(
      function(response) {
        _this.props.showFlashMessage({
          message: 'Package successfully deleted.',
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
    let purpose;
    if (object.activity_pickup) {
      if (object.activity_pickup.name) {
        purpose = object.activity_pickup.name;
      } else {
        purpose = titleize(object.activity_pickup.location_type);
      }
    } else {
      purpose = 'Activity';
    }
    return (
      <tr key={object.id}>
        <td>{purpose}</td>
        <td>{'$' + object.price}</td>
        <td>{object.number_of_people}</td>
        <td>{object.approval_required ? "Yes" : "No"}</td>
        <td>{object.private ? "Private" : "Public"}</td>
        <td>{object.age_type}</td>
        <td>
          <a href="#" onClick={this.onClickDelete.bind(this, object)}>
            {"Delete"}
          </a>
        </td>
      </tr>
    );
  }

  render() {
    const tableHeaders = [
      'For',
      'Price',
      '# people',
      'Approval required',
      'Private',
      'Age',
      'Actions',
    ];
    return (
      <div className={cx({ loading: this.props.requestLoading })}>
        <SimpleTable
          objects={this.props.packages}
          renderTableRow={this.renderTableRow}
          tableHeaders={tableHeaders}
        />
      </div>
    );
  }
}

PackageTable.propTypes = propTypes;

module.exports = connectToStores(PackageTable);
module.exports.PackageTable = PackageTable;
