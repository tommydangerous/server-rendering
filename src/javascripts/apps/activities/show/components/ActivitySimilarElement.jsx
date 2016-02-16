const React = require('react');
const ReactDOM = require('react-dom');

const ActivitySimilarElement = React.createClass({
  getDefaultProps: function() {
    return {
      activity: {}
    }
  },

  getInitialState: function() {
    return {
      city: this.props.activity.city,
      country: this.props.activity.country,
      cover_image_url: this.props.activity.cover_image_url,
      id: this.props.activity.id,
      latitude: this.props.activity.latitude,
      longitude: this.props.activity.longitude,
      min_price: this.props.activity.min_price,
      name: this.props.activity.name,
      state: this.props.activity.state
    }
  },

  render: function() {
    return (
      <div className='col-md-4'>
        <a className='link-block' href={this._showUrl()}>
          <div className='img-height-4'>
            <div className='img-cover' style={this._styles()}>
              <div className='img-price__container'>
                <div className='img-price__value'>
                  <h3 className='text-normal-font-weight'>
                    {'$' + Math.floor(this.state.min_price)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </a>

        <div className='panel-body-small'>
          <h5 className='text-normal-font-weight'>
            <a className='link-reset' href={this._showUrl()}>
              {this.state.name}
            </a>
          </h5>
          <div className='text-muted'>
            <a className='link-reset' href={this._searchUrl()}>
              {this._location()}
            </a>
          </div>
        </div>
      </div>
    );
  },

  _location: function() {
    return [this.state.city, this.state.state, this.state.country].join(', ');
  },

  _searchUrl: function() {
    return '/search?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude;
  },

  _showUrl: function() {
    return '/activities/' + this.state.id;
  },

  _styles: function() {
    return {
      backgroundImage: 'url(' + this.state.cover_image_url + ')'
    };
  }
});

module.exports = ActivitySimilarElement;
