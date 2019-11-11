import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
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

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      showAddWalk: false,
      showAddBicycle: false,
      showAddCar: false,
      title: ''
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
      title: 'Walk'
    });
  };
  showAddBicycle = () => {
    this.setState({
      showAddBicycle: !this.state.showAddBicycle,
      title: 'Bicycle'
    });
  };
  showAddCar = () => {
    this.setState({
      showAddCar: !this.state.showAddCar,
      title: 'Car'
    });
  };
  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    // I am using Bursa,TR -> Istanbul,TR for this example
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
  render() {
    const origin = { latitude: 49.437891, longitude: 32.060033 };
    const destination = { latitude: 49.441298, longitude: 32.064704 };
    const { showAddBicycle, showAddCar, showAddWalk } = this.state;
    const onPressNext = () => {
      Actions.AddRouteScreen({
        coordinates: this.state.coordinates,
        title: this.state.title
      });
    };
    return (
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
                <Text style={{ textAlign: 'center', color: '#FFF' }}>Walk</Text>
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
              <TouchableOpacity style={styles.button} onPress={this.showAddCar}>
                <Image
                  source={require('../../assets/images/steering-wheel.png')}
                  style={styles.ImageIconStyle}
                />
                <Text style={{ textAlign: 'center', color: '#FFF' }}>Car</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.container}>
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
    );
  }
}

Main.propTypes = {
  provider: MapView.ProviderPropType
};

const styles = StyleSheet.create({
  addRouteButton: {
    flex: 1,
    width: '100%',
    height: 50,
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'green'
  },
  buttonMain: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'green',
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
