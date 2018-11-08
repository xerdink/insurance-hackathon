import React from 'react';
import { View, Text, Animated, Easing, ActivityIndicator, Image } from 'react-native';
import { mapConstants } from '../Constants';
import { Card, Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

class CalculationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.probAnimation = new Animated.Value(12);
    this.probAnimation2 = new Animated.Value(6);
    this.detailAnimation1 = new Animated.Value(0);
    this.detailAnimation2 = new Animated.Value(0);
    this.detailAnimation3 = new Animated.Value(0);
    this.detailAnimation4 = new Animated.Value(0);
    this.detailAnimation5 = new Animated.Value(0);
    this.detailAnimation6 = new Animated.Value(0);
    this.photoOpacity = new Animated.Value(0);
    this.buttonOpacity = new Animated.Value(0);
    this.state = {
      number: 0,
      visible: false,
    }
  }

  animateProb = () => {
    this.setState({ visible: true })
    Animated.timing(this.probAnimation, {
      toValue: 56,
      duration: 500,
      easing: Easing.elastic(2),
    }).start();
    this.setState({ visible: true })
    Animated.timing(this.probAnimation2, {
      toValue: 14,
      duration: 500,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.detailAnimation1, {
      toValue: 1,
      delay: 200,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.detailAnimation2, {
      toValue: 1,
      delay: 400,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.detailAnimation3, {
      toValue: 1,
      delay: 600,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.detailAnimation4, {
      toValue: 1,
      delay: 800,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.detailAnimation5, {
      toValue: 1,
      delay: 1000,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.detailAnimation6, {
      toValue: 1,
      delay: 1200,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.photoOpacity, {
      toValue: 1,
      delay: 1400,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.buttonOpacity, {
      toValue: 1,
      delay: 1800,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start();



  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount from CalculationScreen');
    this.clearTimer();
  }

  clearTimer = () => {
    if (this.timerHandle) {
      // Yes, clear it
      clearTimeout(this.timerHandle);
    }
  }

  setTimer = () => {
    this.timerHandler = setTimeout(() => {
      this.animateProb();
    }, 1000);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }} >
        <Image
          source={require('./images/FlightRapid.png')}
          blurRadius={4}
          style={{ position: 'absolute', width: screenWidth, height: screenHeight, zIndex: 1, opacity: 0.3 }}
        />
        <View style={{
          flexDirection: 'row', justifyContent: 'center', marginTop: 72, zIndex: 100,
        }} >
          {this.state.visible ?
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
              <Animated.Text style={{ fontSize: this.probAnimation2, color: 'white', fontFamily: 'Raleway-Light' }} >The probabilty of reaching airport on time:</Animated.Text>
              <Animated.Text style={{ fontSize: this.probAnimation, color: 'white', fontFamily: 'Raleway-Light' }} >35.6%</Animated.Text>
            </View>
            :
            <ActivityIndicator size="large" color="white" />
          }
        </View>

        <View style={{
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20, zIndex: 100,
        }} >
          <Animated.Text style={{ opacity: this.detailAnimation1, marginTop: 4, fontSize: 18, color: 'white', fontFamily: 'Raleway-Light' }} >Distance: 14km</Animated.Text>
          <Animated.Text style={{ opacity: this.detailAnimation2, marginTop: 4, fontSize: 18, color: 'white', fontFamily: 'Raleway-Light' }} >Vehicle: Car</Animated.Text>
          <Animated.Text style={{ opacity: this.detailAnimation3, marginTop: 4, fontSize: 18, color: 'white', fontFamily: 'Raleway-Light' }} >Duration: 23 mins</Animated.Text>
          <Animated.Text style={{ opacity: this.detailAnimation4, marginTop: 4, fontSize: 18, color: 'white', fontFamily: 'Raleway-Light' }} ># People at Queue: 12</Animated.Text>
          <Animated.Text style={{ opacity: this.detailAnimation5, marginTop: 4, fontSize: 18, color: 'white', fontFamily: 'Raleway-Light' }} >Arrival Time: 12:47AM (GMT+3)</Animated.Text>
          <Animated.Text style={{ opacity: this.detailAnimation6, marginTop: 4, fontSize: 18, color: 'white', fontFamily: 'Raleway-Light' }} >Doors Close at: 13:02</Animated.Text>
        </View>
        <Animated.View style={{
          flexDirection: 'row', justifyContent: 'center', zIndex: 104,
          opacity: this.photoOpacity,
          shadowColor: 'white',
          shadowRadius: 4,
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.6,
          marginTop: 20,
        }} >
          <Card
            style={{
              marginTop: 20,
              zIndex: 101,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            containerStyle={{ borderRadius: 12, width: screenWidth * 9 / 10, backgroundColor: '#fcfcfc' }}
          >
            <Image
              source={require('./images/AirportDetectionScaled.png')}
              style={{ marginLeft: -16, marginTop: -16, width: screenWidth * 9 / 10, height: screenHeight / 3.6, borderRadius: 6 }}
            />
            <View style={{ marginBottom: -10 }} >
              <View style={{ flexDirection: 'row', marginTop: 5 }} >
                <View style={{
                }} >
                  <FontAwesome5
                    name="clock"
                    color="black"
                    size={20}
                  />
                </View>
                <Text style={{ marginLeft: 20 }} >  Adnan Menderes Airport</Text>
              </View>
              <Text style={{ marginLeft: 45 }} >@ 4 Oct 2018 12:24 AM (GMT+3)</Text>
            </View>
          </Card>
        </Animated.View>
        <Animated.View style={{ opacity: this.buttonOpacity, position: 'absolute', bottom: 100, flexDirection: 'row', justifyContent: 'space-between', zIndex: 104 }} >
          <Button
            title="Thanks for the info"
            titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
            onPress={() => this.props.navigation.goBack()}
            buttonStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 1, borderBottomLeftRadius: 40, borderBottomRightRadius: 1, height: screenHeight / 14 }}
            containerStyle={{ width: screenWidth / 2, opacity: 1 }}
            ViewComponent={require('react-native-linear-gradient').default}
            linearGradientProps={{
              colors: gradientColorButton,
              start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
            }}
          />
          <Button
            title="I want insurance"
            titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
            onPress={() => this.props.navigation.navigate('NewFlight')}
            buttonStyle={{ borderTopRightRadius: 40, borderTopLeftRadius: 1, borderBottomRightRadius: 40, borderBottomLeftRadius: 1, height: screenHeight / 14 }}
            containerStyle={{ width: screenWidth / 2, opacity: 1 }}
            ViewComponent={require('react-native-linear-gradient').default}
            linearGradientProps={{
              colors: gradientColorButton,
              start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
            }}
          />
        </Animated.View>

      </View>
    )
  }
}

export default CalculationScreen;