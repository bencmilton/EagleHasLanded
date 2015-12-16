'use strict';

import React, {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 650,
    padding: 15,
    marginTop: 45,
    alignItems: 'stretch',
  },
  scrollView: {
    height: 600,
  },
  list: {
    height: 600,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  input: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
