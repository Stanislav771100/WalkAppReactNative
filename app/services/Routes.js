/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import Registration from '../components/RegistrationScreen/Registration';
import MainContainer from '../components/MainContainer';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreenContainer from '../components/LoginScreen/LoginScreenContainer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
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
            renderBackButton={() => null}
            renderLeftButton={() => null}
            title="Add Route"
            back={false}
          />
          <Scene
            key="Registration"
            title="Registration"
            component={Registration}
            renderBackButton={() => null}
            renderLeftButton={() => null}
          />
          <Scene
            key="MainContainer"
            component={MainContainer}
            initial={this.state.redirectToMain}
            title="Walk App"
            tabBarStyle={styles.tabBarStyle}
          />

          <Scene
            key="ShowRoutes"
            renderBackButton={() => null}
            renderLeftButton={() => null}
            component={ShowRoutes}
            title="Show Routes"
            back={false}
          />
        </Scene>
      </Router>
    );
  }
}
const styles = StyleSheet.create({
  tabStyle: {
    borderRightWidth: 1,
    borderColor: '#b7b7b7'
    // backgroundColor:'pink'
  }
});
function mapStateToProps(state) {
  return {
    api: state
  };
}
export default connect(mapStateToProps)(Routes);
