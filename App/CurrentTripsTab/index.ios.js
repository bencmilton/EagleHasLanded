'use strict';

import React, {
  View,
  Text,
  Component
} from 'react-native';

import styles from './styles';

class CurrentTripsTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Current Trips
        </Text>
      </View>
    );
  }
}

export default CurrentTripsTab;
