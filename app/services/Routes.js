import { Container, Header, Tab, Tabs, TabHeading, Footer } from 'native-base';
import { StyleSheet } from 'react-native';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import Registration from '../components/RegistrationScreen/Registration';
import MainContainer from '../components/MainContainer';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import LoginScreenContainer from '../components/LoginScreen/LoginScreenContainer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddRouteScreen from '../components/AddRouteScreen/AddRouteScreen';
import ShowRoutes from '../components/ShowRoutesScreen/ShowRoutes';
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledTab: true,
      redirectToMain: false
    };
  }
  componentDidMount() {
    if (this.props.user && this.props.user.api) {
      this.setState({
        redirectToMain: true
      });
    } else {
    }
  }
  render() {
    return (
      <Router
        navigationBarStyle={{ backgroundColor: '#62c46a', height: 75 }}
        titleStyle={{ color: '#FFF', fontSize: 22 }}>
        <Scene key="root">
          <Scene
            key="LoginScreenContainer"
            component={LoginScreenContainer}
            title="Login"
          />
          <Scene
            key="AddRouteScreen"
            component={AddRouteScreen}
            title="Add Route"
          />
          <Scene
            key="Registration"
            title="Registration"
            component={Registration}
          />
          <Scene
            key="MainContainer"
            component={MainContainer}
            initial={this.state.redirectToMain}
            title="Walk App"
          />

          <Scene key="ShowRoutes" component={ShowRoutes} title="Show Routes" />
        </Scene>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    api: state
  };
}
export default connect(mapStateToProps)(Routes);
