'use strict';

import React, {
  View,
  Component,
  Text,
  PropTypes,
} from 'react-native';

import GooglePlacesSearchInput from '../../../../Common/GooglePlacesSearchInput';
import Button from '../../../../Common/Button';
import styles from './styles';

const propTypes = {
  header: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

class SetLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.header}
        </Text>
        <Button
          style={styles.button}
          text="Done"
          onPress={this.props.done}
        />
        <GooglePlacesSearchInput
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

SetLocation.propTypes = propTypes;

export default SetLocation;
