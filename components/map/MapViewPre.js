import React from 'react';
import { View, Text, PixelRatio, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import { mapConstants } from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { connect } from 'react-redux';
import { locationWatcher, showUser, regionWatcher, meanOfTransportation } from '../../redux/action';

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
    this.reactPageHandler = this.reactPageHandler.bind(this);
    this.mapViewer = this.mapViewer.bind(this);
    this.counter = 0;
    this.state = {
      pageTransition: false,
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

  componentWillUnmount() {
    console.log('MapViewPre Unmounted');
  }

  async getDirections(startLoc, destinationLoc) {
    if (this.state.pageTransition === false) {
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

  reactPageHandler() {
    this.setState({ pageTransition: true });
    this.props.navigation.navigate('CalculationScreen')
  }

  mapViewer() {
    if (this.state.pageTransition) {
      return (
        null
      )
    }
    else {
      if (this.props.shouldShowUser === true) {
        return (
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
        )
      }
      else {
        return (
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
        )
      }
    }
  }

  render() {
    const ButtonText = 'Go by' + ' ' + this.state.buttonName;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <Icon
          name='keyboard-return'
          size={36}
          color='white'
          containerStyle={{
            left: '4%',
            position: 'absolute',
            top: 50,
            zIndex: 999,
          }}
          onPress={() => this.props.navigation.goBack()}
          underlayColor="transparent"
        />
        <Icon
          name='my-location'
          type='material'
          size={36}
          color={this.state.navigatorColor}
          onPress={() => this.mapHomeHandler()}
          underlayColor="transparent"
          containerStyle={{
            right: 10,
            bottom: 80,
            position: 'absolute',
            zIndex: 999,
          }}
        />
        <View style={{
          flex: 1,
        }} >
          <LinearGradient
            colors={gradientColor}
            start={{ x: 0.0, y: -1.0 }} end={{ x: 0.13, y: 1.2 }}
            locations={[0.2, 0.8, 1.0]}
          >
            <TouchableWithoutFeedback onPress={() => this.setState({ vehicleColor: 0 })} >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height: screenHeight / 4,
              }} >
                <Text style={{ fontSize: PixelRatio.roundToNearestPixel(screenHeight / 20), fontFamily: 'Raleway-Light', marginTop: 50, color: 'white' }} >
                  Your Location
              </Text>
                <View style={[this.state.vehicleColor === 1 ? styles.pressedContainerStyle : styles.unpressedContainerStyle]} >
                  <TouchableOpacity onPress={() => this.vehicleHandler('car')} style={{ flex: 1, flexDirection: 'row' }} >
                    <Icon
                      name='car'
                      type="font-awesome"
                      size={20}
                      color={this.state.vehicleColor === 1 ? '#f96e3b' : 'white'}
                      underlayColor="transparent"
                    />
                    <Text style={{ marginLeft: 10, marginTop: 4, color: 'white' }} >
                      {this.state.carTime}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[this.state.vehicleColor === 2 ? styles.pressedRightContainerStyle : styles.unpressedRightContainerStyle]} >
                  <TouchableOpacity onPress={() => this.vehicleHandler('transit')} style={{ flex: 1, flexDirection: 'row' }} >
                    <Icon
                      name='bus-clock'
                      type='material-community'
                      size={20}
                      color={this.state.vehicleColor === 2 ? '#f96e3b' : 'white'}
                      underlayColor="transparent"
                    />
                    <Text style={{ marginLeft: 10, marginTop: 4, color: 'white' }} >
                      2h 18min
                  </Text>

                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </LinearGradient>
        </View>
        <View style={{ position: 'absolute', bottom: PixelRatio.roundToNearestPixel(screenHeight / 14) }} >
          {this.mapViewer()}
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          shadowColor: 'black',
          shadowRadius: 4,
          shadowOffset: { height: 5, width: 0 },
          shadowOpacity: 0.4,
        }}
        >
          <Button
            title={ButtonText}
            titleStyle={{ fontFamily: 'Raleway-Light' }}
            onPress={() => this.reactPageHandler()}
            buttonStyle={{ borderRadius: 40, height: screenHeight / 14 }}
            containerStyle={{ width: screenWidth / 1.2, opacity: 0.9 }}
            ViewComponent={require('react-native-linear-gradient').default}
            linearGradientProps={{
              colors: gradientColorButton,
              start: { x: 0.0, y: 0.0 }, end: { x: 1, y: 0.0 },
            }}
          />
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
    left: '8%',
    position: 'absolute',
    top: screenHeight / 6,
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
    top: screenHeight / 6,
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
  pressedRightContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    right: '8%',
    position: 'absolute',
    top: screenHeight / 6,
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
