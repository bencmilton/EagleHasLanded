'use strict';

import React, {
  Component,
  NavigatorIOS,
} from 'react-native';

import NewTripDetails from './TripDetails';
import styles from './styles';

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

export default NewTripTab;
