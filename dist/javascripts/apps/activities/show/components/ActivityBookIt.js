'use strict';

var React = require('react');
var cx = require('classnames');

var Api = require('../../../../api/Api');

var DatepickerInput = require('../../../../components/shared/DatepickerInput');

var ActivityBookIt = React.createClass({
  displayName: 'ActivityBookIt',

  componentDidMount: function componentDidMount() {
    var _this = this;
    Api.resource.index({
      query: {
        activity_id: this.props.activityId
      },
      resource: 'packages',
      done: function done(response) {
        _this.setState({
          loadingPackages: false,
          package: response.packages[0],
          packages: response.packages
        });
      }
    });
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bookItUrl: '',
      maxDate: null,
      minDate: new Date(),
      packagesUrl: ''
    };
  },

  getInitialState: function getInitialState() {
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

  renderPackages: function renderPackages() {
    var selectOptions = [];
    for (var index in this.state.packages) {
      var pkg = this.state.packages[index];
      var typeOfBooking = 'Instant Book';
      if (pkg.approval_required) {
        typeOfBooking = 'Request to Book';
      }
      selectOptions.push(React.createElement('option', {
        key: pkg.id,
        value: index
      }, pkg.number_of_people + ' (' + typeOfBooking + ')'));
    }
    return selectOptions;
  },


  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'book-it__price' },
        React.createElement(
          'div',
          { className: 'pull-left' },
          this.state.package && this._priceString(this.state.package.price)
        )
      ),
      React.createElement(
        'div',
        { className: 'book-it__container' },
        React.createElement(
          'div',
          { className: cx("panel", { loading: this.state.loading }) },
          React.createElement(
            'div',
            { className: 'panel-body' },
            React.createElement(
              'div',
              { className: 'row space-4' },
              React.createElement(
                'div',
                { className: 'col-md-12' },
                React.createElement(
                  'label',
                  null,
                  'What day are you booking for?'
                ),
                React.createElement(
                  'div',
                  { className: 'space-top-2' },
                  React.createElement(DatepickerInput, { inputOnChange: this._datepickerOnChange,
                    inputRef: 'dateInput',
                    max_date: this.props.maxDate,
                    min_date: this.props.minDate,
                    placeholder: 'mm/dd/yyyy',
                    ref: 'datepickerInput' })
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'row space-4' },
              React.createElement(
                'div',
                { className: 'col-md-12' },
                React.createElement(
                  'label',
                  null,
                  'How many people do you have?'
                ),
                React.createElement(
                  'div',
                  { className: cx("space-top-2", { loading: this.state.loadingPackages }) },
                  React.createElement(
                    'div',
                    { className: 'select select-block' },
                    React.createElement(
                      'select',
                      {
                        name: 'number_of_people',
                        onChange: this._onChangeSelect
                      },
                      this.renderPackages()
                    )
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col-lg-12' },
                React.createElement(
                  'a',
                  { className: 'btn btn-block btn-large btn-special',
                    href: '#',
                    onClick: this._submitBookIt },
                  React.createElement('i', { className: this._iconClass() }),
                  "Add to Cart"
                )
              )
            )
          )
        )
      )
    );
  },

  _datepickerOnChange: function _datepickerOnChange(date) {
    this.setState({
      date: date
    });
  },

  _iconClass: function _iconClass() {
    var iconClass = 'space-right-1 fa fa-';

    if (this.state.package && this.state.package.approval_required) {
      iconClass += 'book';
    } else {
      iconClass += 'bolt';
    }

    return iconClass;
  },

  _isValid: function _isValid() {
    return this.state.date ? true : false;
  },

  _onChangeSelect: function _onChangeSelect(e) {
    this.setState({
      package: this.state.packages[e.target.value]
    });
  },

  _priceString: function _priceString(price) {
    return '$' + parseInt(price);
  },

  _submitBookIt: function _submitBookIt(e) {
    e.preventDefault();
    if (this._isValid()) {
      this.setState({ loading: true });
      Api.resource.create({
        resource: 'cart_items',
        payload: {
          activity_start_at: this.state.date,
          pricing_id: this.state.package.id,
          product_id: this.props.activityId,
          product_type: 'Activity'
        },
        done: function done(response) {
          window.location = '/cart';
        }
      });
    } else {
      this.refs.datepickerInput.refs.dateInput.focus();
    }
  }
});

module.exports = ActivityBookIt;