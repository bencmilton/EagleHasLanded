'use strict';

import React, {
  Component,
  NavigatorIOS,
} from 'react-native';

import TripDetails from './TripDetails';
import styles from './styles';

class NewTripTab extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
          title: 'New Trip: Details',
          component: TripDetails,
          backButtonTitle: 'Details',
        }}
      />
    );
  }
}

export default NewTripTab;
