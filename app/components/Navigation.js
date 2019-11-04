// import { DrawerItems } from 'react-navigation-drawer';
import Main from './Map';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  ImageBackground,
  // SafeAreaView,
  TouchableOpacity
} from 'react-native';

import Drawer from 'react-native-drawer';

// import LoginScreen from './LoginScreen';

// Manifest of possible screens
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { DrawerItems, SafeAreaView } from 'react-navigation';
// import LoginScreen from '../Containers/LoginScreen'
import LoginScreen from './LoginScreen';
import Registration from './Registration';
import { View } from 'native-base';
import Profile from './Profile';
// import Main from './Main'
// import Screen2 from './Screen2';
// import Screen3 from './Screen3';

const AppNavigator = createDrawerNavigator(
  {
    Main: {
      screen: Main
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: 'Home'
  }
);
