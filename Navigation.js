import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Main from './screens/Main';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import MapScreen from './screens/MapScreen';
import TicketQuery from './screens/TicketQuery';
import CalculationScreen from './screens/CalculationScreen';
import NewFlight from './screens/NewFlight';
import Payment from './screens/Payment';

const StackNavigator = createStackNavigator({
  Home: { screen: Main },
  SignUp: { screen: NewFlight },
  Login: { screen: Login},
  TicketQuery: { screen: TicketQuery },
  MapScreen: { screen: MapScreen },
  CalculationScreen: { screen: CalculationScreen },
  NewFlight: { screen: NewFlight },
  Payment: { screen: Payment },
},
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  });

export default class Navigation extends React.Component {
  render () {
    return(
      <StackNavigator />
    )
  }
}