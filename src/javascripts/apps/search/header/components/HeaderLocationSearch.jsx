const connectToStores = require('alt/utils/connectToStores');
const React = require('react');
const ReactDOM = require('react-dom');

const SearchActions = require('../../shared/actions/SearchActions');
const SearchStore = require('../../shared/stores/SearchStore');

const inputId = 'headerSearchBar';

class HeaderLocationSearch extends React.Component {
  static getPropsFromStores() {
    return SearchStore.getState();
  }

  static getStores() {
    return [SearchStore];
  }

  componentDidMount() {
    initializeAutocomplete(
      document.getElementById(inputId), this.autocompleteCallback.bind(this)
    );
  }

  autocompleteCallback(hashFromGoogle) {
    SearchActions.updateAttributes(hashFromGoogle);
    if (SearchStore.getState().submitted) {
      this.onSubmitSearch();
    }
  }

  onSubmitSearch(e) {
    if (e) {
      e.preventDefault();
    }
    if (SearchStore.getState().submitted) {
      this.refs.searchForm.submit();
    } else {
      SearchActions.updateAttributes({ submitted: true });
    }
  }

  render() {
    return (
      <form
        action={"/search"}
        method={"GET"}
        onSubmit={this.onSubmitSearch.bind(this)}
        ref="searchForm"
      >
        <div className="search-form__container">
          <i className="fa fa-search" />
          <input
            autoComplete="off"
            defaultValue={this.props.location}
            id={inputId}
            name="location"
            placeholder="Where do you want to explore?"
          />
          <input
            name="latitude"
            readOnly
            type="hidden"
            value={this.props.latitude}
          />
          <input
            name="longitude"
            readOnly
            type="hidden"
            value={this.props.longitude}
          />
        </div>
      </form>
    );
  }
};

module.exports = connectToStores(HeaderLocationSearch);
module.exports.HeaderLocationSearch = HeaderLocationSearch;
