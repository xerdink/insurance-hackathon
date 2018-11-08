import { SEND_REQUEST } from './action';

const initialState = [];

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEND_REQUEST: {
      /* Send a request */
      console.log('Sending request');
      return state;
    }
  
    default:
      return state;
  }
}

export default rootReducer;