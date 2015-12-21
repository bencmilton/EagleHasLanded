'use strict';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  outerContainer: {
    alignItems: 'stretch',
    position: 'relative',
    flex: 1,
  },
  errorMessage: {
    backgroundColor: 'red',
    flexDirection: 'row',
    padding: 3,
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 2,
    backgroundColor: '#3B3738',
  },
  errorMessageText: {
    color: 'white',
    textAlign: 'center',
  },
  datePickerContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
  locationInputContainer: {
    alignItems: 'center',
    height: 600,
  },
  card: {
    height: 200,
    width: 250,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 10,
    margin: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'gray',
    textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});
