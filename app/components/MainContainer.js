import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Main from './MapScreen/Map';
import Profile from './ProfileScreen/Profile';
import AddRouteScreen from './AddRouteScreen/AddRouteScreen';

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
  AddRoute: {
    screen: AddRouteScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);
