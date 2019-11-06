import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Main from './Map';
import Profile from './Profile';

export default class MainContainer extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createDrawerNavigator({
  Map: {
    screen: Main
  },
  Profile: {
    screen: Profile
  }
});

const AppContainer = createAppContainer(AppNavigator);
