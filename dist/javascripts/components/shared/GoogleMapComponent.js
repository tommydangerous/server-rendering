'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var GoogleMapComponent = React.createClass({
  displayName: 'GoogleMapComponent',

  getDefaultProps: function getDefaultProps() {
    return {
      latitude: 0,
      longitude: 0
    };
  },

  componentDidMount: function componentDidMount() {
    var map = this._initializeGoogleMap();
    this._addCircleToMap(map);
  },

  render: function render() {
    return React.createElement('div', { id: 'map' });
  },

  _addCircleToMap: function _addCircleToMap(map) {
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

  _initializeGoogleMap: function _initializeGoogleMap() {
    return new google.maps.Map(this._mapElement(), this._mapOptions());
  },

  _getCenter: function _getCenter() {
    return new google.maps.LatLng(this.props.latitude, this.props.longitude);
  },

  _mapElement: function _mapElement() {
    return document.getElementById('map');
  },

  _mapOptions: function _mapOptions() {
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