import React from 'react';
import { View, Text, Image, ScrollView, Animated, Easing } from 'react-native';
import { Card, Button, CheckBox, Slider } from 'react-native-elements';
import { mapConstants } from '../Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
  gradientColorButton,
  gradientDisabledButton,
} = mapConstants;

class NewFlight extends React.Component {
  constructor(props) {
    super(props);
    this.takeOffOpacity = new Animated.Value(0);
    this.arrowOpacity = new Animated.Value(0);
    this.arrivalOpacity = new Animated.Value(0);

    this.animatedProb = this.animatedProb.bind(this);
    this.listTickets = this.listTickets.bind(this);
    this.renderTickets = this.renderTickets.bind(this);

    this.state = {
      value: 0,
      something: false,
      selectedButton: 1,
      urgentTicketList: [
        {
          airline: 'Turkish Airlines',
          airlinePhoto: require('./images/TurkishAirlinesLogo.png'),
          departureTime: '4:30 AM',
          arrivalTime: '1:20 PM',
          departurePort: 'ADB',
          arrivalPort: 'LAX',
          price: '2600₺',
        },
        {
          airline: 'Lufthansa',
          airlinePhoto: require('./images/LufthansaLogo.png'),
          departureTime: '6:30 AM',
          arrivalTime: '3:20 PM',
          departurePort: 'ADB',
          arrivalPort: 'LAX',
          price: '2200₺',
        },
        {
          airline: 'Turkish Airlines',
          airlinePhoto: require('./images/TurkishAirlinesLogo.png'),
          departureTime: '11:30 AM',
          arrivalTime: '11:20 PM',
          departurePort: 'ADB',
          arrivalPort: 'LAX',
          price: '2100₺',
        },
      ],
      cheapestTicketList: [
        {
          airline: 'Turkish Airlines',
          airlinePhoto: require('./images/TurkishAirlinesLogo.png'),
          departureTime: '4:30 AM',
          arrivalTime: '1:20 PM',
          departurePort: 'ADB',
          arrivalPort: 'LAX',
          price: '1600₺',
        },
        {
          airline: 'Turkish Airlines',
          airlinePhoto: require('./images/TurkishAirlinesLogo.png'),
          departureTime: '4:30 AM',
          arrivalTime: '1:20 PM',
          departurePort: 'ADB',
          arrivalPort: 'LAX',
          price: '1200₺',
        },
      ],
      fastestTicketList: [
        {
          airline: 'Turkish Airlines',
          airlinePhoto: require('./images/TurkishAirlinesLogo.png'),
          departureTime: '4:30 AM',
          arrivalTime: '1:20 PM',
          departurePort: 'ADB',
          arrivalPort: 'LAX',
          price: '2800₺',
        },
      ],
    }
  }

  animatedProb() {
    Animated.timing(this.takeOffOpacity, {
      toValue: 1,
      delay: 400,
      duration: 1500,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.arrowOpacity, {
      toValue: 1,
      delay: 800,
      duration: 1500,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.arrivalOpacity, {
      toValue: 1,
      delay: 1200,
      duration: 1500,
      easing: Easing.elastic(2),
    }).start();
  }

  componentDidMount() {
    this.animatedProb();
  }

  renderTickets(x, index) {
    return(
      <View key={index} style={{ borderRadius: 10, flexDirection: 'row', justifyContent: 'center' }} >
          <View style={{ marginTop: 10, borderRadius: 10, width: screenWidth * 18 / 20, height: screenHeight / 4, backgroundColor: 'white' }} >
            <View style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row' }} >
              <Image
                source={x.airlinePhoto}
                style={{ width: 26, height: 26 }}
              />
              <Text style={{ fontSize: 20, fontFamily: 'Raleway-Light', marginLeft: 20 }} >
                {x.airline}
              </Text>
            </View>
            <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }} >
              <View style={{ marginTop: 10 }} >
                <Text style={{ fontSize: 18, fontFamily: 'Raleway-Light' }} >
                  {x.departureTime}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 18, fontFamily: 'Raleway-Light' }} >
                  {x.departurePort}
                </Text>
              </View>
              <View style={{ marginTop: 20 }} >
                <Text style={{ marginBottom: -5, marginLeft: '20%', fontSize: 14, fontFamily: 'Raleway-Light', color: 'red' }} >
                  2 Stops
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <Entypo
                    name="minus"
                    color="black"
                    style={{ fontSize: 30 }}
                  />
                  <Entypo
                    name="dot-single"
                    color="red"
                    style={{ marginLeft: -5, fontSize: 20 }}
                  />
                  <Entypo
                    name="dot-single"
                    color="red"
                    style={{ marginRight: -5, fontSize: 20 }}
                  />
                  <Entypo
                    name="minus"
                    color="black"
                    style={{ fontSize: 30 }}
                  />
                  <FontAwesome5
                    name="plane"
                    color="black"
                    style={{ fontSize: 20 }}
                  />
                </View>
                <View style={{ marginTop: -8, flexDirection: 'row', marginLeft: '20%' }} >
                  <Text style={{ fontSize: 12, fontFamily: 'Raleway-Light' }} >
                    IST
                </Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Raleway-Light',  marginLeft: 5 }} >
                    FRA
                </Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }} >
                <Text style={{ fontSize: 18, fontFamily: 'Raleway-Light' }} >
                  {x.arrivalTime}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 18, fontFamily: 'Raleway-Light' }} >
                  {x.arrivalPort}
                </Text>
              </View>
            </View>
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
              <Button
                title="Select"
                titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
                onPress={() => this.props.navigation.navigate('Payment')}
                buttonStyle={{ height: screenHeight / 18, borderRadius: 20 }}
                containerStyle={{ marginTop: 10, width: screenWidth / 4, opacity: 1 }}
                ViewComponent={require('react-native-linear-gradient').default}
                linearGradientProps={{
                  colors: gradientColorButton,
                  start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
                }}
              />
                <Text style={{ fontSize: 20, fontFamily: 'Raleway-Light', marginTop: 10 }} >{x.price}</Text>
            </View>

          </View>
        </View >
    );
  }

  listTickets() {
    if (this.state.selectedButton === 1) {
      return this.state.urgentTicketList.map((x, index) =>
        this.renderTickets(x, index)
      )
    }
    if (this.state.selectedButton === 2) {
      return this.state.cheapestTicketList.map((x, index) =>
        this.renderTickets(x, index)
      )
    }
    if (this.state.selectedButton === 3) {
      return this.state.fastestTicketList.map((x, index) =>
        this.renderTickets(x,index)
      )
    }

  }

  render() {
    const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }} >
        <View style={{ position: 'absolute', top: '7.5%', left: '2.5%', width: screenWidth * 19 / 20, height: 36, backgroundColor: 'white', zIndex: 2, opacity: 0.4, borderRadius: 20 }} >
        </View>
        <Image
          source={require('./images/FlightRapid.png')}
          blurRadius={4}
          style={{ position: 'absolute', width: screenWidth, height: screenHeight, zIndex: 1, opacity: 0.3 }}
        />
        <View style={{ zIndex: 100, backgroundColor: 'transparent' }} >
          <View style={{ marginTop: screenHeight * 10 / 120, flexDirection: 'row', justifyContent: 'space-around' }} >
            <View style={{ flexDirection: 'row' }} >
              <Text style={{ color: 'white', fontSize: 24 }} >ADB</Text>
              <AnimatedIcon
                name="plane-departure"
                color="#f4b042"
                size={20}
                style={{ marginLeft: 10, opacity: this.takeOffOpacity }}
              />
            </View>
            <AnimatedIcon
              name="long-arrow-alt-right"
              color="#f4b042"
              size={20}
              style={{ opacity: this.arrowOpacity }}
            />
            <View style={{ flexDirection: 'row' }} >
              <AnimatedIcon
                name="plane-arrival"
                color="#f4b042"
                size={20}
                style={{ marginRight: 10, opacity: this.arrivalOpacity }}
              />
              <Text style={{ color: 'white', fontSize: 24 }} >LAX</Text>
            </View>

          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', zIndex: 106 }} >
          <View style={{ marginTop: 20, width: screenWidth * 8 / 10, flexDirection: 'column' }} >
            <Slider
              value={this.state.value}
              onValueChange={(value) => this.setState({ value })}
              maximumValue={1439}
              step={15}
              animationType={null}
              trackStyle={{ backgroundColor: 'white' }}
              thumbTintColor="#f4b042"
              thumbTouchSize={{ width: 80, height: 80 }}
              thumbStyle={{ width: 26, height: 26, borderRadius: 50 }}

            />
            <Text style={{ fontSize: 20, fontFamily: 'Raleway-Light', color: 'white' }} >Departure Time: {parseInt(this.state.value / 60, 10)}:{this.state.value % 60} - 23:59</Text>
          </View>
        </View>


        <View style={{ zIndex: 101, marginTop: 20, flexDirection: 'row', width: screenWidth }} >
          {this.state.selectedButton === 1 ?
            <Button
              title="Most Urgent"
              titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
              onPress={() => this.setState({ selectedButton: 1 })}
              buttonStyle={{ height: screenHeight / 14, borderRadius: 0 }}
              containerStyle={{ width: screenWidth / 3, opacity: 1, borderRadius: 0 }}
              ViewComponent={require('react-native-linear-gradient').default}
              linearGradientProps={{
                colors: gradientColorButton,
                start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
              }}
            />
            :
            <Button
              title="Most Urgent"
              titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
              onPress={() => this.setState({ selectedButton: 1 })}
              buttonStyle={{ height: screenHeight / 14, borderRadius: 0 }}
              containerStyle={{ width: screenWidth / 3, opacity: 1 }}
              ViewComponent={require('react-native-linear-gradient').default}
              linearGradientProps={{
                colors: gradientDisabledButton,
                start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
              }}
            />

          }

          {this.state.selectedButton === 2 ?
            <Button
              title="Cheapest"
              titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
              onPress={() => this.setState({ selectedButton: 2 })}
              buttonStyle={{ height: screenHeight / 14, borderRadius: 0 }}
              containerStyle={{ width: screenWidth / 3, opacity: 1 }}
              ViewComponent={require('react-native-linear-gradient').default}
              linearGradientProps={{
                colors: gradientColorButton,
                start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
              }}
            />
            :
            <Button
              title="Cheapest"
              titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
              onPress={() => this.setState({ selectedButton: 2 })}
              buttonStyle={{ height: screenHeight / 14, borderRadius: 0 }}
              containerStyle={{ width: screenWidth / 3, opacity: 1 }}
              ViewComponent={require('react-native-linear-gradient').default}
              linearGradientProps={{
                colors: gradientDisabledButton,
                start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
              }}
            />

          }

          {this.state.selectedButton === 3 ?
            <Button
              title="Fastest"
              titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
              onPress={() => this.setState({ selectedButton: 3 })}
              buttonStyle={{ height: screenHeight / 14, borderRadius: 0 }}
              containerStyle={{ width: screenWidth / 3, opacity: 1 }}
              ViewComponent={require('react-native-linear-gradient').default}
              linearGradientProps={{
                colors: gradientColorButton,
                start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
              }}
            />
            :
            <Button
              title="Fastest"
              titleStyle={{ fontFamily: 'Raleway-Light', color: 'white' }}
              onPress={() => this.setState({ selectedButton: 3 })}
              buttonStyle={{ height: screenHeight / 14, borderRadius: 0 }}
              containerStyle={{ width: screenWidth / 3, opacity: 1 }}
              ViewComponent={require('react-native-linear-gradient').default}
              linearGradientProps={{
                colors: gradientDisabledButton,
                start: { x: 0.0, y: 0.0 }, end: { x: 0, y: 1.0 },
              }}
            />

          }
        </View>
        <View style={{ marginTop: 20, zIndex: 103, flexDirection: 'row', justifyContent: 'center' }} >
          <View style={{ width: screenWidth * 39 / 40, flexDirection: 'column', backgroundColor: '#f2f2f2', borderRadius: 20 }} >
            <ScrollView style={{ height: screenHeight * 5 / 8, borderRadius: 20 }} >
              {this.listTickets()}
            </ScrollView>
          </View>
        </View>

      </View>
    )
  }
}

export default NewFlight;