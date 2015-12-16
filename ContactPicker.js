'use strict';

import Button from './Button';
import React, {
  View,
  ScrollView,
  Component,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
} from 'react-native';

class ContactPicker extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.contacts),
      text: '',
    }
  }
  reformatPhoneNumber = number => {
    number = number.replace(/\D/g,'');
    number = number[0] === '1' ? number.slice(1, number.length) : number;
    const areaCode = number.slice(0, 3);
    const first3 = number.slice(3, 6);
    const last4 = number.slice(6);
    return `(${areaCode}) ${first3}-${last4}`;
  }
  renderRow = (rowData, sectionID, rowID) => {
    const phoneNum = this.reformatPhoneNumber(rowData.phoneNumbers[0].number);
    return (
      <TouchableHighlight onPress={() => this.props.addToSelectedContacts(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {`${rowData.givenName} ${rowData.familyName} - ${phoneNum}`}
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }
  filterContacts = text => {
    const filteredContacts = this.props.contacts.filter(contact => {
      if (contact.givenName && contact.givenName.toUpperCase().indexOf(text.toUpperCase()) > -1) {
        return contact;
      } else if (contact.familyName && contact.familyName.toUpperCase().indexOf(text.toUpperCase()) > -1) {
        return contact;
      } else {
        return false
      }
    });

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(filteredContacts),
      text: text,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.filterContacts}
          value={this.state.text}
          placeholder='Search'
        />
        <View style={styles.buttonRow}>
          <Button
            style={{marginLeft: 15}}
            text='Done Adding Contacts'
            onPress={this.props.toggleAddingContacts}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            style={styles.list}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 650,
    padding: 15,
    marginTop: 45,
    alignItems: 'stretch',
  },
  scrollView: {
    height: 600,
  },
  list: {
    height: 600,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  input: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default ContactPicker;
