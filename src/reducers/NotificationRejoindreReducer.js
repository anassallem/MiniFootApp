import {
  GET_NOTIFICATIONS_REJOINDRE_TEAM,
  LOADING_NOTIFICATIONS_REJOINDRE_TEAM,
  DELETE_NOTIFICATIONS_REJOINDRE_TEAM,
  ACCEPT_NOTIFICATIONS_REJOINDRE_TEAM,
} from '../actions/types';

const INITIAL_STATE = {
  notificationsRejoindre: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_REJOINDRE_TEAM:
      return { ...state, notificationsRejoindre: action.payload, loading: false };
    case LOADING_NOTIFICATIONS_REJOINDRE_TEAM:
      return { ...state, loading: true };
    case DELETE_NOTIFICATIONS_REJOINDRE_TEAM:
      return { ...state, notificationsRejoindre: state.notificationsRejoindre.filter((notificationRejoindre) => { return (notificationRejoindre._id === action.payload) ? false : true; }) };
    case ACCEPT_NOTIFICATIONS_REJOINDRE_TEAM:
      return { ...state, notificationsRejoindre: state.notificationsRejoindre.filter((notificationRejoindre) => { return (notificationRejoindre._id === action.payload) ? false : true; }) };
    default:
      return state;
  }
};
