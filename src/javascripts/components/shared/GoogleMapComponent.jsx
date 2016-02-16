const React = require('react');
const ReactDOM = require('react-dom');

const GoogleMapComponent = React.createClass({
  getDefaultProps: function() {
    return {
      latitude: 0,
      longitude: 0
    };
  },

  componentDidMount: function() {
    var map = this._initializeGoogleMap();
    this._addCircleToMap(map);
  },

  render: function() {
    return (
      <div id='map'>
      </div>
    );
  },

  _addCircleToMap: function(map) {
    new google.maps.Circle({
      center: this._getCenter(),
      fillColor: '#80D6FE',
      fillOpacity: 0.35,
      map: map,
      radius: Math.sqrt(25) * 100,
      strokeColor: '#19B5FE',
      strokeOpacity: 0.8,
      strokeWeight: 2
    });
  },

  _initializeGoogleMap: function() {
    return new google.maps.Map(this._mapElement(), this._mapOptions());
  },

  _getCenter: function() {
    return new google.maps.LatLng(this.props.latitude, this.props.longitude);
  },

  _mapElement: function() {
    return document.getElementById('map');
  },

  _mapOptions: function() {
    return {
      center: this._getCenter(),
      disableDefaultUI: true,
      mapControlOptions: {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        style: google.maps.MapTypeControlStyle.DEFAULT
      },
      maxZoom: 20,
      minZoom: 10,
      panControl: false,
      scrollwheel: false,
      streetViewControl: true,
      zoom: 14,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP,
        style: google.maps.ZoomControlStyle.SMALL
      }
    };
  }
});

module.exports = GoogleMapComponent;
