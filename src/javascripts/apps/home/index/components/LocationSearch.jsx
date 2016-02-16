const React = require('react');
const ReactDOM = require('react-dom');

const LocationSearch = React.createClass({
  getDefaultProps() {
    return {
      inputId: "homeSearchBar"
    };
  },

  getInitialState() {
    return {
      latitude: 0,
      longitude: 0,
      submitted: false
    };
  },

  componentDidMount() {
    initializeAutocomplete(
      document.getElementById(this.props.inputId), this.autocompleteCallback
    );
  },

  autocompleteCallback(hashFromGoogle) {
    this.setState(hashFromGoogle);
    if (this.state.submitted) {
      this.onSubmitSearch();
    }
  },

  onSubmitSearch(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.submitted) {
      this.refs.searchForm.submit();
    } else {
      this.setState({ submitted: true });
    }
  },

  render() {
    return (
      <form
        action={"/search"}
        method={"GET"}
        onSubmit={this.onSubmitSearch}
        ref="searchForm"
      >
        <div className="searchbar__input">
          <label className="searchbar__input__label">
            <input
              className="input-large searchbar__location"
              autoComplete="off"
              id={this.props.inputId}
              name="location"
              placeholder="Where do you want to explore?"
            />
            <input
              name="latitude"
              readOnly
              type="hidden"
              value={this.state.latitude}
            />
            <input
              name="longitude"
              readOnly
              type="hidden"
              value={this.state.longitude}
            />
          </label>
        </div>
        <button
          className="btn btn-large btn-primary searchbar__button"
          name="button"
          type="submit"
        >
          {"Search"}
        </button>
      </form>
    );
  }
});

module.exports = LocationSearch;
