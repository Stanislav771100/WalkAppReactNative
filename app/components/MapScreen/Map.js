import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions, Text, View } from 'react-native';
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
      coordinates: [
        {
          latitude: 49.437891,
          longitude: 32.060033
        },
        {
          latitude: 49.441298,
          longitude: 32.064704
        }
      ]
    };

    this.mapView = null;
  }
  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
    });
  };

  render() {
    const origin = { latitude: 49.437891, longitude: 32.060033 };
    const destination = { latitude: 49.441298, longitude: 32.064704 };

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: 'gray',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
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
            <Polyline
              coordinates={this.state.coordinates}
              strokeWidth={2}
              strokeColor="red"
            />
          </MapView>
        </View>
      </View>
    );
  }
}

Main.propTypes = {
  provider: MapView.ProviderPropType
};

const styles = StyleSheet.create({
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
