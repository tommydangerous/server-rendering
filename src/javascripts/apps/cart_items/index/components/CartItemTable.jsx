const connectToStores = require('alt/utils/connectToStores');
const cx = require('classnames');
const React = require('react');

const cartActions = require('../actions/CartActions');
const cartStore = require('../stores/CartStore');

const SimpleTable = require('../../../../components/shared/SimpleTable');

const propTypes = {
  showFlashMessage: React.PropTypes.func,
};

class CartItemTable extends React.Component {
  static getPropsFromStores() {
    return cartStore.getState();
  }

  static getStores() {
    return [cartStore];
  }

  componentDidMount() {
    cartActions.index();
  }

  constructor() {
    super();
    this.onClickDelete = this.onClickDelete.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  onClickDelete(object, e) {
    e.preventDefault();
    const _this = this;
    cartActions.delete({
      object: object,
    }).then(
      function(response) {
        _this.props.showFlashMessage({
          message: 'Cart item successfully removed.',
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
    const dates = object.activity_start_at.split(' ')[0].split('-');
    const formattedDate = dates[1] + '/' + dates[2] + '/' + dates[0];
    return (
      <tr key={object.id}>
        <td>
          <a className="link-reset" href={"/activities/" + object.product.id}>
            {object.product.name}
          </a>
        </td>
        <td>
          {"$" + object.pricing.price}
        </td>
        <td>
          {object.pricing.number_of_people}
        </td>
        <td>{formattedDate}</td>
        <td>{object.pricing.approval_required ? "Yes" : "No"}</td>
        <td>
          <a href="#" onClick={_this.onClickDelete.bind(this, object)}>
            {"Remove"}
          </a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className={cx({ loading: this.props.requestLoading })}>
        <SimpleTable
          objects={this.props.cart_items}
          renderTableRow={this.renderTableRow}
          tableHeaders={
            ["Activity name", "Price", "People", "Start date", "Approval required", "Actions"]
          }
        />
      </div>
    );
  }
};

CartItemTable.propTypes = propTypes;

module.exports = connectToStores(CartItemTable);
module.exports.CartItemTable = CartItemTable;
