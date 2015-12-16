'use strict';

import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';
import React, {
  View,
  Component,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

class SetLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.header}
        </Text>
        <GooglePlacesAutocomplete
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          placeholder={this.props.placeholder}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 200,
    marginBottom: 50,
    flexDirection: 'column',
  },
  text: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default SetLocation;
