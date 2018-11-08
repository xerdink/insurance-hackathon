import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Navigation from './Navigation';

/* I do not like to manage react-navigation navigation state
 * within main Redux state. */

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
