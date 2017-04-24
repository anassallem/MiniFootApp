import {
  GET_NOTIFICATIONS,
  START_LOADING_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  ACCEPT_NOTIFICATIONS
} from '../actions/types';

const INITIAL_STATE = {
  notifications: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload, loading: false };
    case START_LOADING_NOTIFICATIONS:
      return { ...state, loading: true };
    case DELETE_NOTIFICATIONS:
      return { ...state, notifications: state.notifications.filter((notification) => { return (notification._id === action.payload) ? false : true; }) };
    case ACCEPT_NOTIFICATIONS: {
      let clone = state.notifications.slice();
      clone.forEach((notification) => {
         if (notification._id === action.payload) {
             notification.rejoin.accepted = true;
         }
      })
      return { ...state, notifications: clone };
     }
    default:
      return state;
  }
};
