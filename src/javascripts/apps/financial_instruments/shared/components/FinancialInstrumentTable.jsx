const connectToStores = require('alt/utils/connectToStores');
const cx = require('classnames');
const React = require('react');

const financialInstrumentActions = require('../../shared/actions/FinancialInstrumentActions');
const financialInstrumentStore = require('../../shared/stores/FinancialInstrumentStore');

const SimpleTable = require('../../../../components/shared/SimpleTable');

const propTypes = {
  showFlashMessage: React.PropTypes.func,
};

class FinancialInstrumentTable extends React.Component {
  static getPropsFromStores() {
    return financialInstrumentStore.getState();
  }

  static getStores() {
    return [financialInstrumentStore];
  }

  componentDidMount() {
    financialInstrumentActions.index();
  }

  constructor() {
    super();
    this.onClickDelete = this.onClickDelete.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  onClickDelete(object, e) {
    e.preventDefault();
    const _this = this;
    financialInstrumentActions.delete({
      object: object,
    }).then(
      function(response) {
        _this.props.showFlashMessage({
          message: 'Financial instrument successfully deleted.',
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
    const _this = this;
    return (
      <tr key={object.id}>
        <td>{object.instrument_type}</td>
        <td>{object.default ? "Default" : "Not default"}</td>
        <td>{object.status ? object.status : "pending"}</td>
        <td>
          <a href="#" onClick={_this.onClickDelete.bind(this, object)}>
            {"Delete"}
          </a>
          {
            (!object.default && object.status == 'verified' ?
              <a className="space-left-2" href="#">
                {"Make default"}
              </a>
              : null
            )
          }
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className={cx({ loading: this.props.requestLoading })}>
        <SimpleTable
          objects={this.props.financial_instruments}
          renderTableRow={this.renderTableRow}
          tableHeaders={["Method", "Details", "Status", "Actions"]}
        />
      </div>
    );
  }
}

FinancialInstrumentTable.propTypes = propTypes;

module.exports = connectToStores(FinancialInstrumentTable);
module.exports.FinancialInstrumentTable = FinancialInstrumentTable;
