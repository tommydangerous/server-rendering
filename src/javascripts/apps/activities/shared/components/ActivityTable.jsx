// Libs
import connectToStores from 'alt/utils/connectToStores';
import className from 'classnames';
import React, { Component, PropTypes } from 'react';

// Actions
import activityActions from '../actions/ActivityActions';

// Stores
import activityStore from '../stores/ActivityStore';

// Components
import SimpleTable from '../../../../components/shared/SimpleTable';

class ActivityTable extends Component {
  static getPropsFromStores() {
    return activityStore.getState();
  }

  static getStores() {
    return [activityStore];
  }

  constructor(props) {
    super(props);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  componentDidMount() {
    activityActions.index({
      format: 'for_owner',
      meta: {
        order: 'id DESC',
      },
    });
  }

  renderTableRow(object) {
    const backgroundImageStyle = {};
    if (object.cover_image_url) {
      backgroundImageStyle.backgroundImage = `url(${object.cover_image_url})`;
    }
    return (
      <tr key={object.id}>
        <td>
          <div className="img-height-2">
            <div
              className="img-cover"
              style={backgroundImageStyle}
            >
            </div>
          </div>
        </td>
        <td>
          <div className="h5">
            <a className="link-block link-reset" href={`/activities/${object.id}`} target="_blank">
              {object.name}
            </a>
          </div>
        </td>
        <td>{object.category}</td>
        <td>{object.city}</td>
        <td>
          <div className={
            className({
              'color-green': object.status === 'active',
              'color-red': object.status === 'incomplete',
              'text-muted': object.status === 'inactive',
            })
          }>
            {object.status}
          </div>
        </td>
        <td>
          <a href={`/activities/${object.id}/edit`}>
            {"Manage"}
          </a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className={className({
        loading: this.props.activities_request_loading
      })}>
        <SimpleTable
          objects={this.props.activities}
          renderTableRow={this.renderTableRow}
          tableHeaders={["Cover image", "Name", "Activity type", "City", "Status", "Actions"]}
        />
      </div>
    );
  }
}

export default connectToStores(ActivityTable);
export { ActivityTable };
