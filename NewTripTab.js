'use strict';

import NewTripDetails from './NewTripDetails';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

class NewTripTab extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
            title: 'New Trip: Details',
            component: NewTripDetails,
            backButtonTitle: 'Details',
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
});

export default NewTripTab;
