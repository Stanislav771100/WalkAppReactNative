import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions, Text, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyByQD8cPv4oAcyCvuvLPIYM5K-gjxhHX0A';
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
            }}>
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
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
