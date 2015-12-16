'use strict';

import React, {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    padding: 30,
    marginTop: 65,
    alignItems: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 30,
  },
  headerTitle: {
    fontSize: 20,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 200,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#777777',
    backgroundColor: 'gray',
  },
});
