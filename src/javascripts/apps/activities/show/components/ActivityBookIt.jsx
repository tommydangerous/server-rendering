const React = require('react');
const cx = require('classnames')

const Api = require('../../../../api/Api');

const DatepickerInput = require('../../../../components/shared/DatepickerInput');

const ActivityBookIt = React.createClass({
  componentDidMount: function() {
    var _this = this;
    Api.resource.index({
      query: {
        activity_id: this.props.activityId,
      },
      resource: 'packages',
      done: function(response) {
        _this.setState({
          loadingPackages: false,
          package: response.packages[0],
          packages: response.packages,
        });
      },
    });
  },

  getDefaultProps: function() {
    return {
      bookItUrl: '',
      maxDate: null,
      minDate: new Date(),
      packagesUrl: ''
    };
  },

  getInitialState: function() {
    return {
      date: null,
      loading: false,
      loadingPackages: true,
      package: {
        approval_required: true,
        id: 0,
        number_of_people: 0,
        price: 0
      },
      packages: []
    };
  },

  renderPackages() {
    var selectOptions = [];
    for (var index in this.state.packages) {
      var pkg = this.state.packages[index];
      var typeOfBooking = 'Instant Book';
      if (pkg.approval_required) {
        typeOfBooking = 'Request to Book';
      }
      selectOptions.push(
        React.createElement('option', {
          key: pkg.id,
          value: index
        }, pkg.number_of_people + ' (' + typeOfBooking  + ')')
      );
    }
    return selectOptions;
  },

  render: function() {
    return (
      <div>
        <div className='book-it__price'>
          <div className='pull-left'>
            {this.state.package && (
              this._priceString(this.state.package.price)
            )}
          </div>
        </div>

        <div className="book-it__container">
          <div className={cx("panel", { loading: this.state.loading })}>
            <div className='panel-body'>
              <div className='row space-4'>
                <div className='col-md-12'>
                  <label>
                    {'What day are you booking for?'}
                  </label>
                  <div className='space-top-2'>
                    <DatepickerInput inputOnChange={this._datepickerOnChange}
                                     inputRef='dateInput'
                                     max_date={this.props.maxDate}
                                     min_date={this.props.minDate}
                                     placeholder='mm/dd/yyyy'
                                     ref='datepickerInput' />
                  </div>
                </div>
              </div>

              <div className='row space-4'>
                <div className='col-md-12'>
                  <label>
                    {'How many people do you have?'}
                  </label>
                  <div className={cx("space-top-2", { loading: this.state.loadingPackages })}>
                    <div className='select select-block'>
                      <select
                        name='number_of_people'
                        onChange={this._onChangeSelect}
                      >
                        {this.renderPackages()}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12'>

                  <a className='btn btn-block btn-large btn-special'
                     href='#'
                     onClick={this._submitBookIt}>

                    <i className={this._iconClass()} />
                    {"Add to Cart"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _datepickerOnChange: function(date) {
    this.setState({
      date: date
    });
  },

  _iconClass: function() {
    var iconClass = 'space-right-1 fa fa-';

    if (this.state.package && this.state.package.approval_required) {
      iconClass += 'book';
    } else {
      iconClass += 'bolt';
    }

    return iconClass;
  },

  _isValid: function() {
    return this.state.date ? true : false;
  },

  _onChangeSelect: function(e) {
    this.setState({
      package: this.state.packages[e.target.value]
    });
  },

  _priceString: function(price) {
    return `$${parseInt(price)}`;
  },

  _submitBookIt: function(e) {
    e.preventDefault();
    if (this._isValid()) {
      this.setState({ loading: true });
      Api.resource.create({
        resource: 'cart_items',
        payload: {
          activity_start_at: this.state.date,
          pricing_id: this.state.package.id,
          product_id: this.props.activityId,
          product_type: 'Activity',
        },
        done: function(response) {
          window.location = '/cart';
        },
      });
    } else {
      this.refs.datepickerInput.refs.dateInput.focus()
    }
  }
});

module.exports = ActivityBookIt;
