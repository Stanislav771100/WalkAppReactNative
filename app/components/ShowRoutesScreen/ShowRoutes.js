import React, { PropTypes, Component } from 'react';
import { StyleSheet, ImageBackground, Dimensions, Text } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import API from '../../services/api';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.437891;
const LONGITUDE = 32.060033;
const LATITUDE_DELTA = 0.0922;
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
      api: ''
    };
  }
  componentDidMount() {
    API.postRoutes({
      'x-api-key': this.props
    }).then(response => {
      console.log(response);
    });
  }
  render() {
    const { firstName, lastName, email } = this.props.user;
    return (
        
      <View style={styles.main}>
        <ImageBackground
          source={require('../../assets/images/giphy.gif')}
          style={{ width: '100%', height: '100%' }}>
          <View style={styles.content}>
            <View>
              <View>
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
                  {/* {this.props.coordinates.map((coordinate, index) => (
                    <MapView.Marker
                      key={`coordinate_${index}`}
                      coordinate={coordinate}
                    />
                  ))} */}
                  <MapView.Polyline
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    coordinates={this.state.coordinates}
                    strokeWidth={2}
                    strokeColor="red"
                  />
                </MapView>
              </View>
              <View>{/* Description */}</View>
              <View>{/* Icon and title */}</View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
