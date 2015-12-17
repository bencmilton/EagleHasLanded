'use strict';

import React, {
  View,
  Component,
  DatePickerIOS,
  PropTypes,
} from 'react-native';

import NewTripAddContacts from '../AddContacts';
import Button from '../../Common/Button';
import DetailCard from './components/DetailCard';
import SetLocation from './components/SetLocation';
import styles from './styles';

const defaultProps = {
  departureDate: new Date(),
  arrivalDate: new Date(),
  arrivalLocation: '',
  departureLocation: '',
  showDatePicker: false,
  editingDateType: null,
};

const propTypes = {
  departureDate: PropTypes.object,
  arrivalDate: PropTypes.object,
  arrivalLocation: PropTypes.string,
  departureLocation: PropTypes.string,
  showDatePicker: PropTypes.bool,
  editingDateType: PropTypes.string,
};

class NewTripDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureDate: this.props.departureDate,
      arrivalDate: this.props.arrivalDate,
      arrivalLocation: this.props.arrivalLocation,
      departureLocation: this.props.departureLocation,
      showDatePicker: this.props.showDatePicker,
      editingDateType: this.props.editingDateType,
      showLocationInput: this.props.showLocationInput,
      editingLocationType: this.props.editingLocationType,
    };
  }
  getCurrentPosition = value => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          [value]: JSON.stringify([(position.coords.longitude).toFixed(3), (position.coords.latitude).toFixed(3)]),
        });
      },
      error => console.error(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  showDatePicker = type => {
    this.setState({
      editingDateType: type,
      showDatePicker: !this.state.showDatePicker,
    });
  }
  onDateChange = date => {
    this.setState({
      [this.state.editingDateType]: date,
      showDatePicker: false,
      editingDateType: null,
    });
  }
  handleLocationChange = location => {
    this.setState({
      [this.state.editingLocationType]: location,
      showLocationInput: false,
      editingLocationType: null,
    });
  }
  showLocationInput = type => {
    this.setState({
      editingLocationType: type,
      showLocationInput: !this.state.showLocationInput,
    });
  }
  nextPage = () => {
    this.props.navigator.push({
      title: 'New Trip: Add Contacts',
      component: NewTripAddContacts,
      backButtonTitle: 'Add Contacts',
    });
  }
  render() {
    if (!this.state.showDatePicker && !this.state.showLocationInput) {
      return (
        <View style={styles.container}>
          <DetailCard
            type="Departure"
            location={this.state.departureLocation}
            selectLocation={this.showLocationInput.bind(null, 'departureLocation')}
            date={this.state.departureDate}
            selectDate={this.showDatePicker.bind(null, 'departureDate')}
          />
          <DetailCard
            type="Arrival"
            location={this.state.arrivalLocation}
            selectLocation={this.showLocationInput.bind(null, 'arrivalLocation')}
            date={this.state.arrivalDate}
            selectDate={this.showDatePicker.bind(null, 'arrivalDate')}
          />
          <Button
            text="Next"
            onPress={this.nextPage}
          />
        </View>
      );
    } else if (this.state.showDatePicker) {
      return (
        <View style={styles.datePickerContainer}>
          <DatePickerIOS
            date={this.state.editingDateType === 'arrivalDate' ? this.state.arrivalDate : this.state.departureDate}
            mode="datetime"
            onDateChange={this.onDateChange}
          />
        </View>
      );
    } else if (this.state.showLocationInput) {
      return (
        <View style={styles.locationInputContainer}>
          <SetLocation
            header={`Set ${this.state.editingLocationType === 'departureLocation' ? 'Departure' : 'Arrival'} Location`}
            onChangeText={this.handleLocationChange}
            placeholder="Enter a Location"
            done={this.showLocationInput.bind(null, this.state.editingLocationType)}
          />
        </View>
      );
    }
  }
}

NewTripDetails.defaultProps = defaultProps;
NewTripDetails.propTypes = propTypes;

export default NewTripDetails;
