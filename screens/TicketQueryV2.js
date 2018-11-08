import React from 'react';
import { View, Text, StatusBar, Image, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { locationWatcher, regionWatcher } from '../redux/action';
import { Input, Button, Icon, CheckBox } from 'react-native-elements';
import { mapConstants } from '../Constants';
import { Hideo } from '../components/hideo';

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

class TicketQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempLocation: null,
      checked: false,
    }
  }

  componentDidMount() {
    let _this = this;
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log(position);
      var x = '' + position.coords.latitude + ',' + position.coords.longitude;
      console.log(typeof (x));
      console.log(x);
      this.props.locationWatcher({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      });
    }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <StatusBar
          barStyle="light-content"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
          <View style={{
            height: 150,
            width: 400,
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 20,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            overflow: 'hidden'
          }} >
            <Image
              source={require('./images/RapidFlightEdit.png')}
              style={{ marginTop: -70, width: 400, height: 220 }}
            />
          </View>
        </View>
        <Text
          style={{
            left: '32%',
            position: 'absolute',
            marginTop: 80,
            fontFamily: 'Raleway-Light',
            fontSize: 40, color: 'white',
            shadowColor: 'black',
            shadowRadius: 4,
            shadowOffset: { height: 5, width: 0 },
            shadowOpacity: 0.7,
          }}
        >
          Phoenix
        </Text>
        <Text style={{
          marginTop: 20,
          textAlign: 'center',
          fontSize: 24,
          fontFamily: 'Raleway-Light',
          color: '#8ec9ca'
        }} >Flight Info</Text>

        <View style={{ flexDirection: 'column', marginTop: 20 }} >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
            <Text textAlign="center" style={{ fontFamily: 'Raleway-Light', fontSize: 16 }} >
              Enter Your Flight Code
            </Text>
          </View>

          <View style={styles.middleFormStyle} >
            <Input
              placeholder='e.g. BA1234'
              inputStyle={{
                fontFamily: 'Raleway-Light',
                fontSize: PixelRatio.roundToNearestPixel(screenHeight / 36),
                height: PixelRatio.roundToNearestPixel(screenHeight / 14)
              }}
              leftIcon={{
                type: 'feather',
                name: 'user',
                size: iconSize,
                color: '#478c69'
              }}
              leftIconContainerStyle={{ marginRight: 15 }}
              inputContainerStyle={{
                borderBottomColor: 'transparent',
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 20, zIndex: 999 }} >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
            <Text textAlign="center" style={{ fontFamily: 'Raleway-Light', fontSize: 16 }} >
              Choose Check-In Status
            </Text>
          </View>

          <View style={{
            backgroundColor: '#edf7f7',
            marginLeft: homeMargin,
            marginRight: homeMargin,
            marginTop: 10,
            height: PixelRatio.roundToNearestPixel(screenHeight / 12),
            borderWidth: 1,
            borderColor: '#478c69',
            borderRadius: radiusBorder,
            flexDirection: 'row',
            alignItems: 'center',
          }} >
            <Icon
              name='my-location'
              type='material'
              size={iconSize}
              color="#478c69"
              underlayColor="transparent"
              containerStyle={{ marginLeft: 12, marginRight: 25 }}
            />
            <Text style={{ fontFamily: 'Raleway-Light', fontSize: 16 }} >
              Check-In Status
            </Text>
            <CheckBox
              size={24}
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            />
            {
              this.state.checked ?
                <Text style={{ fontFamily: 'Raleway-Light', fontSize: 16, color: '#4188d6' }} >
                  Checked
              </Text>
                :
                <Text style={{ fontFamily: 'Raleway-Light', fontSize: 16 }} >
                  Unchecked
              </Text>
            }
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 20, zIndex: 1 }} >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
            <Text textAlign="center" style={{ fontFamily: 'Raleway-Light', fontSize: 16 }} >
              Choose Check-In Status
            </Text>
          </View>

          <View style={{
            backgroundColor: '#edf7f7',
            marginLeft: homeMargin,
            marginRight: homeMargin,
            marginTop: 10,
            height: PixelRatio.roundToNearestPixel(screenHeight / 14),
            borderWidth: 1,
            borderColor: '#478c69',
            borderRadius: radiusBorder,
            flexDirection: 'row',
            alignItems: 'center'
          }} >
            <Icon
              name='my-location'
              type='material'
              size={iconSize}
              color="#478c69"
              underlayColor="transparent"
              containerStyle={{ marginLeft: 12, marginRight: 25 }}
            />
            <Text style={{ fontSize: 16, fontFamily: 'Raleway-Light' }} >
              Check-In Status
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: screenWidth * 36 / 40, backgroundColor: '#edf7f7', borderWidth: 1, borderColor: '#478c69', borderRadius: radiusBorder / 2, flexDirection: 'column', alignItems: 'center', position: 'absolute', top: '100%', zIndex: 999 }} >
              <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                Small
            </Text>
              <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                Big
            </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
          <Button
            title="Enter"
            titleStyle={{ fontFamily: 'Raleway-Light' }}
            onPress={() => this.props.navigation.goBack()}
            style={{
              marginTop: 50,
            }}
            buttonStyle={{ borderRadius: 40, height: screenHeight / 14 }}
            containerStyle={{
              width: screenWidth / 1.6,
              height: screenHeight / 6
            }}
            ViewComponent={require('react-native-linear-gradient').default}
            linearGradientProps={{
              colors: gradientColorButton,
              start: { x: 0.0, y: 0.0 }, end: { x: 1, y: 0.0 },
            }}
          />
        </View>

      </View>
    );
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
  headerTextStyle: {
    fontSize: PixelRatio.roundToNearestPixel(screenHeight / 20),
    marginTop: 50,
    fontFamily: 'Raleway-Light',
    color: 'white'
  },
  topFormStyle: {
    backgroundColor: '#edf7f7',
    marginTop: PixelRatio.roundToNearestPixel(screenHeight / 80),
    marginLeft: homeMargin,
    marginRight: homeMargin,
    height: PixelRatio.roundToNearestPixel(screenHeight / 14),
    borderTopLeftRadius: radiusBorder,
    borderTopRightRadius: radiusBorder,
    borderBottomLeftRadius: radiusBorder,
    borderBottomRightRadius: radiusBorder,
  },
  middleFormStyle: {
    backgroundColor: '#edf7f7',
    marginLeft: homeMargin,
    marginRight: homeMargin,
    marginTop: 10,
    height: PixelRatio.roundToNearestPixel(screenHeight / 14),
    borderTopLeftRadius: radiusBorder,
    borderTopRightRadius: radiusBorder,
    borderBottomLeftRadius: radiusBorder,
    borderBottomRightRadius: radiusBorder,
    borderWidth: 1,
    borderColor: '#478c69',
  },
};

const mapStateToProps = state => {
  return {
    currentLocation: state.reducer.location,
    region: state.reducer.region,
  }
}


export default connect(mapStateToProps, { locationWatcher, regionWatcher })(TicketQuery);