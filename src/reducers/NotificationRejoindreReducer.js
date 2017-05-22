import {
  GET_NOTIFICATIONS_REJOINDRE_TEAM,
  LOADING_NOTIFICATIONS_REJOINDRE_TEAM,
  DELETE_NOTIFICATIONS_REJOINDRE_TEAM,
  ACCEPT_NOTIFICATIONS_REJOINDRE_TEAM,
  REJECT_MATCH,
  ACCEPTED_MATCH
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
      return { ...state, notificationsRejoindre: state.notificationsRejoindre.filter((notificationRejoindre) => { return (notificationRejoindre._id !== action.payload); }) };
    case ACCEPT_NOTIFICATIONS_REJOINDRE_TEAM: {
        let newNotifications = state.notificationsRejoindre.slice();
        newNotifications.forEach((item) => {
          if (action.payload === item._id) {
             item.joinTeam.accepted = true;
          }
        });
      return { ...state, notificationsRejoindre: newNotifications };
    }
    case REJECT_MATCH:
      return { ...state, notificationsRejoindre: state.notificationsRejoindre.filter((notificationRejoindre) => { return (notificationRejoindre._id !== action.payload); }) };
    case ACCEPTED_MATCH: {
        let newNotifications = state.notificationsRejoindre.slice();
        newNotifications.forEach((item) => {
          if (action.payload === item._id) {
             item.joinMatch.accepted = true;
          }
        });
      return { ...state, notificationsRejoindre: newNotifications };
    }
    default:
      return state;
  }
};
