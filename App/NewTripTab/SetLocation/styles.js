'use strict';

import React, {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 50,
    width: 200,
    marginBottom: 50,
    flexDirection: 'column',
  },
  text: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
