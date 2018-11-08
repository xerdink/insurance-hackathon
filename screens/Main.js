import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { signUpConstants } from '../Constants';

const { topHorizontalMargin,
  homeMargin,
  gradientColor,
  screenWidth,
  screenHeight,
  iconSize,
  radiusBorder,
  topMargin,
  gradientColorButton
} = signUpConstants;

class Main extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <StatusBar
          barStyle="light-content"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
          <View style={{
            height: screenHeight * 7 / 18,
            width: screenWidth,
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 20,
            borderBottomLeftRadius: 180,
            borderBottomRightRadius: 180,
            overflow: 'hidden'
          }} >
            <Image
              source={require('./images/RapidFlightEdit.png')}
              style={{ width: screenWidth, height: screenHeight * 4 / 9 }}
            />
          </View>
        </View>
        <Text
          style={{
            left: '26%',
            position: 'absolute',
            top: '12%',
            fontFamily: 'Raleway-Light',
            fontSize: 50, color: '#476a6d',
          }}
        >
          Phoenix
        </Text>
        <Text style={{
          marginTop: screenHeight / 18,
          textAlign: 'center',
          fontSize: 40,
          fontFamily: 'Raleway-Light',
          color: '#8ec9ca'
        }} >Save your flight!</Text>
        <View style={{ marginTop: screenHeight * 2 / 18 }} >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            shadowColor: 'black',
            shadowRadius: 4,
            shadowOffset: { height: 5, width: 0 },
            shadowOpacity: 0.4,
          }} >
            <Button
              title="Sign In"
              titleStyle={{ fontFamily: 'Raleway-Light' }}
              onPress={() => this.props.navigation.navigate('Login')}
              buttonStyle={{ borderRadius: 40, height: screenHeight / 14 }}
              containerStyle={{ width: screenWidth / 1.6 }}
              ViewComponent={require('react-native-linear-gradient').default}
              linearGradientProps={{
                colors: gradientColorButton,
                start: { x: 0.0, y: 0.0 }, end: { x: 1, y: 0.0 },
              }}
            />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            shadowColor: 'black',
            shadowRadius: 4,
            shadowOffset: { height: 5, width: 0 },
            shadowOpacity: 0.4,
            marginTop: 20
          }} >
            <Button
              title="Sign Up"
              titleStyle={{ fontFamily: 'Raleway-Light' }}
              onPress={() => this.props.navigation.navigate('SignUp')}
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
      </View>
    );
  }
}

export default Main;