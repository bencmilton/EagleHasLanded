import * as types from '../actions/actionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
  newTrip: null,
  currentTrips: [],
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {

  case types.SAVE_DATA_LOCATION_DATA:
    return Object.assign({}, state, {
      newTrip: action.locationDateData,
    });

  case types.SAVE_CONTACT_LOCATION_DATA:
    const newTrip = state.newTrip;
    newTrip.contacts = action.contactData;
    const updatedTrips = [
      ...state.currentTrips,
      newTrip,
    ];
    AsyncStorage.setItem('currentTrips', JSON.stringify(updatedTrips));
    return Object.assign({}, state, {
      newTrip: null,
      currentTrips: updatedTrips,
    });

  case types.LOAD_ASYNC_STORAGE_DATA:
    return Object.assign({}, state, {
      currentTrips: action.savedTrips,
    });

  default:
    return state;
  }
}
