'use strict';

import React, {
  View,
  Component,
  Text,
  PropTypes,
} from 'react-native';

import GooglePlacesSearchInput from '../../Common/GooglePlacesSearchInput';
import styles from './styles';

const propTypes = {
  header: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

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
    );
  }
}

SetLocation.propTypes = propTypes;

export default SetLocation;
