import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  ScrollView
} from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import API from '../../services/api';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.437891;
const LONGITUDE = 32.060033;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class ShowRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      issues: [],
      user: '',
      login: '',
      password: '',
      api: '',
      coordinates: [],
      routes: []
    };
  }
  componentDidMount() {
   
    this.getDirections('40.1884979, 29.061018', '41.0082,28.9784');
    console.log(this.props, 'f');
    API.getRoutes({
      'x-api-key': this.props.user.api
    }).then(res => {
      let newRoutes = this.state.routes.concat(res.data.walks);
      this.setState({
        routes: newRoutes
      });
      console.log(this.state.routes.coordinates.concat());
    });
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
    console.log(this.props, '1111111');
    const { firstName, lastName, email } = this.props.user;
    const origin = { latitude: 49.437891, longitude: 32.060033 };
    const destination = { latitude: 49.441298, longitude: 32.064704 };
    return (
      <View style={styles.containerRoutes}>
        <ScrollView>
          <View>
            {this.state.routes.map((route, i) => {
              return (
                <View style={styles.RoutesContainers} key={i}>
                  <View style={styles.miniMapContainer}>
                    <MapView
                      key={i}
                      style={styles.map}
                      provider={PROVIDER_GOOGLE}
                      initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                      }}>
                      {route.coordinates.map((coordinate, j) => (
                        <MapView.Marker
                          key={`coordinate_${j}`}
                          coordinate={coordinate}
                        />
                      ))}
                      <MapView.Polyline
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        coordinates={route.coordinates}
                        strokeWidth={2}
                        strokeColor="red"
                      />
                    </MapView>
                  </View>
                  <View style={styles.textContainers}>
                    <Text style={styles.typeStyle}>{route.type}</Text>
                    <Text style={styles.titleStyle}>{route.title}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  typeStyle: {
    fontSize: 20,
    fontWeight: '600'
  },
  titleStyle:{
   
  },
  textContainers: {
    display: 'flex',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'center'
  },
  RoutesContainers: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10
  },
  miniMapContainer: {
    width: '40%',
    height: 150
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps)(ShowRoutes);
