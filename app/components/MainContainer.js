import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Main from './MapScreen/Map';
import Profile from './ProfileScreen/Profile';
import ShowRoutes from './ShowRoutesScreen/ShowRoutes';

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
  },
  ShowRoutes: {
    screen: ShowRoutes
  }
});

const AppContainer = createAppContainer(AppNavigator);
