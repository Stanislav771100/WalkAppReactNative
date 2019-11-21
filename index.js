/**
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';

import configureStore from './app/services/store';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
