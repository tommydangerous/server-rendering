const React = require('react');
const ReactDOM = require('react-dom');

const propTypes = {
  inputClassName: React.PropTypes.string,
  inputId: React.PropTypes.string,
  onAutocomplete: React.PropTypes.func.isRequired,
};

const defaultProps = {
  inputId: 'location-autocomplete',
};

class ActivityLocationAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.initializeAutocomplete = this.initializeAutocomplete.bind(this);
  }

  componentDidMount() {
    this.initializeAutocomplete();
  }

  initializeAutocomplete() {
    initializeAutocomplete(
      document.getElementById(this.props.inputId), this.props.onAutocomplete
    );
  }

  render() {
    return (
      <input
        className={this.props.inputClassName}
        defaultValue={this.props.location}
        id={this.props.inputId}
        name="location"
        placeholder="Where does this activity take place?"
        type="text"
      />
    );
  }
};

ActivityLocationAutocomplete.propTypes = propTypes;
ActivityLocationAutocomplete.defaultProps = defaultProps;

module.exports = ActivityLocationAutocomplete;
