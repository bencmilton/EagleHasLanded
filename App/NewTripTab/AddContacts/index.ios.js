'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicatorIOS,
  AlertIOS,
  TextInput,
} from 'react-native';

import Contacts from 'react-native-contacts';
import ContactPicker from '../../Common/ContactPicker';
import Button from '../../Common/Button';
import styles from './styles';

const Composer = require('NativeModules').RNMessageComposer;

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
  sendMessage = () => {
    Composer.composeMessageWithArgs(
      {
        'messageText': 'The Eagle Has Landed!',
        'recipients': this.state.selectedContacts.map(contact => contact.phoneNumbers[0].number),
      },
      (result) => {
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
    );
  }
  render() {
    if (this.state.contacts.length && !this.state.addingContacts) {
      let sendButton;
      let tripNameHeading;
      let editTripNameButtonText;
      let chosenContactsList = 'None';
      if (this.state.selectedContacts.length) {
        sendButton = (
          <Button
            text="Send Message"
            onPress={this.sendMessage}
          />
        );
        chosenContactsList = this.state.selectedContacts.map(contact => `${contact.givenName} ${contact.familyName} `);
      }

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
          <View style={styles.header}>
            {tripNameHeading}
            <TouchableHighlight onPress={() => this.setState({editingTripName: !this.state.editingTripName})}>
              <Text>
                ({editTripNameButtonText})
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>
              Chosen Contacts: {chosenContactsList}
            </Text>
            <Button
              text="Add Contacts"
              onPress={this.toggleAddingContacts}
            />
            {sendButton}
          </View>
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
    } else {
      return (
        <ActivityIndicatorIOS
          animating={true}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      );
    }
  }
}

export default NewTripAddContacts;
