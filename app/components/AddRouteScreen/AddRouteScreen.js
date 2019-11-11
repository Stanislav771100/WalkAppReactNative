import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  Button
} from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
export default class AddRouteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      coordinates: []
    };
  }
  onPressNext = () => {};
  render() {
    console.log(this.props.coordinates);
    return (
      <View style={styles.main}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Title"
          onChangeText={login => this.setState({ login })}
          value={this.props.title}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Description"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
        />

        <View style={styles.buttonContainerSingUp}>
          {Platform.OS == 'ios' ? (
            <Button onPress={this.onPressNext} title="Add Route" color="#FFF" />
          ) : (
            <Button onPress={this.onPressNext} title="Add Route" />
          )}
        </View>
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
