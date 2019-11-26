import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { View } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from 'react-native-material-textfield';
import { connect } from 'react-redux';
import API from '../../services/api';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.437891;
const LONGITUDE = 32.060033;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Profile extends Component {
  constructor(props) {
    super(props);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.state = {
      projects: [],
      issues: [],
      user: '',
      login: '',
      password: '',
      api: '',
      coordinates: [],
      routes: [],
      id: [],
      users: [],
      avatarSource: null,
      editable: false,
      editProfileTitle: 'Edit Profile',
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email
    };
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  componentDidMount() {
    this.getDirections('40.1884979, 29.061018', '41.0082,28.9784');
    API.getRoutes({ 'x-api-key': this.props.user.api }).then(res => {
      let newRoutes = this.state.routes.concat(res.data.walks);
      let filerRoutes = newRoutes.filter(
        item => item.createdBy.email === this.props.user.email
      );

      this.setState({
        routes: filerRoutes
      });
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
  editProfile = () => {
    if (this.state.editProfileTitle === 'Edit Profile') {
      this.setState({
        editable: true,
        editProfileTitle: 'Save'
      });
    } else if (this.state.editProfileTitle === 'Save') {
      this.setState({
        editable: false,
        editProfileTitle: 'Edit Profile'
      });
      API.updateUser(
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email
        },
        this.props.user.id,
        { 'x-api-key': this.props.user.api }
      ).then(res => {
        const { firstName, lastName, email } = this.state;
        this.props.changeStateProp('data', res.data.user, 'main');
        this.setState({
          isEdit: false,
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email
        });
      });
    }
  };
  render() {
    const {
      editable,
      editProfileTitle,
      avatarSource,
      routes,
      firstName,
      lastName,
      email
    } = this.state;
    return (
      <View style={styles.main}>
        <View style={styles.backgroundColor}>
          <ScrollView>
            <View style={styles.content}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View
                  style={[
                    styles.avatar,
                    styles.avatarContainer,
                    { marginBottom: 20 }
                  ]}>
                  {avatarSource === null ? (
                    <Text>Select a Photo</Text>
                  ) : (
                    <Image style={styles.avatar} source={avatarSource} />
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.description}>
                <TextField
                  editable={editable}
                  onChangeText={firstName => {
                    this.setState({ firstName });
                  }}
                  value={firstName}
                />
                <TextField
                  editable={editable}
                  onChange={e => this.setState({ lastName: e.target.value })}
                  value={lastName}
                />
                <TextField
                  editable={editable}
                  onChange={e => this.setState({ email: e.target.value })}
                  value={email}
                />
              </View>
            </View>
            <View style={styles.profileEdit}>
              <View style={styles.buttonContainerEditProfile}>
                {Platform.OS == 'ios' ? (
                  <Button
                    onPress={this.editProfile}
                    title={editProfileTitle}
                    color="#FFF"
                  />
                ) : (
                  <Button onPress={this.deleteRoute} title="Delete" />
                )}
              </View>
            </View>
            <View style={styles.containerRoutes}>
              <View>
                {routes.map((route, i) => {
                  return (
                    <View style={styles.RoutesContainers} key={i}>
                      <View style={styles.textContainers}>
                        <Text style={styles.typeStyle}>{route.type}</Text>
                        <Text style={styles.titleStyle}>{route.title}</Text>
                        <View style={styles.buttonsContainer}>
                          <View style={styles.buttonContainerSingIn}>
                            {Platform.OS == 'ios' ? (
                              <Button
                                onPress={this.singIn}
                                title="Edit"
                                color="#FFF"
                              />
                            ) : (
                              <Button onPress={this.singIn} title="Edit" />
                            )}
                          </View>
                          <View style={styles.buttonContainerSingIn}>
                            {Platform.OS == 'ios' ? (
                              <Button
                                onPress={this.deleteRoute}
                                title="Delete"
                                color="#FFF"
                              />
                            ) : (
                              <Button
                                onPress={this.deleteRoute}
                                title="Delete"
                              />
                            )}
                          </View>
                        </View>
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  description: {
    width: '50%'
  },
  backgroundColor: {
    backgroundColor: '#DDD'
  },
  profileEdit: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  buttonsContainer: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainerEditProfile: {
    height: 40,
    width: '45%',
    borderColor: '#FFF',
    borderRadius: 5,
    marginTop: 20,

    ...Platform.select({
      ios: {
        backgroundColor: '#292929'
      },
      android: {}
    })
  },
  buttonContainerSingIn: {
    height: 40,
    width: '45%',
    borderColor: '#FFF',
    borderRadius: 5,
    marginTop: 20,

    ...Platform.select({
      ios: {
        backgroundColor: '#292929'
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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  RoutesContainers: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
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
  },
  main: {
    flex: 1,
    backgroundColor: '#ffd152',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    height: 200,
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

export default connect(mapStateToProps)(Profile);
