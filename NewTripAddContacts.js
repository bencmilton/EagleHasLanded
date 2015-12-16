'use strict';

import ContactPicker from './ContactPicker';
import Button from './Button';
import Contacts from 'react-native-contacts';
import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  ActivityIndicatorIOS,
  AlertIOS,
  TextInput,
} from 'react-native';

let Composer = require('NativeModules').RNMessageComposer;

class NewTripAddContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContacts: [],
      addingContacts: false,
      tripName: 'New Trip',
      editingTripName: false,
    }
  }
  componentDidMount() {
    Contacts.getAll((err, contacts) => {
      if (err && err.type === 'permissionDenied') {
        console.error(err);
      } else {
        this.setState({
          contacts: contacts.filter(contact => contact.phoneNumbers.length),
        })
      }
    })
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
    })
  }
  sendMessage = () => {
    Composer.composeMessageWithArgs(
      {
        'messageText':'The Eagle Has Landed!',
        'recipients': this.state.selectedContacts.map(contact => contact.phoneNumbers[0].number),
      },
      (result) => {
        switch(result) {
          case Composer.Sent:
            AlertIOS.alert(
              'Alert',
              'Message Sent!',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
              ]
            );
            break;
          case Composer.Cancelled:
            AlertIOS.alert(
              'Alert',
              'User cancelled sending the message',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
              ]
            );
            break;
          case Composer.Failed:
            AlertIOS.alert(
              'Alert',
              'Failed to send the message!',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
              ]
            );
            break;
          case Composer.NotSupported:
            AlertIOS.alert(
              'Alert',
              'This device does not support sending texts',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
              ]
            );
            break;
          default:
            AlertIOS.alert(
              'Alert',
              'Something unexpected happened!',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
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
      let tripName;
      let editTripNameButtonText;
      let chosenContactsList = 'None';
      if (this.state.selectedContacts.length) {
        sendButton = (
          <Button
            text='Send Message'
            onPress={this.sendMessage}
          />
        );
        chosenContactsList = this.state.selectedContacts.map(contact => `${contact.givenName} ${contact.familyName} `);
      };

      if (this.state.editingTripName) {
        tripName = (
          <TextInput
            onChangeText={(tripName) => this.setState({tripName})}
            value={this.state.tripName}
            style={styles.input}
          />
        );
        editTripNameButtonText = 'Done';
      } else {
        tripName = (
          <Text style={styles.headerTitle}>
            {this.state.tripName}
          </Text>
        );
        editTripNameButtonText = 'Edit';
      };

      return (
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            {tripName}
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
              text='Add Contacts'
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

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    marginTop: 65,
    alignItems: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 30,
  },
  headerTitle: {
    fontSize: 20,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 200,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#777777',
    backgroundColor: 'gray',
  },
});

export default NewTripAddContacts;
