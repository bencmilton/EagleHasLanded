'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicatorIOS,
  AlertIOS,
  TextInput,
  PropTypes,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import * as appActions from '../../../actions/appActions';
import Contacts from 'react-native-contacts';
import ContactPicker from '../../Common/ContactPicker';
import Button from '../../Common/Button';
import styles from './styles';

const Composer = require('NativeModules').RNMessageComposer;

const propTypes = {
  saveContactData: PropTypes.func.isRequired,
};

class NewTripAddContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContacts: [],
      addingContacts: false,
      tripName: 'New Trip',
      editingTripName: false,
    };
  }
  componentDidMount() {
    Contacts.getAll((err, contacts) => {
      if (err && err.type === 'permissionDenied') {
        console.error(err);
      } else {
        this.setState({
          contacts: contacts.filter(contact => contact.phoneNumbers.length),
        });
      }
    });
  }
  addToSelectedContacts = contact => {
    this.setState({
      selectedContacts: this.state.selectedContacts.concat([contact]),
      addingContacts: false,
    });
  }
  toggleAddingContacts = () => {
    this.setState({
      addingContacts: !this.state.addingContacts,
    });
  }
  saveTrip = () => {
    this.props.saveContactData(this.state.contacts);
  }
  handleMessageAlert = result => {
    switch (result) {
    case Composer.Sent:
      AlertIOS.alert(
        'Alert',
        'Message Sent!',
        [
          {text: 'OK', onPress: () => {}},
        ]
      );
      break;
    case Composer.Cancelled:
      AlertIOS.alert(
        'Alert',
        'User cancelled sending the message',
        [
          {text: 'OK', onPress: () => {}},
        ]
      );
      break;
    case Composer.Failed:
      AlertIOS.alert(
        'Alert',
        'Failed to send the message!',
        [
          {text: 'OK', onPress: () => {}},
        ]
      );
      break;
    case Composer.NotSupported:
      AlertIOS.alert(
        'Alert',
        'This device does not support sending texts',
        [
          {text: 'OK', onPress: () => {}},
        ]
      );
      break;
    default:
      AlertIOS.alert(
        'Alert',
        'Something unexpected happened!',
        [
          {text: 'OK', onPress: () => {}},
        ]
      );
      break;
    }
  }
  sendMessage = message => {
    Composer.composeMessageWithArgs(
      {
        'messageText': message,
        'recipients': this.state.selectedContacts.map(contact => contact.phoneNumbers[0].number),
      },
      result => this.handleMessageAlert(result)
    );
  }
  render() {
    if (this.state.contacts.length && !this.state.addingContacts) {
      let tripNameHeading;
      let editTripNameButtonText;
      const chosenContactsList = !this.state.selectedContacts.length ? 'None'
        : this.state.selectedContacts.map(contact => `${contact.givenName} ${contact.familyName} `);

      if (this.state.editingTripName) {
        tripNameHeading = (
          <TextInput
            onChangeText={tripName => this.setState({tripName})}
            value={this.state.tripName}
            style={styles.input}
          />
        );
        editTripNameButtonText = 'Done';
      } else {
        tripNameHeading = (
          <Text style={styles.headerTitle}>
            {this.state.tripName}
          </Text>
        );
        editTripNameButtonText = 'Edit';
      }

      return (
        <View style={styles.mainContainer}>
          <View style={styles.card}>
            <View style={styles.header}>
              {tripNameHeading}
              <TouchableHighlight onPress={() => this.setState({editingTripName: !this.state.editingTripName})}>
                <Text>
                  ({editTripNameButtonText})
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.container}>
              <Button
                text="Add Contacts"
                onPress={this.toggleAddingContacts}
              />
              <Text style={styles.title}>
                Chosen Contacts: {chosenContactsList}
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.header}>
              Send Message
            </Text>
            <Button
              text="We Have Liftoff!"
              onPress={this.sendMessage.bind(null, 'We Have Liftoff!')}
              disabled={!this.state.selectedContacts.length}
            />
            <Button
              text="The Eagle Has Landed!"
              onPress={this.sendMessage.bind(null, 'The Eagle Has Landed!')}
              disabled={!this.state.selectedContacts.length}
            />
          </View>
          <Button
            text="Save Trip"
            onPress={this.saveTrip}
          />
        </View>
      );
    } else if (this.state.contacts.length && this.state.addingContacts) {
      return (
        <ContactPicker
          contacts={this.state.contacts}
          addToSelectedContacts={this.addToSelectedContacts}
          toggleAddingContacts={this.toggleAddingContacts}
        />
      );
    }

    return (
      <ActivityIndicatorIOS
        animating
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    newTrip: state.appReducer.newTrip,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

NewTripAddContacts.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NewTripAddContacts);
