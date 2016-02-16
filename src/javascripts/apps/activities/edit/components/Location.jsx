const cx = require('classnames');
const React = require('react');

const ActivityLocationAutocomplete = require(
  '../../shared/components/ActivityLocationAutocomplete'
);

const propTypes = {
  activity: React.PropTypes.shape({
    city: React.PropTypes.string,
    country: React.PropTypes.string,
    state: React.PropTypes.string,
    street: React.PropTypes.string,
  }).isRequired,
  onSubmitForm: React.PropTypes.func.isRequired,
};

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.onAutocomplete = this.onAutocomplete.bind(this);
  }

  locationString() {
    return [
      this.props.activity.street,
      this.props.activity.city,
      this.props.activity.state,
      this.props.activity.country,
    ].filter(function(value) {
      return value && value.length;
    }).join(', ');
  }

  onAutocomplete(hash) {
    this.props.onSubmitForm(hash);
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          {"Location"}
        </div>
        <div className="panel-body">
          <label>
            {"Where your activity happens"}
          </label>
          <ActivityLocationAutocomplete
            location={this.locationString()}
            onAutocomplete={this.onAutocomplete}
          />
        </div>
      </div>
    );
  }
}

Location.propTypes = propTypes;

module.exports = Location;
