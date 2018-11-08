export const SEND_REQUEST = 'SEND_REQUEST';
export const LOCATION_WATCHER = 'LOCATION_WATCHER';
export const SHOW_USER = 'SHOW_USER';
export const REGION_WATCHER = 'REGION_WATCHER';
export const MEAN_OF_TRANSPORTATION = 'MEAN_OF_TRANSPORTATION;'
export const IS_TICKET_REGISTERED = 'IS_TICKET_REGISTERED';

export function sendRequest(uri) {
  return { type: SEND_REQUEST, uri: uri }
}

export const locationWatcher = (location) => {
  return {
    type: LOCATION_WATCHER,
    payload: location,
  };
};

export const regionWatcher = (region) => {
  return {
    type: REGION_WATCHER,
    payload: region,
  };
};

export const showUser = (shouldShow) => {
  return {
    type: SHOW_USER,
    payload: shouldShow,
  };
};

export const meanOfTransportation = (vehicle) => {
  return {
    type: MEAN_OF_TRANSPORTATION,
    payload: vehicle,
  };
};

export const isTicketRegistered = (isRegistered) => {
  return {
    type: IS_TICKET_REGISTERED,
    payload: isRegistered,
  };
};