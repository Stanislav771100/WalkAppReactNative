import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  ImageBackground,
  Text
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import LoginScreen from '../Containers/LoginScreen'
import LoginScreen from './LoginScreen';
import Registration from './Registration';
import { View } from 'native-base';
import { connect } from 'react-redux';
// import Main from './Main'
// import Screen2 from './Screen2';
// import Screen3 from './Screen3';

 class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      lastName: ''
    
    };
  }
  componentDidMount(){

  
  }
  render() {
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require('../assets/images/giphy.gif')}
          style={{ width: '100%', height: '100%' }}>
          <View style={styles.content}>
            <View style={styles.image} />
            <View style={styles.description}>
              <Text style={styles.firstName}>fwefwef</Text>
              <Text style={styles.lastName}>fewfwe</Text>
              <Text style={styles.email}>fwef@!fefwe</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffd152',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    marginTop: 50,
    marginBottom: 50,
    width: 150,
    height: 150,
    borderColor: '#AAA',
    borderWidth: 1

  },
  firstName: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '800'
  },
  lastName: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '800'
  },
  email: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '800'
  }
});
function mapStateToProps(state) {
  return {
    api: state
  };
}
export default connect(mapStateToProps)(Profile);
