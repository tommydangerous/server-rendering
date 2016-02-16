import React, { Component, PropTypes } from 'react';

const propTypes = {
  objects: React.PropTypes.arrayOf(React.PropTypes.object),
  renderTableRow: React.PropTypes.func.isRequired,
  tableHeaders: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

class SimpleTable extends Component {
  renderRows() {
    return this.props.objects.map((object) => {
      return this.props.renderTableRow(object);
    });
  }

  renderHeaders() {
    return this.props.tableHeaders.map((header) => {
      return <th key={header}>{header}</th>;
    });
  }

  render() {
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {this.renderHeaders()}
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
};

SimpleTable.propTypes = propTypes;

export default SimpleTable;
