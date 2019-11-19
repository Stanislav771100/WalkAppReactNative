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
                    <Text>{route.type}</Text>
                    <Text>{route.title}</Text>
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
  containerRoutes: {
    width: '100%'
  },
  textContainers: {
    display: 'flex',
    alignItems: 'center'
  },
  RoutesContainers: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  miniMapContainer: {
    width: 150,
    height: 150
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  mapView: {
    height: 200,
    width: 200
  },
  main: {
    flex: 1,
    backgroundColor: '#ffd152',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    marginTop: 50,
    marginBottom: 50,
    width: 150,
    height: 150,
    borderColor: '#AAA',
    borderWidth: 1
  },
  firstName: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '800'
  },
  lastName: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '800'
  },
  email: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '800'
  }
});
const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps)(ShowRoutes);
