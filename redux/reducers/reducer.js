import { SEND_REQUEST, LOCATION_WATCHER, SHOW_USER, REGION_WATCHER, MEAN_OF_TRANSPORTATION, IS_TICKET_REGISTERED } from '../action';

const initialState = {
  location: null,
  shouldShowUser: false,
  region: null,
  vehicle: 'car',
  isRegistered: false,
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEND_REQUEST: {
      /* Send a request */
      console.log('Sending request');
      return state;
    }

    case LOCATION_WATCHER: {
      return { ...state, location: action.payload }
    }

    case SHOW_USER: {
      return { ...state, shouldShowUser: action.payload }
    }

    case REGION_WATCHER: {
      return { ...state, region: action.payload }
    }

    case MEAN_OF_TRANSPORTATION: {
      return { ...state, vehicle: action.payload}
    }

    case IS_TICKET_REGISTERED: {
      return { ...state, isRegistered: action.payload }
    }
  
    default:
      return state;
  }
}

export default rootReducer;