import React from 'react';
import { View, Text, PixelRatio } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import { signUpConstants } from '../Constants';
import LinearGradient from 'react-native-linear-gradient';

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneLabel: ' ',
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f7f7f7', flex: 1 }} >
        <LinearGradient
          colors={gradientColor}
          start={{ x: 0.0, y: 0.3 }} end={{ x: 0.13, y: 1.1 }}
          locations={[0.2, 0.7, 0.9, 1.0]}
        >
          <View style={styles.headerStyle}>

          <Icon
          name='keyboard-return'
          size={36}
          color='white'
          containerStyle={{
            left: '4%',
            position: 'absolute',
            top: 80,
          }}
          onPress={() => this.props.navigation.goBack()}
          underlayColor="transparent"
        />

            <Text style={styles.headerTextStyle}>Login</Text>

          </View>
        </LinearGradient>

        <View style={styles.middleFormStyle} >
          <Input
            placeholder='someone@example.com'
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

        <View style={styles.bottomFormStyle} >
          <Input
            placeholder='Password'
            inputStyle={{
              fontFamily: 'Raleway-Light',
              fontSize: PixelRatio.roundToNearestPixel(screenHeight / 36),
              height: PixelRatio.roundToNearestPixel(screenHeight / 14)
            }}
            leftIcon={{
              type: 'material-community-icons',
              name: 'lock-outline',
              size: iconSize,
              color: '#478c69'
            }}
            leftIconContainerStyle={{ marginRight: 15 }}
            containerStyle={{ borderBottomLeftRadius: 5 }}
            inputContainerStyle={{
              borderBottomColor: 'transparent',
            }}
          />
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'center', shadowColor: 'black',
          shadowRadius: 4,
          shadowOffset: { height: 5, width: 0 },
          shadowOpacity: 0.4,
        }} >
          <Button
            title="Sign In"
            titleStyle={{ fontFamily: 'Raleway-Light' }}
            onPress={() => this.props.navigation.navigate('TicketQuery')}
            style={{
              marginTop: screenHeight * 3 / 36,
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

      </View >
    )
  }
}

const styles = {
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight * 4 / 18,
    width: screenWidth,
    borderBottomLeftRadius: 280,
    borderBottomRightRadius: 280,
    borderRadius: 30,
    alignSelf: 'center',
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
    height: PixelRatio.roundToNearestPixel(screenHeight * 3 / 36),
    borderTopLeftRadius: radiusBorder,
    borderTopRightRadius: radiusBorder,
    borderBottomLeftRadius: radiusBorder,
    borderBottomRightRadius: radiusBorder,
  },
  middleFormStyle: {
    backgroundColor: '#edf7f7',
    marginLeft: homeMargin,
    marginRight: homeMargin,
    marginTop: screenHeight * 7 / 36,
    height: PixelRatio.roundToNearestPixel(screenHeight * 3 / 36),
    borderTopLeftRadius: radiusBorder,
    borderTopRightRadius: radiusBorder,
    borderBottomLeftRadius: radiusBorder,
    borderBottomRightRadius: radiusBorder,
  },
  bottomFormStyle: {
    backgroundColor: '#edf7f7',
    marginLeft: homeMargin,
    marginRight: homeMargin,
    height: PixelRatio.roundToNearestPixel(screenHeight * 3 / 36),
    borderTopLeftRadius: radiusBorder,
    borderTopRightRadius: radiusBorder,
    borderBottomLeftRadius: radiusBorder,
    borderBottomRightRadius: radiusBorder,
  },
};

export default Login;