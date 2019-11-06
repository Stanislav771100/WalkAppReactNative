import { Container, Header, Tab, Tabs, TabHeading, Footer } from 'native-base';
import { StyleSheet } from 'react-native';
import LoginScreen from '../components/LoginScreen';
import Registration from '../components/Registration';
import MainContainer from '../components/MainContainer';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreenContainer from '../components/LoginScreenContainer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      console.log('woegbfiqe', this.props.api.api);
      this.setState({
        redirectToMain: true
      })
    } else {
      console.log('false');
    }
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
            
            component={LoginScreenContainer}
            title="Login"
          />
          <Scene key="Registration" component={Registration} />
          <Scene
            key="MainContainer"
            component={MainContainer}
            initial={this.state.redirectToMain}
          />
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
