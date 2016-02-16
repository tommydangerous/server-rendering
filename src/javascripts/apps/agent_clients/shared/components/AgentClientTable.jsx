const connectToStores = require('alt/utils/connectToStores');
const cx = require('classnames');
const React = require('react');

const agentClientActions = require('../actions/AgentClientActions');
const agentClientStore = require('../stores/AgentClientStore');

const SimpleTable = require('../../../../components/shared/SimpleTable');

const propTypes = {
  showFlashMessage: React.PropTypes.func,
};

class AgentClientTable extends React.Component {
  static getPropsFromStores() {
    return agentClientStore.getState();
  }

  static getStores() {
    return [agentClientStore];
  }

  componentDidMount() {
    agentClientActions.index();
  }

  constructor() {
    super();
    this.onClickDelete = this.onClickDelete.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  onClickDelete(object, e) {
    e.preventDefault();
    const _this = this;
    agentClientActions.delete({
      object: object,
    }).then(
      function(response) {
        _this.props.showFlashMessage({
          message: 'Client successfully deleted.',
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
        <td>{object.id}</td>
        <td>{object.name}</td>
        <td>
          <a href="#" onClick={_this.onClickDelete.bind(this, object)}>
            {"Delete"}
          </a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className={cx({ loading: this.props.requestLoading })}>
        <SimpleTable
          objects={this.props.agent_clients}
          renderTableRow={this.renderTableRow}
          tableHeaders={["ID", "Name", "Actions"]}
        />
      </div>
    );
  }
};

AgentClientTable.propTypes = propTypes;

module.exports = connectToStores(AgentClientTable);
module.exports.AgentClientTable = AgentClientTable;
