'use strict';

import React, {
  View,
  Component,
  Text,
  TextInput,
} from 'react-native';

import GooglePlacesSearchInput from '../../Common/GooglePlacesSearchInput';
import styles from './styles';

class SetLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.header}
        </Text>
        <GooglePlacesSearchInput
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          placeholder={this.props.placeholder}
        />
      </View>
    )
  }
}

export default SetLocation;
