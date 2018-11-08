import React from 'react';
import { View, Text, StatusBar, Image, PixelRatio, Animated, Easing, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { locationWatcher, regionWatcher } from '../redux/action';
import { Input, Button, Icon, CheckBox } from 'react-native-elements';
import { mapConstants } from '../Constants';
import { Hideo, Hoshi } from '../components/hideo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
    this._opacityAnimationValue1 = new Animated.Value(0);
    this._opacityAnimationValue2 = new Animated.Value(0);
    this._opacityAnimationValue3 = new Animated.Value(0);
    this._opacityAnimationValue4 = new Animated.Value(0);
    this._opacityAnimationValue5 = new Animated.Value(0);
    this._opacityAnimationValue6 = new Animated.Value(0);
    this._iconSize = new Animated.Value(28);
    this.animateLines = this.animateLines.bind(this);
    this.lineColour = this.lineColour.bind(this);
    this.inverseAnimateLines = this.inverseAnimateLines.bind(this);
    this.state = {
      tempLocation: null,
      checked: false,
      value: '',
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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  animateLines(value) {
    Animated.timing(this._iconSize, {
      toValue: 22,
      duration: 300,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this._opacityAnimationValue1, {
      toValue: value,
      duration: 300,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this._opacityAnimationValue2, {
      toValue: value,
      delay: 100,
      duration: 300,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this._opacityAnimationValue3, {
      toValue: value,
      delay: 200,
      duration: 300,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this._opacityAnimationValue4, {
      toValue: value,
      delay: 300,
      duration: 300,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this._opacityAnimationValue5, {
      toValue: value,
      delay: 400,
      duration: 300,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this._opacityAnimationValue6, {
      toValue: value,
      delay: 500,
      duration: 300,
      easing: Easing.elastic(2),
    }).start();
  }



  lineColour() {
    const val = this.state.value.length;
  }

  inverseAnimateLines(value) {
    if (this.state.value.length === 0) {
      Animated.timing(this._iconSize, {
        toValue: 28,
        duration: 300,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(this._opacityAnimationValue6, {
        toValue: value,
        duration: 300,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(this._opacityAnimationValue5, {
        toValue: value,
        delay: 100,
        duration: 300,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(this._opacityAnimationValue4, {
        toValue: value,
        delay: 200,
        duration: 300,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(this._opacityAnimationValue3, {
        toValue: value,
        delay: 300,
        duration: 300,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(this._opacityAnimationValue2, {
        toValue: value,
        delay: 400,
        duration: 300,
        easing: Easing.elastic(2),
      }).start();
      Animated.timing(this._opacityAnimationValue1, {
        toValue: value,
        delay: 500,
        duration: 300,
        easing: Easing.elastic(2),
      }).start();
    }
  }

  render() {
    const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, backgroundColor: 'black' }} >
          <Image
            source={require('./images/FlightRapid.png')}
            style={{ position: 'absolute', width: screenWidth, height: screenHeight, zIndex: 1, opacity: 0.3 }}
          />
          <StatusBar
            barStyle="light-content"
          />

          <View style={{ marginTop: screenHeight *  2 / 18, flexDirection: 'row', justifyContent: 'center', zIndex: 5 }} >
            <Text style={{ opacity: 0.9, fontSize: 40, fontFamily: 'Raleway-Light', color: 'white' }} >
              Phoenix
            </Text>
          </View>

          <View style={{ flexDirection: 'column', zIndex: 2 }} >
            <View style={{ marginLeft: PixelRatio.roundToNearestPixel(screenWidth / 20), marginTop: screenHeight * 4 / 18 }} >
              <Text style={{ opacity: 0.9, fontFamily: 'Raleway-Light', fontSize: 20, color: 'white' }} >
                Enter Your Flight Code
            </Text>
            </View>


            <View style={styles.middleFormStyle} >
              <View style={{ position: 'absolute', left: '5%', top: '25%', shadowColor: 'black',
                shadowRadius: 4,
                shadowOffset: { height: 5, width: 0 },
                shadowOpacity: 0.4, }} >
                <AnimatedIcon
                  name="plane"
                  color="black"
                  style={{ fontSize: this._iconSize }}
                />
              </View>

              <Input
                placeholder='e.g. BA1234'
                value={this.state.inputValue}
                inputStyle={{
                  fontFamily: 'Raleway-Light',
                  fontSize: PixelRatio.roundToNearestPixel(screenHeight / 36),
                  height: PixelRatio.roundToNearestPixel(screenHeight * 5 / 72)
                }}
                leftIconContainerStyle={{ marginRight: 15 }}
                inputContainerStyle={{
                  borderBottomColor: 'transparent',
                }}
                onFocus={() => this.animateLines(0.5)}
                onBlur={() => this.inverseAnimateLines(0)}
                autoCapitalize="characters"
                onChangeText={(text) => this.setState({ value: text })}
                onChange={() => this.lineColour()}
                containerStyle={{ position: 'absolute', left: '20%' }}
              />
              <View style={{
                flexDirection: 'row',
                position: 'absolute',
                left: '22%',
                bottom: '5%',
                shadowColor: 'black',
                shadowRadius: 4,
                shadowOffset: { height: 5, width: 0 },
                shadowOpacity: 0.4,
              }}
              >
                <Animated.View style={{ opacity: this._opacityAnimationValue1, height: 2, width: 10, backgroundColor: 'black', marginLeft: 2 }} >
                </Animated.View>
                <Animated.View style={{ opacity: this._opacityAnimationValue2, height: 2, width: 10, backgroundColor: 'black', marginLeft: 2 }} >
                </Animated.View>
                <Animated.View style={{ opacity: this._opacityAnimationValue3, height: 2, width: 10, backgroundColor: 'black', marginLeft: 2 }} >
                </Animated.View>
                <Animated.View style={{ opacity: this._opacityAnimationValue4, height: 2, width: 10, backgroundColor: 'black', marginLeft: 2 }} >
                </Animated.View>
                <Animated.View style={{ opacity: this._opacityAnimationValue5, height: 2, width: 10, backgroundColor: 'black', marginLeft: 2 }} >
                </Animated.View>
                <Animated.View style={{ opacity: this._opacityAnimationValue6, height: 2, width: 10, backgroundColor: 'black', marginLeft: 2 }} >
                </Animated.View>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              shadowColor: 'black',
              shadowRadius: 4,
              shadowOffset: { height: 5, width: 0 },
              shadowOpacity: 0.4,
              marginTop: screenHeight * 3 / 18,
            }}
            >
              <Button
                title="Enter"
                titleStyle={{ fontFamily: 'Raleway-Light' }}
                onPress={() => this.props.navigation.navigate('MapScreen')}
                buttonStyle={{ borderRadius: 40, height: screenHeight / 14 }}
                containerStyle={{ width: screenWidth / 1.6, opacity: 0.9 }}
                ViewComponent={require('react-native-linear-gradient').default}
                linearGradientProps={{
                  colors: gradientColorButton,
                  start: { x: 0.0, y: 0.0 }, end: { x: 1, y: 0.0 },
                }}
              />
            </View>

          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  middleFormStyle: {
    backgroundColor: 'white',
    opacity: 0.5,
    marginLeft: homeMargin,
    marginRight: homeMargin,
    marginTop: 10,
    height: PixelRatio.roundToNearestPixel(screenHeight / 14),
    borderTopLeftRadius: radiusBorder,
    borderTopRightRadius: radiusBorder,
    borderBottomLeftRadius: radiusBorder,
    borderBottomRightRadius: radiusBorder,
  },
  input: {
    input: {
      marginTop: 4,
    },
  }
};

const mapStateToProps = state => {
  return {
    currentLocation: state.reducer.location,
    region: state.reducer.region,
  }
}


export default connect(mapStateToProps, { locationWatcher, regionWatcher })(TicketQuery);