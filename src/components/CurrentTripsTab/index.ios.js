'use strict';

import React, {
  View,
  Text,
  Component,
  AsyncStorage,
  PropTypes,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import * as appActions from '../../actions/appActions';
import styles from './styles';

const propTypes = {
  currentTrips: PropTypes.array,
  loadAsyncStoreData: PropTypes.func.isRequired,

};

class CurrentTripsTab extends Component {
  componentDidMount() {
    if (!this.props.currentTrips.length) {
      AsyncStorage.getItem('currentTrips')
        .then(data => this.props.loadAsyncStoreData(JSON.parse(data)))
        .done();
    }
  }
  renderCurrentTrips = () => {
    return this.props.currentTrips.map((trip, idx) =>
      <View key={idx} style={styles.card}>
        <Text>Departure: {trip.departureLocation.description}</Text>
        <Text>Arrival: {trip.arrivalLocation.description}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Current Trips
        </Text>
        <View>
          { this.props.currentTrips.length ? this.renderCurrentTrips() : <Text>No Saved Trips</Text> }
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTrips: state.appReducer.currentTrips,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

CurrentTripsTab.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTripsTab);
