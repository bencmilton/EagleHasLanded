'use strict';

import React, {
  View,
  Component,
  Text,
  DatePickerIOS,
  PropTypes,
} from 'react-native';

import NewTripAddContacts from '../AddContacts';
import Button from '../../Common/Button';
import SetLocation from '../SetLocation';
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
  departureDate: PropTypes.date.isRequired,
  arrivalDate: PropTypes.date.isRequired,
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
    };
  }
  onDateChange = date => {
    this.setState({
      [this.state.editingDateType]: date,
      showDatePicker: false,
      editingDateType: null,
    });
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
  nextPage = () => {
    this.props.navigator.push({
      title: 'New Trip: Add Contacts',
      component: NewTripAddContacts,
      backButtonTitle: 'Add Contacts',
    });
  }
  render() {
    if (!this.state.showDatePicker) {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <SetLocation
              header="Set Departure Location"
              onChangeText={departureLocation => this.setState({departureLocation})}
              value={this.state.departureLocation}
              placeholder="Enter a Location"
              getCurrentPosition={this.getCurrentPosition.bind(null, 'departureLocation')}
            />
            <Button
              text="Set Departure Date/Time"
              onPress={this.showDatePicker.bind(null, 'departureDate')}
            />
            <Text style={styles.text}>
              {this.state.departureDate.toLocaleDateString() + '\n' + this.state.departureDate.toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.card}>
            <SetLocation
              header="Set Arrival Location"
              onChangeText={arrivalLocation => this.setState({arrivalLocation})}
              value={this.state.arrivalLocation}
              placeholder="Enter a Location"
              getCurrentPosition={this.getCurrentPosition.bind(null, 'arrivalLocation')}
            />
            <Button
              text="Set Arrival Date/Time"
              onPress={this.showDatePicker.bind(null, 'arrivalDate')}
            />
            <Text style={styles.text}>
              {this.state.arrivalDate.toLocaleDateString() + '\n' + this.state.arrivalDate.toLocaleTimeString()}
            </Text>
          </View>
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
    }
  }
}

NewTripDetails.defaultProps = defaultProps;
NewTripDetails.propTypes = propTypes;

export default NewTripDetails;
