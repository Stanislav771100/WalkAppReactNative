import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Footer } from 'native-base';
import { StyleSheet } from 'react-native';
import LoginScreen from '../components/LoginScreen';
import Registration from '../components/Registration';
import MainContainer from '../components/MainContainer';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreenContainer from '../components/LoginScreenContainer';
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
          <Scene
            key="LoginScreenContainer"
            initial={true}
            component={LoginScreenContainer}
            title="Login"
          />
          <Scene key="Registration" component={Registration} />
          <Scene key="MainContainer" component={MainContainer} />
        </Scene>
      </Router>
    );
  }
}
