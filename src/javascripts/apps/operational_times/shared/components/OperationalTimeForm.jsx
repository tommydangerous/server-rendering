// Libs
import className from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import React, { PropTypes } from 'react';

// Actions
import operationalTimeActions from '../actions/OperationalTimeActions';

// Stores
import operationalTimeStore from '../stores/OperationalTimeStore';

// Components
import SimpleCheckbox from '../../../../components/shared/SimpleCheckbox';
import SimpleForm from '../../../../components/shared/SimpleForm';
import SimpleSelectField from '../../../../components/shared/SimpleSelectField';

// Utils
import handleError from '../../../../utilities/handle-error';

const propTypes = {
  activity: PropTypes.object.isRequired,
  showFlashMessage: PropTypes.func.isRequired,
};

const daysOfTheWeek = [
  [0, 'Sunday'],
  [1, 'Monday'],
  [2, 'Tuesday'],
  [3, 'Wednesday'],
  [4, 'Thursday'],
  [5, 'Friday'],
  [6, 'Saturday'],
];

class OperationalTimeForm extends React.Component {
  static getPropsFromStores() {
    return operationalTimeStore.getState();
  }

  static getStores() {
    return [operationalTimeStore];
  }

  constructor(props) {
    super(props);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    const visibleDays = {};
    visibleDays[0] = false;
    this.state = {
      close: {},
      loading: false,
      open: {},
      visibleDays: visibleDays,
    };
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

  onChangeCheckbox(e) {
    const hash = this.state;
    const name = parseInt(e.target.name);
    hash.visibleDays[name] = !this.state.visibleDays[name];
    this.setState(hash);
  }

  onChangeInput(e) {
    const name = e.target.name.split('-');
    const index = parseInt(name[1]);
    const openOrclose = name[0];
    const hash = this.state;
    hash[openOrclose][index] = parseInt(e.target.value);
    this.setState(hash);
  }

  onSubmitForm() {
    const times = {};
    let i = 0;
    while (i < daysOfTheWeek.length) {
      let open = this.state.open[i];
      let close = this.state.close[i];
      if (this.state.visibleDays[i]) {
        if (open === close) {
          open = 0;
          close = 0;
        }
        times[i] = [open, close];
      } else {
        times[i] = null;
      }
      i++;
    }
    this.setState({ loading: true });
    return new Promise((fulfill, reject) => {
      operationalTimeActions.create({
        format: 'for_owner',
        payload: {
          activity_id: this.props.activity.id,
          times: times,
        },
      }).then(
        (response) => {
          this.props.showFlashMessage({
            message: 'Successfully added.',
            status: 'success',
          });
          fulfill({
            response: response,
          });
          this.setState({ loading: false });
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

  renderDay(array) {
    const index = array[0];
    const timeOptions = this.generateTimeOptions();
    return (
      <div key={array}>
        <label>
          <div className="pull-left">
            <SimpleCheckbox
              name={`${index}`}
              onChangeInput={this.onChangeCheckbox}
              value={this.state.visibleDays[index]}
            />
          </div>
          {array[1]}
        </label>
        <hr className="space-2 space-top-2" />
        {this.state.visibleDays[index] && (
          <div className="row space-4">
            <div className="col-md-6">
              <label>
                {"Open time"}
              </label>
              <SimpleSelectField
                defaultValue={this.state.open[index]}
                name={`open-${index}`}
                onChangeSelect={this.onChangeInput}
                options={timeOptions}
              />
            </div>
            <div className="col-md-6">
              <label>
                {"Close time"}
              </label>
              <SimpleSelectField
                defaultValue={this.state.close[index]}
                name={`close-${index}`}
                onChangeSelect={this.onChangeInput}
                options={timeOptions}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  renderInputsForDays() {
    return daysOfTheWeek.map((array) => {
      return this.renderDay(array);
    });
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          {"What days are you open?"}
        </div>
        <div className="panel-body">
          {this.renderInputsForDays()}
        </div>
        <div className="panel-footer">
          <a
            className={className("btn btn-primary", { loading: this.state.loading })}
            href="#"
            onClick={this.onSubmitForm}
          >
            {"Save"}
          </a>
        </div>
      </div>
    );
  }
};

OperationalTimeForm.propTypes = propTypes;

export default connectToStores(OperationalTimeForm);
export { OperationalTimeForm };
