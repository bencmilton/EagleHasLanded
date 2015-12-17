'use strict';

import React, {
  Component,
  PropTypes,
} from 'react-native';

import { GOOGLE_PLACES_API_KEY } from '../../../environment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

class GooglePlacesSearchInput extends Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder={this.props.placeholder}
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={false}
        onPress={(data) => { // 'details' is provided when fetchDetails = true
          this.props.onChangeText(data);
        }}
        getDefaultValue={() => this.props.value} // text input default value
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
          types: '(cities)', // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        currentLocationAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      />
    );
  }
}

GooglePlacesSearchInput.propTypes = propTypes;

export default GooglePlacesSearchInput;
