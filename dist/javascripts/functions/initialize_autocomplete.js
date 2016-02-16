'use strict';

var initializeAutocomplete = function initializeAutocomplete(element, callback, types) {
  var autocomplete = new google.maps.places.Autocomplete(element, {
    types: types || ['geocode']
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    var streetNumber = '';
    var streetAddress = '';
    var city = '';
    var state = '';
    var zip = '';
    var country = '';

    $.each(place.address_components, function (index, hash) {
      var types = hash['types'];

      if ($.inArray('street_number', types) == 0) {
        streetNumber = hash['long_name'];
      }

      if ($.inArray('route', types) == 0) {
        streetAddress = hash['long_name'];
      }

      if ($.inArray('locality', types) == 0) {
        city = hash['long_name'];
      }

      if ($.inArray('administrative_area_level_1', types) == 0) {
        state = hash['short_name'];
      }

      if ($.inArray('postal_code', types) == 0) {
        zip = hash['long_name'];
      }

      if ($.inArray('country', types) == 0) {
        country = hash['long_name'];
      }
    });

    callback({
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      street: [streetNumber, streetAddress].join(' '),
      city: city,
      state: state,
      zip: zip,
      country: country
    });
  });
};