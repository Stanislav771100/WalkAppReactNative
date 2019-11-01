/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { postLogin, getProjects } from '../services/api';
import { createUser } from '../services/api';
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

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      issues: [],
      user: '',
      email: '',
      password: '',
      checkPassword: '',
      lastname: '',
      firstname: '',
      emailCheked: true,
      passwordCheked: true,
      checkPasswordCheked: true,
      lastnameCheked: false,
      firstnameCheked: false
    };
  }
  checkPassword = () => {
    if (this.state.password === this.state.checkPassword) {
      this.setState({ checkPasswordCheked: false });
    } else {
      console.log('false');
    }
  };
  varifyEmail = () => {
    let regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
    let email = this.state.email;
    if (email.match(regexEmail)) {
      this.setState({ emailCheked: false });
    } else {
      console.log('false');
    }
  };
  varifyPassword = () => {
    let regexPassword = /(?=.*[a-z])(?=.*[A-Z]).{8,15}$/g;
    let password = this.state.password;
    if (password.match(regexPassword)) {
      this.setState({ passwordCheked: false });
    } else {
      console.log('false');
    }
  };

  registration = () => {
    console.log('d');
    API.createUser({
      email: this.state.email,
      password: this.state.password,
      lastName: this.state.lastname,
      firstName: this.state.firstname
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.dir(error);
      });
  };

  render() {
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require('../assets/images/314622.jpg')}
          style={{ width: '100%', height: '100%' }}>
          <View style={styles.content}>
            <TextInput
              onEndEditing={this.varify}
              style={styles.inputStyle}
              placeholder="Enter your Firstname"
              onChangeText={firstname => this.setState({ firstname })}
              value={this.state.firstname}
            />
            <TextInput
              onEndEditing={this.varify}
              style={styles.inputStyle}
              placeholder="Enter your Lastname"
              onChangeText={lastname => this.setState({ lastname })}
              value={this.state.lastname}
            />
            <TextInput
              onEndEditing={this.varifyEmail}
              style={
                this.state.emailCheked
                  ? styles.noVarifyinputStyle
                  : styles.inputStyle
              }
              placeholder="Enter your email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              keyboardType="email-address"
            />
            <TextInput
              onEndEditing={this.varifyPassword}
              style={
                this.state.passwordCheked
                  ? styles.noVarifyinputStyle
                  : styles.inputStyle
              }
              placeholder="Enter your password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry={true}
            />
            <TextInput
              onEndEditing={this.checkPassword}
              style={
                this.state.checkPasswordCheked
                  ? styles.noVarifyinputStyle
                  : styles.inputStyle
              }
              placeholder="Enter your password again"
              onChangeText={checkPassword => this.setState({ checkPassword })}
              value={this.state.checkPassword}
              secureTextEntry={true}
            />
            <View style={styles.buttonContainerSingIn}>
              {Platform.OS == 'ios' ? (
                <Button
                  onPress={this.registration}
                  title="Submit"
                  color="#FFF"
                />
              ) : (
                <Button onPress={this.registration} title="Submit" />
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
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20
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
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  noVarifyinputStyle: {
    height: 50,
    width: '80%',
    borderColor: '#ff7700',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  content: {
    height: '100%',
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
