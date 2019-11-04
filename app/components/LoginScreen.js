/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import API from '../services/api';

import {
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  ImageBackground
} from 'react-native';
// import { connect } from 'react-redux';
// import { addLogin, addPassword } from '../services/Root/actions/place';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      issues: [],
      user: '',
      login: '',
      password: ''
    };
  }
  componentDidMount() {}
  singIn = () => {
    console.log('d');
    API.postLogin({
      email: this.state.login,
      password: this.state.password
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.dir(error);
      });
  };

  render() {
    const onPressNext = () => {
      Actions.Registration();
    };
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require('../assets/images/314622.jpg')}
          style={{ width: '100%', height: '100%' }}>
          <View style={styles.content}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter your email"
              onChangeText={login => this.setState({ login })}
              value={this.state.login}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter your password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry={true}
            />
            <View style={styles.buttonContainerSingIn}>
              {Platform.OS == 'ios' ? (
                <Button onPress={this.singIn} title="Sing In" color="#FFF" />
              ) : (
                <Button onPress={this.singIn} title="Sing In" />
              )}
            </View>
            <View style={styles.buttonContainerSingUp}>
              {Platform.OS == 'ios' ? (
                <Button onPress={onPressNext} title="Sing Up" color="#FFF" />
              ) : (
                <Button onPress={onPressNext} title="Sing Up" />
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainerSingUp: {
    height: 40,
    width: '50%',

    borderRadius: 5,
    marginTop: 20,
    ...Platform.select({
      ios: {
        backgroundColor: '#c4a500'
      },
      android: {}
    })
  },
  buttonContainerSingIn: {
    height: 40,
    width: '50%',
    borderColor: '#FFF',
    borderRadius: 5,
    marginTop: 20,

    ...Platform.select({
      ios: {
        backgroundColor: '#e3c13b'
      },
      android: {}
    })
  },
  inputStyle: {
    height: 50,
    width: '80%',
    borderColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  content: {
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// const mapStateToProps = state => {
//   return {
//     login: state.login.login,
//     password: state.password.password
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     add: name => {
//       dispatch(addLogin(name));
//     },
//     delete: index => {
//       dispatch(addPassword(index));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LoginScreen);
