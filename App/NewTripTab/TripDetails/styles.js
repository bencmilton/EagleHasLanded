'use strict';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3B3738',
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
