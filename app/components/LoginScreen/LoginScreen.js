/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import API from '../../services/api';
import { StyleSheet, Button, TextInput, ImageBackground } from 'react-native';
import LoadScreen from '../../services/LoadScreen';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      issues: [],
      user: '',
      login: '',
      password: '',
      api: '',
      firstName: '',
      lastName: '',
      email: '',
      apiKey: '',
      textEmailError: '',
      emailValid: false,
      passwordValid: false,
      emailValidServer: false,
      id: '',
      loaded: false
    };
  }
  componentDidMount() {
    LoadScreen.load(b => this.setState({ loaded: true }));
  }
  singIn = () => {
    API.postLogin({
      email: this.state.login,
      password: this.state.password
    })
      .then(response => {
        this.setState({
          api: response.data.user.apiKey,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          id: response.data.user._id
        });

        const { api, firstName, lastName, email, id } = this.state;
        this.props.changeStateProp(
          'data',
          { api, firstName, lastName, email, id },
          'user'
        );
        Actions.MainContainer();
      })
      .catch(error => {
        this.setState({
          textEmailError: error.response.data.message,
          emailValidServer: !this.state.emailValidServer
        });
      });
  };
  varifyEmail = () => {
    let regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
    let email = this.state.login;
    if (email.match(regexEmail)) {
      this.setState({ emailValid: true });
    } else {
    }
  };
  varifyPassword = () => {
    let regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    let password = this.state.password;
    if (password.match(regexPassword)) {
      this.setState({ passwordValid: true });
    } else {
    }
  };
  render() {
    const onPressNext = () => {
      Actions.Registration();
    };

    return (
      <>
        {this.state.loaded === false ? (
          <ImageBackground
            source={require('../../assets/images/walk-cycle-15.gif')}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <View style={styles.main}>
            <ImageBackground
              source={require('../../assets/images/314622.jpg')}
              style={{ width: '100%', height: '100%' }}>
              <View style={styles.content}>
                <TextInput
                  autoCapitalize={false}
                  style={styles.inputStyle}
                  onEndEditing={this.varifyEmail}
                  placeholder="Enter your email"
                  onChangeText={login => this.setState({ login })}
                  value={this.state.login}
                />
                {this.state.login.length > 0 &&
                  this.state.emailValid === false && (
                    <>
                      <View style={styles.errorEmail}>
                        <Text style={{ textAlign: 'center', color: '#FFF' }}>
                          Email must contain '@' and '.'
                        </Text>
                      </View>
                    </>
                  )}
                {this.state.login.length > 0 && this.state.emailValidServer && (
                  <>
                    <View style={styles.errorEmail}>
                      <Text style={{ textAlign: 'center', color: '#FFF' }}>
                        {this.state.textEmailError}
                      </Text>
                    </View>
                  </>
                )}
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter your password"
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  autoCapitalize={false}
                  onEndEditing={this.varifyPassword}
                  secureTextEntry={true}
                />
                {this.state.password.length > 0 &&
                  this.state.passwordValid === false && (
                    <>
                      <View style={styles.errorPassword}>
                        <Text style={{ textAlign: 'center', color: '#FFF' }}>
                          Password must be at least 8 characters and must
                          contain uppercase, numbers
                        </Text>
                      </View>
                    </>
                  )}

                <View style={styles.buttonContainerSingIn}>
                  {Platform.OS === 'ios' ? (
                    <Button
                      onPress={this.singIn}
                      title="Sing In"
                      color="#FFF"
                    />
                  ) : (
                    <Button onPress={this.singIn} title="Sing In" />
                  )}
                </View>
                <View style={styles.buttonContainerSingUp}>
                  {Platform.OS === 'ios' ? (
                    <Button
                      onPress={onPressNext}
                      title="Sing Up"
                      color="#FFF"
                    />
                  ) : (
                    <Button onPress={onPressNext} title="Sing Up" />
                  )}
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  errorPassword: {
    height: 44,
    width: '80%',
    backgroundColor: '#d95555',
    marginTop: -5
  },
  errorEmail: {
    height: 22,
    width: '80%',
    backgroundColor: '#d95555',
    marginTop: -5
  },
  buttonContainerSingUp: {
    height: 50,
    width: '60%',
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
    ...Platform.select({
      ios: {
        backgroundColor: '#396146'
      },
      android: {}
    })
  },
  buttonContainerSingIn: {
    height: 50,
    width: '60%',
    borderColor: '#FFF',
    borderRadius: 5,
    marginTop: 60,
    padding: 5,
    ...Platform.select({
      ios: {
        backgroundColor: '#519668'
      },
      android: {}
    })
  },
  inputStyle: {
    height: 60,
    width: '80%',
    borderColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.8)',
    fontSize: 16
  },
  content: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
