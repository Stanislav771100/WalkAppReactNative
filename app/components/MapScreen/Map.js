import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.437891;
const LONGITUDE = 32.060033;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyByQD8cPv4oAcyCvuvLPIYM5K-gjxhHX0A';
import Polyline from '@mapbox/polyline';
import LoadScreen from '../../services/LoadScreen';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      showAddWalk: false,
      showAddBicycle: false,
      showAddCar: false,
      title: '',
      typeRoute: '',
      spinner: false,
      loaded: false
    };

    this.mapView = null;
  }
  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
    });
  };
  showAddWalk = () => {
    this.setState({
      showAddWalk: !this.state.showAddWalk,
      title: 'Walk',
      typeRoute: 'Walk'
    });
  };
  showAddBicycle = () => {
    this.setState({
      showAddBicycle: !this.state.showAddBicycle,
      title: 'Bicycle',
      typeRoute: 'Bicycle'
    });
  };
  showAddCar = () => {
    this.setState({
      showAddCar: !this.state.showAddCar,
      title: 'Car',
      typeRoute: 'Car'
    });
  };
  componentDidMount() {
    LoadScreen.load(b => this.setState({ loaded: true }));
    this.getDirections('40.1884979, 29.061018', '41.0082,28.9784');
  }
  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&mode=${'DRIVING'}&key=AIzaSyByQD8cPv4oAcyCvuvLPIYM5K`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords: coords });
      return coords;
    } catch (error) {
      return error;
    }
  }
  backButton = () => {
    this.setState({
      coordinates: this.state.coordinates.slice(0, -1)
    });
  };

  render() {
    const origin = { latitude: 49.437891, longitude: 32.060033 };
    const destination = { latitude: 49.441298, longitude: 32.064704 };
    const { showAddBicycle, showAddCar, showAddWalk } = this.state;
    const onPressNext = () => {
      Actions.AddRouteScreen({
        coordinates: this.state.coordinates,
        title: this.state.title,
        typeRoute: this.state.typeRoute,
        loaded: false
      });
    };
    return (
      <>
        {this.state.loaded === false ? (
          <ImageBackground
            source={require('../../assets/images/Un8o.gif')}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.buttonMain}>
              {showAddBicycle === false && showAddCar === false && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.showAddWalk}>
                    <Image
                      source={require('../../assets/images/sneaker.png')}
                      style={styles.ImageIconStyle}
                    />
                    <Text style={{ textAlign: 'center', color: '#FFF' }}>
                      Walk
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {showAddWalk === false && showAddCar === false && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.showAddBicycle}>
                    <Image
                      source={require('../../assets/images/bike-of-a-gymnast.png')}
                      style={styles.ImageIconStyle}
                    />
                    <Text style={{ textAlign: 'center', color: '#FFF' }}>
                      Bicycle
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {showAddWalk === false && showAddBicycle === false && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.showAddCar}>
                    <Image
                      source={require('../../assets/images/steering-wheel.png')}
                      style={styles.ImageIconStyle}
                    />
                    <Text style={{ textAlign: 'center', color: '#FFF' }}>
                      Car
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.container}>
              <TouchableOpacity
                onPress={this.backButton}
                style={styles.backButton}>
                <Image
                  source={require('../../assets/images/back-arrow.png')}
                  style={styles.ImageIconStyle}
                />
              </TouchableOpacity>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude: LATITUDE,
                  longitude: LONGITUDE,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                }}
                onPress={this.onMapPress}
                ref={c => (this.mapView = c)}>
                {this.state.coordinates.map((coordinate, index) => (
                  <MapView.Marker
                    key={`coordinate_${index}`}
                    coordinate={coordinate}
                  />
                ))}
                <MapView.Polyline
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                  coordinates={this.state.coordinates}
                  strokeWidth={2}
                  strokeColor="red"
                />
              </MapView>
              {(showAddWalk || showAddBicycle || showAddCar) && (
                <View style={styles.addRouteButton}>
                  {Platform.OS == 'ios' ? (
                    <Button
                      onPress={onPressNext}
                      title="Add Route"
                      color="#FFF"
                      heigh="100"
                    />
                  ) : (
                    <Button onPress={onPressNext} title="Add Route" />
                  )}
                </View>
              )}
            </View>
          </View>
        )}
      </>
    );
  }
}

Main.propTypes = {
  provider: MapView.ProviderPropType
};

const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    position: 'absolute',
    backgroundColor: '#dbc604',
    zIndex: 1000
  },
  addRouteButton: {
    flex: 1,
    width: '100%',
    height: 50,
    position: 'absolute',
    zIndex: 1001,
    backgroundColor: '#35523e'
  },
  buttonMain: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#519668',
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 50,
    width: 50
  },
  ImageIconStyle: {
    height: 50,
    width: 50
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

AppRegistry.registerComponent('Main', () => Main);
