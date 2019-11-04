import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Footer } from 'native-base';
import { StyleSheet } from 'react-native';
import LoginScreen from '../components/LoginScreen';
import Registration from '../components/Registration';
import MainContainer from '../components/MainContainer';
import { Router, Scene } from 'react-native-router-flux';
export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledTab: true
    };
  }
  render() {
    return (
      <Router
        navigationBarStyle={{ backgroundColor: '#e3c13b', height: 75 }}
        titleStyle={{ color: '#FFF', fontSize: 22 }}
        sceneStyle={{ color: 'FFF' }}>
        <Scene key="root">
          <Scene key="LoginScreen" component={LoginScreen} title="Login" />
          <Scene key="Registration" component={Registration} />
          <Scene key="MainContainer" component={MainContainer} initial={true} />
        </Scene>
      </Router>
    );
  }
}
