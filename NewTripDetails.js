'use strict';

import NewTripAddContacts from './NewTripAddContacts';
import Button from './Button';
import SetLocation from './SetLocation';
import React, {
  View,
  ScrollView,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  DatePickerIOS,
  ActivityIndicatorIOS,
} from 'react-native';

const defaultProps = {
  departureDate: new Date(),
  arrivalDate: new Date(),
  arrivalLocation: '',
  departureLocation: '',
  showDatePicker: false,
  editingDateType: null,
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
    }
  }
  getCurrentPosition = value => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          [value]: JSON.stringify([(position.coords.longitude).toFixed(3), (position.coords.latitude).toFixed(3)]),
        });
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  onDateChange = date => {
    this.setState({
      [this.state.editingDateType]: date,
      showDatePicker: false,
      editingDateType: null
    });
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
    console.log('')
    if (!this.state.showDatePicker) {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <SetLocation
              header='Set Departure Location'
              onChangeText={departureLocation => this.setState({departureLocation})}
              value={this.state.departureLocation}
              placeholder='Enter a Location'
              getCurrentPosition={this.getCurrentPosition.bind(null, 'departureLocation')}
            />
            <Button
              text='Set Departure Date/Time'
              onPress={this.showDatePicker.bind(null, 'departureDate')}
            />
            <Text style={styles.text}>
              {this.state.departureDate.toLocaleDateString() + '\n' + this.state.departureDate.toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.card}>
            <SetLocation
              header='Set Arrival Location'
              onChangeText={arrivalLocation => this.setState({arrivalLocation})}
              value={this.state.arrivalLocation}
              placeholder='Enter a Location'
              getCurrentPosition={this.getCurrentPosition.bind(null, 'arrivalLocation')}
            />
            <Button
              text='Set Arrival Date/Time'
              onPress={this.showDatePicker.bind(null, 'arrivalDate')}
            />
            <Text style={styles.text}>
              {this.state.arrivalDate.toLocaleDateString() + '\n' + this.state.arrivalDate.toLocaleTimeString()}
            </Text>
          </View>
          <Button
            text='Next'
            onPress={this.nextPage}
          />
        </View>
      )
    } else if (this.state.showDatePicker) {
      return (
        <View style={styles.datePickerContainer}>
          <DatePickerIOS
            date={this.state.editingDateType === 'arrivalDate' ? this.state.arrivalDate : this.state.departureDate}
            mode='datetime'
            onDateChange={this.onDateChange}
          />
        </View>
      )
    } else {
      return (
        <ActivityIndicatorIOS
          animating={true}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  datePickerContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
  container: {
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3B3738'
  },
  card: {
    height: 200,
    width: 250,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 10,
    margin: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'gray',
    textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

NewTripDetails.defaultProps = defaultProps;

export default NewTripDetails;
