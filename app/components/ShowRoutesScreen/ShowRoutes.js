/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Picker,
  RefreshControl,
  ListView
} from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import API from '../../services/api';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.437891;
const LONGITUDE = 32.060033;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class ShowRoutes extends Component {
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
      routes: [],
      newRoutes: [],
      defaultRoutes: [],
      showAddWalk: false,
      showAddBicycle: false,
      showAddCar: false,
      page: 1,
      limit: 10,
      hasMore: true,
      createBy: []
    };
  }

  componentDidMount() {
    this.getDirections('40.1884979, 29.061018', '41.0082,28.9784');

    API.getRoutes({
      'x-api-key': this.props.user.api
    }).then(res => {
      let newRoutes = this.state.routes.concat(res.data.walks);
      this.setState({
        routes: newRoutes,
        defaultRoutes: newRoutes
      });
    });
  }

  deleteRoute = () => {
    API.delete(
      {
        routes: this.state.routes
      },
      {
        'x-api-key': this.props.user.api
      }
    )
      .then(res => {
        const routes = res.data.walks;
        this.setState(routes);
      })
      .catch(error => {});
  };

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
  showAddWalk = () => {
    let newRoutes = this.state.defaultRoutes;
    let filerRoutes = newRoutes.filter(item => item.type === 'Walk');

    this.setState({
      routes: filerRoutes
    });
  };
  showAddBicycle = () => {
    let newRoutes = this.state.defaultRoutes;
    let filerRoutes = newRoutes.filter(item => item.type === 'Bicycle');

    this.setState({
      routes: filerRoutes
    });
  };
  showAddCar = () => {
    let newRoutes = this.state.defaultRoutes;
    let filerRoutes = newRoutes.filter(item => item.type === 'Car');

    this.setState({
      routes: filerRoutes
    });
  };
  fetchMoreData = () => {
    const { page, limit } = this.state;
    API.getRoutes(
      { 'x-api-key': this.props.user.api },
      {
        page: page + 1,
        limit: limit
      }
    ).then(res => {
      if (res) {
        let newRoutes = this.state.routes.concat(res.data.walks);
        let totalPages = res.config.headers['x-total-pages'];
        this.setState({
          routes: newRoutes,
          page: this.state.page + 1,
          hasMore: parseInt(this.state.page + 1, 10) <= totalPages
        });
      } else {
        this.setState({
          fetching: false,
          page: this.state.page - 1
        });
      }
    });
  };
  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }

  render() {
    const { showAddBicycle, showAddCar, showAddWalk } = this.state;
    return (
      <View style={{ backgroundColor: '#DDD' }}>
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
              this.fetchMoreData();
            }
          }}>
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
          <View style={styles.containerRoutes}>
            <View>
              {this.state.routes.map((route, i) => {
                return (
                  <View style={styles.RoutesContainers} key={i}>
                    <View style={styles.textContainers}>
                      <Text style={styles.typeStyle}>{route.type}</Text>
                      <Text style={styles.titleStyle}>{route.title}</Text>
                    </View>
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
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonMain: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#292929',
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
  buttonsContainer: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainerSingIn: {
    height: 40,
    width: '45%',
    borderColor: '#FFF',
    borderRadius: 5,
    marginTop: 20,

    ...Platform.select({
      ios: {
        backgroundColor: '#396146'
      },
      android: {}
    })
  },
  typeStyle: {
    fontSize: 20,
    fontWeight: '600'
  },
  titleStyle: {
    textAlign: 'center'
  },
  textContainers: {
    display: 'flex',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'center'
  },
  containerRoutes: {
    marginTop: 20,
    backgroundColor: '#DDD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  RoutesContainers: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden'
  },
  miniMapContainer: {
    width: '40%',
    height: 120
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
