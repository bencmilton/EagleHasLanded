import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux/native';

import * as reducers from '../reducers';
import EagleHasLandedApp from './EagleHasLandedApp';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <EagleHasLandedApp />}
      </Provider>
    );
  }
}

export default App;
