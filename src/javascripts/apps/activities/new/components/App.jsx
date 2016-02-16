const connectToStores = require('alt/utils/connectToStores');
const className = require('classnames');
const React = require('react');

const handleError = require('../../../../utilities/handle-error');

const activityActions = require('../../shared/actions/ActivityActions');
const activityStore = require('../../shared/stores/ActivityStore');

const ActivityLocationAutocomplete = require(
  '../../shared/components/ActivityLocationAutocomplete'
);
const AppWithFlashMessage = require('../../../../components/shared/AppWithFlashMessage');

class App extends AppWithFlashMessage {
  static getPropsFromStores() {
    return activityStore.getState();
  }

  static getStores() {
    return [activityStore];
  }

  constructor(props) {
    super(props);
    this.onAutocomplete = this.onAutocomplete.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onAutocomplete(hash) {
    this.setState(hash);
  }

  onChangeInput(e) {
    this.state[e.target.name] = e.target.value;
  }

  onClickButton(e) {
    e.preventDefault();
    const _this = this;
    activityActions.create({
      payload: this.state,
    }).then(
      function(response) {
        window.location = `/activities/${response.activity.id}/edit?new=true`;
      },
      function(xhr) {
        _this.setState({
          flashMessage: handleError(xhr),
          flashStatus: 'error',
        });
      }
    );
  }

  render() {
    return (
      <div>
        {this.renderFlashMessage()}

        <div className="panel-body page-container">
          <h2 className="space-6">
            {"List Your Activity"}
          </h2>

          <div className="space-4">
            <label>
              <h5>
                {"Name of your activity"}
              </h5>
            </label>
            <input
              autoComplete="off"
              className="input-large"
              name="name"
              onChange={this.onChangeInput}
              placeholder="Something short and exciting"
              type="text"
            />
          </div>

          <div className="space-4">
            <label>
              <h5>
                {"Location"}
              </h5>
            </label>
            <ActivityLocationAutocomplete
              inputClassName={"input-large"}
              onAutocomplete={this.onAutocomplete}
            />
          </div>

          <div className="text-right">
            <button
              className={
                className("btn btn-large btn-primary", { loading: this.props.requestLoading })
              }
              onClick={this.onClickButton}
            >
              {"Continue"}
            </button>
          </div>

        </div>
      </div>
    );
  }
};

module.exports = connectToStores(App);
module.exports.App = App;
