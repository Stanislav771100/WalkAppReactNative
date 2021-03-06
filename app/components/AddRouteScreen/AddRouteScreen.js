/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { StyleSheet, ImageBackground, TextInput, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'native-base';
import API from '../../services/api';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoadScreen from '../../services/LoadScreen';

class AddRouteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      coordinates: [],
      type: '',
      loaded: this.props.loaded
    };
  }
  componentDidMount() {
    LoadScreen.load(b => this.setState({ loaded: true }));
  }

  addRoute = () => {
    API.postRoutes(
      {
        coordinates: this.props.coordinates,
        type: this.props.typeRoute,
        title: this.state.description
      },
      {
        'x-api-key': this.props.user.api
      }
    ).then(response => {
      Actions.MainContainer({ loaded: true });
    });
  };
  render() {
    console.log(this.props.coordinates, this.props.user.api);
    return (
      <>
        {this.state.loaded === false ? (
          <ImageBackground
            source={require('../../assets/images/walk-cycle-15.gif')}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <ImageBackground
            source={require('../../assets/images/rental-car-solar-eclipse-HERTZCANCEL0817.jpg')}
            style={{ width: '100%', height: '100%' }}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.main}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Title"
                onChangeText={type => this.setState({ type })}
                value={this.props.typeRoute}
              />
              <TextInput
                style={styles.inputStyleDescription}
                placeholder="Description"
                onChangeText={description => this.setState({ description })}
                value={this.state.description}
                multiline
                secureTextEntry={true}
              />

              <View style={styles.buttonContainerSingUp}>
                {Platform.OS === 'ios' ? (
                  <Button
                    onPress={this.addRoute}
                    title="Add Route"
                    color="#FFF"
                  />
                ) : (
                  <Button onPress={this.addRoute} title="Add Route" />
                )}
              </View>
            </View>
          </ImageBackground>
        )}
      </>
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
        backgroundColor: '#949494'
      },
      android: {}
    })
  },
  inputStyleDescription: {
    height: 200,
    width: '80%',
    borderColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.8)'
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
  main: {
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps)(AddRouteScreen);
