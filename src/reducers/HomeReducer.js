import {
  GET_USER_CACHE,
  SOCKET_CHANGED,
  INITIAL_STATE_HOME,
  CHANGE_NUMBER_NOTIFY_HOME,
  PAGE_HOME_CHANGED,
  MENU_HOME_CHANGED,
  CHANGE_NUMBER_NOTIFY_TEAM,
  CHANGE_NUMBER_NOTIFY_ADVERTS,
  //discussion
  GET_MY_ROOMS,
  ON_NEW_MESSAGE_RECEIVE,
  CHANGE_ROOM_TO_VUE
} from '../actions/types';

const INITIAL_STATE = {
  rooms: [],
  socket: null,
  numberNotify: 0,
  numberNotifyTeam: 0,
  numberNotifyAdverts: 0,
  notify: '',
  menu: '',
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_CACHE:
        return { ...state, user: action.payload };
    case GET_MY_ROOMS:
        return { ...state, rooms: action.payload };
    case SOCKET_CHANGED:
        return { ...state, socket: action.payload };
    case INITIAL_STATE_HOME:
        return { ...INITIAL_STATE };
    case CHANGE_NUMBER_NOTIFY_HOME:
        return { ...state, numberNotify: state.numberNotify + 1 };
    case CHANGE_NUMBER_NOTIFY_TEAM:
        return { ...state, numberNotifyTeam: state.numberNotifyTeam + 1 };
    case CHANGE_NUMBER_NOTIFY_ADVERTS:
        return { ...state, numberNotifyAdverts: state.numberNotifyAdverts + 1 };
    case PAGE_HOME_CHANGED:
        return { ...state, notify: action.payload };
    case MENU_HOME_CHANGED:
        return { ...state, menu: action.payload };
    case ON_NEW_MESSAGE_RECEIVE: {
        let newRooms = [];
        state.rooms.forEach((item) => {
            if (item._id === action.payload._id) {
                newRooms.push(action.payload);
            } else {
                newRooms.push(item);
            }
        });
        return { ...state, rooms: newRooms };
    }
    case CHANGE_ROOM_TO_VUE: {
        let newRooms = [];
        state.rooms.forEach((item) => {
            if (item._id === action.idRoom) {
                item.vue = 1;
                item.user = action.user;
                newRooms.push(item);
            } else {
                newRooms.push(item);
            }
        });
        return { ...state, rooms: newRooms };
    }
    default:
      return state;
  }
};
