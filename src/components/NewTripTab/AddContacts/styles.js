'use strict';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3B3738',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
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
