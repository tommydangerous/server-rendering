import className from 'classnames';
import React, { PropTypes } from 'react';

// Actions
import activityPickupActions from '../../../activity_pickups/shared/actions/ActivityPickupActions';

// Components
import ActivityPickupForm from '../../../activity_pickups/shared/components/ActivityPickupForm';
import ActivityPickupTable from
  '../../../activity_pickups/shared/components/ActivityPickupTable';
import DatepickerInput from '../../../../components/shared/DatepickerInput';
import LocationAutocompleteInput from '../../../../components/shared/LocationAutocompleteInput';
import PackageForm from '../../../packages/shared/components/PackageForm';
import SimpleCheckbox from '../../../../components/shared/SimpleCheckbox';
import SimpleSelectField from '../../../../components/shared/SimpleSelectField';
import SimpleTextField from '../../../../components/shared/SimpleTextField';

// Utilities
import handleError from '../../../../utilities/handle-error';

const propTypes = {
  activity: PropTypes.object.isRequired,
  showFlashMessage: PropTypes.func.isRequired,
};

const locationTypes = [
  {
    text: 'Hotel',
    value: 1,
  },
  {
    text: 'Airbnb',
    value: 2,
  },
  {
    text: 'Specific address',
    value: 0,
  },
];

class PickupLocations extends React.Component {
  constructor(props) {
    super(props);
    this.onAutocompleteLocation = this.onAutocompleteLocation.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeLocationType = this.onChangeLocationType.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
    this.state = this.initialState();
  }

  generateTimeOptions() {
    const options = [];
    let i = 0;
    while (i < 24) {
      for (let n in [0, 1]) {
        const value = (i * 100) + (n * 30);
        let text = '';
        if (value === 0) {
          text = '000';
        } else if (value < 100) {
          text = '00';
        } else if (value < 1000) {
          text = '0';
        }
        text = `${text}${value}`;
        options.push({
          disabled: false,
          text: `${text.slice(0, 2)}:${text.slice(2, 4)}`,
          value: value,
        });
      }
      i++;
    }
    return options;
  }

  initialState() {
    return {
      end_time: 0,
      extra_charge: false,
      loading: false,
      location_type: locationTypes[0].value,
      private: false,
      start_time: 0,
    };
  }

  onAutocompleteLocation(hash) {
    this.setState(hash);
  }

  onChangeCheckbox(e) {
    const state = {};
    state[e.target.name] = !this.state[e.target.name];
    this.setState(state);
  }

  onChangeLocationType(e) {
    const state = {};
    state[e.target.name] = parseInt(e.target.value);
    this.setState(state);
  }

  onChangeInput(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onClickSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    return new Promise((fulfill, reject) => {
      activityPickupActions.create({
        format: 'for_owner',
        payload: Object.assign({
          activity_id: this.props.activity.id,
        }, this.state),
      }).then(
        (response) => {
          this.props.showFlashMessage({
            message: 'Pickup location successfully added.',
            status: 'success',
          });
          fulfill({
            response: response,
          });
          this.resetState();
        },
        (xhr) => {
          this.props.showFlashMessage({
            message: handleError(xhr),
            status: 'error',
          });
          reject(xhr);
          this.setState({ loading: false });
        }
      );
    });
  }

  resetState() {
    const state = {};
    Object.keys(this.state).forEach((attr) => {
      state[attr] = null;
    });
    this.setState(Object.assign(state, this.initialState()));
  }

  render() {
    const timeOptions = this.generateTimeOptions();
    return (
      <div>
        <div className="space-4">
          <ActivityPickupTable
            activity={this.props.activity}
            showFlashMessage={this.props.showFlashMessage}
          />
        </div>
        <div className="panel">
          <div className="panel-header">
            {"Add a pickup location"}
          </div>
          <div className="panel-body">
            <div className="space-2">
              <label>
                {"Type of pickup location? (e.g. Hotel, Airbnb, etc."}
              </label>
              <SimpleSelectField
                defaultValue={this.state.location_type}
                name="location_type"
                onChangeSelect={this.onChangeLocationType}
                options={locationTypes}
              />
            </div>

            {this.state.location_type === 0 && (
              <div>
                <div className="space-2">
                  <SimpleTextField
                    label="Name of pickup location"
                    name="name"
                    onChangeInput={this.onChangeInput}
                    value={this.state.name}
                  />
                </div>

                <div className="space-2">
                  <label>
                    {"Where is this location?"}
                  </label>
                  <LocationAutocompleteInput
                    id="pickup-location-autocomplete-input"
                    name="location"
                    onAutocomplete={this.onAutocompleteLocation}
                    placeholder=""
                  />
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-md-6 space-2">
                <label>
                  {"Start time of pickup"}
                </label>
                <SimpleSelectField
                  defaultValue={this.state.start_time}
                  name="start_time"
                  onChangeSelect={this.onChangeInput}
                  options={timeOptions}
                />
              </div>
              <div className="col-md-6 space-2">
                <label>
                  {"End time of pickup"}
                </label>
                <SimpleSelectField
                  defaultValue={this.state.end_time}
                  name="end_time"
                  onChangeSelect={this.onChangeInput}
                  options={timeOptions}
                />
              </div>
            </div>

            <label>
              {"Is there an extra charge for being picked up?"}
            </label>
            <SimpleCheckbox
              name="extra_charge"
              onChangeInput={this.onChangeCheckbox}
            />

            {this.state.extra_charge && (
              <div className="space-top-2">
                <div className="space-2">
                  <SimpleTextField
                    label="Price"
                    name="price"
                    numberOnly={true}
                    onChangeInput={this.onChangeInput}
                    scale={2}
                    value={this.state.price}
                  />
                </div>

                <div className="space-2">
                  <SimpleTextField
                    label="Number of people"
                    name="number_of_people"
                    numberOnly={true}
                    onChangeInput={this.onChangeInput}
                    value={this.state.number_of_people}
                  />
                </div>

                <label>
                  {"Is this package for a private group?"}
                </label>
                <SimpleCheckbox
                  name="private"
                  onChangeInput={this.onChangeCheckbox}
                  value={this.state.private}
                />
              </div>
            )}
          </div>
          <div className="panel-footer">
            <a
              className={className("btn btn-primary", { loading: this.state.loading })}
              href="#"
              onClick={this.onClickSubmit}
            >
              {"Save"}
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default PickupLocations;
