import * as types from './actionTypes';

export function saveLocationData(locationDateData) {
  return {
    type: types.SAVE_DATA_LOCATION_DATA,
    locationDateData,
  };
}

export function saveContactData(contactData) {
  return {
    type: types.SAVE_CONTACT_LOCATION_DATA,
    contactData,
  };
}

export function loadAsyncStoreData(savedTrips) {
  return {
    type: types.LOAD_ASYNC_STORAGE_DATA,
    savedTrips,
  };
}
