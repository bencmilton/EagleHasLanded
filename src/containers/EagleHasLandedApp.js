'use strict';

import React, {
  Component,
  TabBarIOS,
} from 'react-native';

import NewTripTab from '../components/NewTripTab';
import CurrentTripsTab from '../components/CurrentTripsTab';

exports.framework = 'React';
exports.title = 'Eagle Has Landed';
exports.description = 'Geolocation API && EagleHasLanded.';

class EagleHasLanded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'newTrip',
    };
  }
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'newTrip'}
          icon={require('./car189.png')}
          title="New Trip"
          onPress={() => this.setState({selectedTab: 'newTrip'})}
        >
          <NewTripTab />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'currentTrips'}
          icon={require('./map32.png')}
          title="Current Trips"
          onPress={() => this.setState({selectedTab: 'currentTrips'})}
        >
          <CurrentTripsTab />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

export default EagleHasLanded;
