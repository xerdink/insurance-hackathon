import React from 'react';
import { View, Text, Image, PixelRatio, ActivityIndicator } from 'react-native';
import { paymentConstants } from '../Constants';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { isTicketRegistered } from '../redux/action';

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
} = paymentConstants;

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.proceedAnimation = this.proceedAnimation.bind(this);
    this.state = {
      something: false,
      preprocess: true,
      processing: false,
      processed: false,
      PHC: 34639,
      dollar: 4137.86,
      ticketPHC: 2260.22,
      ticketDollar: 270,
    }
  }

  proceedAnimation() {
    this.props.isTicketRegistered(true);
    this.timerHandler = setTimeout(() => {
      this.setState({ preprocess: false });
    }, 300);
    this.timerHandler2 = setTimeout(() => {
      this.setState({ processing: true });
    }, 600);
    this.timerHandler3 = setTimeout(() => {
      this.setState({ processing: false });
    }, 3000);
    this.timerHandler4 = setTimeout(() => {
      this.setState({ processed: true });
    }, 3200);
    const remainingPHC = this.state.PHC - this.state.ticketPHC;
    const remainingDollar = this.state.dollar - this.state.ticketDollar;
    this.timerHandler5 = setTimeout(() => {
      this.setState({ PHC: remainingPHC });
      this.setState({ dollar: remainingDollar });
    }, 3900);
    this.timerHandler6 = setTimeout(() => {
      this.props.navigation.navigate('MapScreen');
    }, 5000);
  }

  componentWillUnmount() {
    console.log('CompUnmount of Payment');
    if(this.timerHandler){
      clearTimeout(this.timerHandler);
    }
    if(this.timerHandler2){
      clearTimeout(this.timerHandler2);
    }
    if(this.timerHandler3){
      clearTimeout(this.timerHandler3);
    }
    if(this.timerHandler4){
      clearTimeout(this.timerHandler4);
    }
    if(this.timerHandler5){
      clearTimeout(this.timerHandler5);
    }
    if(this.timerHandler6){
      clearTimeout(this.timerHandler6);
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#ededed', flex: 1 }} >
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
                top: 50,
              }}
              onPress={() => this.props.navigation.goBack()}
              underlayColor="transparent"
            />

            <Text style={styles.headerTextStyle}>Payment</Text>

          </View>
        </LinearGradient>
        <View style={{
          left: '5%',
          position: 'absolute',
          top: '18%',
          borderRadius: 20,
          shadowColor: 'black',
          shadowRadius: 8,
          shadowOffset: { height: 5, width: 0 },
          shadowOpacity: 0.5,
        }} >
          <View style={{
            width: screenWidth * 9 / 10,
            height: screenHeight / 8,
            backgroundColor: 'white',
            borderRadius: 20
          }} >
            <View style={{ marginTop: '4%', marginLeft: 10, flexDirection: 'row', alignItems: 'center' }} >
              <Image
                source={require('./images/PhoenixLogo.png')}
                style={{ borderRadius: 20, width: 64, height: 64 }}
              />
              <View>
                <Text style={{ marginLeft: 10, fontSize: 20, fontFamily: 'Raleway-Light' }} >Phoenixcoin</Text>
                <Text style={{ color: '#96d367', marginLeft: 10, fontSize: 14, fontFamily: 'Raleway-Light' }} >+3,36%</Text>
              </View>
              <View style={{ marginRight: 10 }} >
                <Text style={{ marginLeft: 60, fontSize: 20, fontFamily: 'Raleway-Light' }} >{this.state.PHC}</Text>
                <Text style={{ color: '#9e9c9c', marginTop: 5, marginLeft: 60, fontSize: 12, fontFamily: 'Raleway-Light' }} >${this.state.dollar.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{
          left: '5%',
          position: 'absolute',
          top: '36%',
          borderRadius: 20,
          shadowColor: 'black',
          shadowRadius: 8,
          shadowOffset: { height: 5, width: 0 },
          shadowOpacity: 0.5,
        }} >
          <View style={{
            width: screenWidth * 9 / 10,
            height: screenHeight * 11 / 20,
            backgroundColor: 'white',
            borderRadius: 20
          }} >
            <View style={{ marginTop: 10, marginLeft: 10, flexDirection: 'row', alignItems: 'center' }} >
              <Image
                source={require('./images/TurkishAirlinesLogo.png')}
                style={{ borderRadius: 20, width: 42, height: 42 }}
              />
              <View>
                <Text style={{ marginLeft: 10, fontSize: 18, fontFamily: 'Raleway-Light' }} >Turkish Airlines</Text>
              </View>
              <View>
                <Text style={{ marginLeft: 30, fontSize: 20, fontFamily: 'Raleway-Light' }} >ADB-LAX</Text>
              </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 25 }} >
              <Text style={{ marginTop: 6, marginLeft: 5, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                Flight Number: TK 0012
              </Text>
              <Text style={{ marginTop: 6, marginLeft: 5, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                Class: Economy
              </Text>
              <Text style={{ marginTop: 6, marginLeft: 5, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                Boarding Time: 04:14 AM, 5 Oct 2018
              </Text>
              <Text style={{ marginTop: 6, marginLeft: 5, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                Arrival Time: 16:14 AM, 6 Oct 2018
              </Text>
              <View style={{ flexDirection: 'row' }} >
                <Text style={{ marginTop: 6, marginLeft: 5, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                  Stops:
                </Text>
                <Text style={{ marginTop: 6, color: '#d83636', marginLeft: 5, fontSize: 18, fontFamily: 'Raleway-Light' }} >
                  2 Stops
                </Text>
                <Text style={{ marginTop: 6, marginLeft: 5, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                  IST, FRA
                </Text>
              </View>
              {this.state.preprocess ?
                <View>

                  <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'center' }} >
                    <Text style={{ marginLeft: 5, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                      You are going to buy this ticket for:
                    </Text>
                  </View>
                  <View style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }} >
                    <View style={{ alignItems: 'center' }} >
                      <Text style={{ marginLeft: 5, fontSize: 20, fontFamily: 'Raleway-Light' }} >{this.state.ticketPHC} PHC</Text>
                      <View>
                        <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Raleway-Light' }} >${this.state.ticketDollar}</Text>
                      </View>
                    </View>
                    <Button
                      title="Proceed"
                      onPress={() => this.proceedAnimation()}
                      buttonStyle={{ height: screenHeight / 16, borderRadius: 24 }}
                      containerStyle={{ marginTop: 20, width: screenWidth / 3, opacity: 1 }}
                      ViewComponent={require('react-native-linear-gradient').default}
                      linearGradientProps={{
                        colors: gradientColorButton,
                        start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
                      }}
                    />
                  </View>
                </View>
                :
                null
              }
              {this.state.processing ?
                <View style={{
                  marginTop: 50, flexDirection: 'row', justifyContent: 'center', 
                  shadowColor: '#6ed87e',
                  shadowRadius: 6,
                  shadowOffset: { height: 0, width: 0 },
                  shadowOpacity: 0.8,
                }} >
                  <ActivityIndicator size="large" color="#6ed87e" />
                </View>
                :
                null
              }
              {this.state.processed ?
                <View>

                  <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'center' }} >
                    <Text style={{ marginLeft: 5, fontSize: 16, fontFamily: 'Raleway-Light' }} >
                      You paid this ticket:
                    </Text>
                  </View>
                  <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }} >
                    <View style={{ alignItems: 'center' }} >
                      <Text style={{ marginLeft: 5, fontSize: 20, fontFamily: 'Raleway-Light' }} >{this.state.ticketPHC} PHC</Text>
                      <View>
                        <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Raleway-Light' }} >${this.state.ticketDollar}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                :
                null
              }


            </View>
          </View>
        </View>

      </View>
    )
  }
}

const styles = {
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight / 4,
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
    marginTop: 0,
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
    height: PixelRatio.roundToNearestPixel(screenHeight / 14),
    borderTopLeftRadius: radiusBorder,
    borderTopRightRadius: radiusBorder,
    borderBottomLeftRadius: radiusBorder,
    borderBottomRightRadius: radiusBorder,
  },
  bottomFormStyle: {
    backgroundColor: '#edf7f7',
    marginLeft: homeMargin,
    marginRight: homeMargin,
    height: PixelRatio.roundToNearestPixel(screenHeight / 14),
    borderTopLeftRadius: radiusBorder,
    borderTopRightRadius: radiusBorder,
    borderBottomLeftRadius: radiusBorder,
    borderBottomRightRadius: radiusBorder,
  },
};

const mapStateToProps = state => {
  return {
    isRegistered: state.reducer.isRegistered,
  }
}

export default connect(mapStateToProps, { isTicketRegistered })(Payment);