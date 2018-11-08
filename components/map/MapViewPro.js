import React from 'react';
import { View, Text, PixelRatio, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Input, Button, Icon, Overlay } from 'react-native-elements'
import { mapConstants } from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { connect } from 'react-redux';
import { locationWatcher, showUser, regionWatcher, meanOfTransportation } from '../../redux/action';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const {
  topHorizontalMargin,
  homeMargin,
  gradientColor,
  screenWidth,
  screenHeight,
  iconSize,
  radiusBorder,
  topMargin,
  gradientColorButton
} = mapConstants;

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getDirections = this.getDirections.bind(this);
    this.mapHomeHandler = this.mapHomeHandler.bind(this);
    this.vehicleHandler = this.vehicleHandler.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
    this.followUserLocation = this.followUserLocation.bind(this);
    this.returnVehicle = this.returnVehicle.bind(this);
    //this.regionChangeHandler = this.regionChangeHandler.bind(this);
    this.counter = 0;
    this.state = {
      isVisible: false,
      activePosition: 'unknown',
      initialPosition: '0,0',
      locationCoordinates: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 1.00,
        longitudeDelta: 1.00,
      },
      coords: [],
      carTime: 0,
      myOwnCounter: 0,
      myOwnCounterHandler: false,
      navigatorColor: '#f96e3b',
      vehicleColor: 0,
      buttonName: '',
    }
  }

  async componentDidMount() {
    console.log('DidMount of MapScreen');
    console.log(this.props.shouldShowUser);
    const tempCoords = {
      latitude: this.props.currentLocation.latitude,
      longitude: this.props.currentLocation.longitude,
      latitudeDelta: this.props.currentLocation.latitudeDelta,
      longitudeDelta: this.props.currentLocation.longitudeDelta,
    };
    this.props.regionWatcher(tempCoords);
    const x = '' + this.props.currentLocation.latitude + ',' + this.props.currentLocation.longitude;
    await this.getDirections(x, "37.621499,-122.378722");
  }

  componentWillUpdate(prevProps) {

    if (this.props.shouldShowUser === true && prevProps.currentRegion === this.props.currentRegion) {
      var tempCoords = {
        latitude: this.props.currentLocation.latitude,
        longitude: this.props.currentLocation.longitude,
        latitudeDelta: this.props.currentLocation.latitudeDelta,
        longitudeDelta: this.props.currentLocation.longitudeDelta,
      }
      this.props.regionWatcher(tempCoords);
    }
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyAp2Tsn6VYb9usOjqeRXF59MWEhWwQHFy0`);
      let respStringified = JSON.stringify(resp);
      let respJson = await resp.json();
      console.log('Fetched JSON');
      console.log(respJson);
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      console.log('points are');
      console.log(points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      this.setState({ carTime: respJson.routes[0].legs[0].duration.text })
      return coords
    } catch (error) {
      //alert('There is no way to go there by car.')
      return error
    }
  }

  onMapReady = () => {
    this.setState({ navigatorColor: 'gray' })
    if (this.state.myOwnCounter === 0) {
      this.map.animateToRegion(this.props.currentRegion, 0.01);
    }
    const myOwnCounter = this.state.myOwnCounter
    this.setState({ myOwnCounter: myOwnCounter + 1 })
  }

  followUserLocation(region) {
    const x = '' + this.props.currentLocation.latitude + ',' + this.props.currentLocation.longitude;
    this.getDirections(x, "37.621499,-122.378722");
  }

  mapHomeHandler() {
    console.log('HomeHandler!');
    this.props.showUser(false);
    this.setState({ navigatorColor: '#f96e3b' })
    this.setState({ myOwnCounter: 0 })
  }

  vehicleHandler(vehicle) {
    this.props.meanOfTransportation(vehicle);
    if (vehicle === 'car') {
      this.setState({ vehicleColor: 1 })
      this.setState({ buttonName: 'Car' })
    }
    else if (vehicle === 'transit') {
      this.setState({ vehicleColor: 2 })
      this.setState({ buttonName: 'Transit' })
    }
  }

  returnVehicle() {
    if (this.props.vehicle === 'car') {
      return (
        <View style={styles.pressedContainerStyle} >
          <View style={{ flex: 1, flexDirection: 'row' }} >
            <Icon
              name='car'
              type="font-awesome"
              size={20}
              color='#f96e3b'
              underlayColor="transparent"
            />
            <Text style={{ marginLeft: 10, marginTop: 4, color: 'white' }} >
              {this.state.carTime}
            </Text>
          </View>
        </View>
      )
    }
    else if (this.props.vehicle === 'transit') {
      return (
        <View style={styles.pressedBusContainerStyle} >
          <View style={{ flex: 1, flexDirection: 'row' }} >
            <Icon
              name='bus-clock'
              type='material-community'
              size={20}
              color='#f96e3b'
              underlayColor="transparent"
            />
            <Text style={{ marginLeft: 10, marginTop: 4, color: 'white' }} >
              2h 18min
            </Text>
          </View>
        </View>
      )

    }
  }

  render() {
    const ButtonText = 'Go by' + ' ' + this.state.buttonName;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          containerStyle={{
            zIndex: 999,
            shadowColor: 'black',
            shadowRadius: 12,
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 0.7,
          }}
          borderRadius={20}
          width={screenWidth * 9 / 10}
          height={screenHeight / 2}
        >
          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: 'row', alignItems: 'center' }} >
            <Image
              source={require('../../screens/images/TurkishAirlinesLogo.png')}
              style={{ borderRadius: 20, width: 42, height: 42 }}
            />
            <View>
              <Text style={{ marginLeft: 10, fontSize: 18, fontFamily: 'Raleway-Light' }} >Turkish Airlines</Text>
            </View>
            <View>
              <Text style={{ marginLeft: 30, fontSize: 20, fontFamily: 'Raleway-Light' }} >ADB-LAX</Text>
            </View>
          </View>
          <View style={{ marginTop: 25, flexDirection: 'column', alignItems: 'center' }} >
            <Text style={{ marginLeft: 5, fontSize: 18, fontFamily: 'Raleway-Light' }} >
              Flight Number: TK 0012
              </Text>
            <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 18, fontFamily: 'Raleway-Light' }} >
              Class: Economy
              </Text>
            <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 18, fontFamily: 'Raleway-Light' }} >
              Boarding Time: 04:14 AM, 5 Oct 2018
              </Text>
            <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 18, fontFamily: 'Raleway-Light' }} >
              Arrival Time: 16:14 AM, 6 Oct 2018
              </Text>
            <View style={{ flexDirection: 'row' }} >
              <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 18, fontFamily: 'Raleway-Light' }} >
                Stops:
                </Text>
              <Text style={{ marginTop: 5, color: '#d83636', marginLeft: 5, fontSize: 18, fontFamily: 'Raleway-Light' }} >
                2 Stops
                </Text>
              <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 18, fontFamily: 'Raleway-Light' }} >
                IST, FRA
                </Text>
            </View>
            <View style={{ marginTop: 50, flexDirection: 'column', alignItems: 'center' }} >
              <Text style={{ marginTop: 5, fontSize: 22, fontFamily: 'Raleway-Light' }} >
                You paid this ticket:
                </Text>
              <Text style={{ fontSize: 20, fontFamily: 'Raleway-Light' }} >
                2260.22 PHC
                </Text>
              <Text style={{ fontSize: 16, fontFamily: 'Raleway-Light' }} >
                $270
                </Text>
            </View>
          </View>
        </Overlay>
        <Icon
          name='my-location'
          type='material'
          size={36}
          color={this.state.navigatorColor}
          onPress={() => this.mapHomeHandler()}
          underlayColor="transparent"
          containerStyle={{
            right: 10,
            bottom: 50,
            position: 'absolute',
            zIndex: 998,
          }}
        />
        <View style={{
          flex: 1,
          shadowColor: 'black',
          shadowRadius: 4,
          shadowOffset: { height: 5, width: 0 },
          shadowOpacity: 0.4,
        }} >
          <LinearGradient
            colors={gradientColor}
            start={{ x: 0.0, y: -1.0 }} end={{ x: 0.13, y: 1.2 }}
            locations={[0.2, 0.8, 1.0]}
          >
            <View style={{
              marginTop: screenHeight / 12,
              flexDirection: 'column',
              alignItems: 'center',
              height: screenHeight / 4 + screenHeight / 14,
            }} >
              <Text style={{ fontSize: PixelRatio.roundToNearestPixel(screenHeight / 24), fontFamily: 'Raleway-Light', marginTop: 0, color: 'white' }} >
                Your Trip
              </Text>
              <Text style={{ fontFamily: 'Raleway-Light', color: 'white', fontSize: PixelRatio.roundToNearestPixel(screenHeight / 48) }} >
                The probability of reaching your current flight
              </Text>
              <Text style={{ fontFamily: 'Raleway-Light', color: 'white', fontSize: PixelRatio.roundToNearestPixel(screenHeight / 40) }} >
                %35.6
              </Text>
              <Text style={{ marginTop: 6, fontFamily: 'Raleway-Light', color: 'white', fontSize: PixelRatio.roundToNearestPixel(screenHeight / 48) }} >
                Remaining time for your insured flight
              </Text>
              <Text style={{ fontFamily: 'Raleway-Light', color: 'white', fontSize: PixelRatio.roundToNearestPixel(screenHeight / 40) }} >
                4h 37min
              </Text>
            </View>
            {this.returnVehicle()}
            <View style={styles.unpressedRightContainerStyle} >
              <TouchableOpacity onPress={() => this.setState({ isVisible: true })} >
                <Entypo
                  name="documents"
                  color="black"
                  style={{ fontSize: 32 }}
                />
              </TouchableOpacity>
            </View>

          </LinearGradient>
        </View>
        <View style={{ position: 'absolute', bottom: 0 }} >
          {this.props.shouldShowUser === true ?
            <TouchableWithoutFeedback onPress={() => console.log('mapPresse1')} style={{ flex: 1 }} >
              <MapView
                ref={map => { this.map = map }}
                initialRegion={this.props.currentRegion}
                showsUserLocation={true}
                style={{ height: screenHeight * ((3 / 4) - (1 / 14)), width: screenWidth }}
                showsTraffic={true}
                followsUserLocation={false}
                provider="google"
                mapType="terrain"
                onRegionChangeComplete={() => this.onMapReady()}
              >
                <MapView.Polyline
                  coordinates={this.state.coords}
                  strokeWidth={1}
                  strokeColor="blue" />
              </MapView>
            </TouchableWithoutFeedback>
            :
            <TouchableWithoutFeedback onPress={() => this.props.showUser(true)} style={{ flex: 1 }} >
              <MapView
                initialRegion={this.props.currentRegion}
                region={this.props.currentLocation}
                showsUserLocation={true}
                style={{ height: screenHeight * ((3 / 4) - (1 / 14)), width: screenWidth }}
                showsTraffic={true}
                followsUserLocation={false}
                onRegionChangeComplete={(region) => this.followUserLocation(region)}
                provider="google"
                mapType="terrain"
              >
                <MapView.Polyline
                  coordinates={this.state.coords}
                  strokeWidth={1}
                  strokeColor="blue" />
              </MapView>
            </TouchableWithoutFeedback>
          }

        </View>
      </View >
    )
  }
}

const styles = {
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight / 5.5,
    width: screenWidth,
    borderBottomLeftRadius: 280,
    borderBottomRightRadius: 280,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.4,
  },
  unpressedContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    left: '8%',
    position: 'absolute',
    top: screenHeight / 6,
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
  pressedContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    left: '3%',
    position: 'absolute',
    top: screenHeight / 4,
    width: screenHeight / 8,
    borderColor: '#f96e3b',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
  pressedBusContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    left: '3%',
    position: 'absolute',
    top: screenHeight / 4,
    width: screenHeight / 6,
    borderColor: '#f96e3b',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
  unpressedRightContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    right: '8%',
    position: 'absolute',
    top: screenHeight / 4,
    padding: 5,
    borderRadius: 20
  },
  pressedRightContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    right: '8%',
    position: 'absolute',
    top: screenHeight / 4,
    borderColor: '#f96e3b',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
};

const mapStateToProps = state => {
  return {
    currentLocation: state.reducer.location,
    shouldShowUser: state.reducer.shouldShowUser,
    currentRegion: state.reducer.region,
    vehicle: state.reducer.vehicle,
  }
}

export default connect(mapStateToProps, { locationWatcher, showUser, regionWatcher, meanOfTransportation })(MapScreen);