'use strict';

import React, {
  View,
  ScrollView,
  Component,
  ListView,
  TouchableHighlight,
  Text,
  TextInput,
  PropTypes,
} from 'react-native';

import Button from '../Button';
import styles from './styles';

const propTypes = {
  contacts: PropTypes.array.isRequired,
};

class ContactPicker extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.contacts),
      text: '',
    };
  }
  reformatPhoneNumber = number => {
    let formattedNumber = number.replace(/\D/g, '');
    formattedNumber = formattedNumber[0] === '1' ? formattedNumber.slice(1, formattedNumber.length) : formattedNumber;
    const areaCode = formattedNumber.slice(0, 3);
    const first3 = formattedNumber.slice(3, 6);
    const last4 = formattedNumber.slice(6);
    return `(${areaCode}) ${first3}-${last4}`;
  }
  filterContacts = text => {
    const filteredContacts = this.props.contacts.filter(contact => {
      if (contact.givenName && contact.givenName.toUpperCase().indexOf(text.toUpperCase()) > -1) {
        return contact;
      } else if (contact.familyName && contact.familyName.toUpperCase().indexOf(text.toUpperCase()) > -1) {
        return contact;
      } else {
        return false;
      }
    });

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(filteredContacts),
      text: text,
    });
  }
  renderRow = rowData => {
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
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.filterContacts}
          value={this.state.text}
          placeholder="Search"
        />
        <View style={styles.buttonRow}>
          <Button
            style={{marginLeft: 15}}
            text="Done Adding Contacts"
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
    );
  }
}

ContactPicker.propTypes = propTypes;

export default ContactPicker;
