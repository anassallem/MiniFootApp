import {
  GET_MY_ROOMS,
  SOCKET_CHANGED,
  INITIAL_STATE_HOME,
  CHANGE_NUMBER_NOTIFY_HOME,
  PAGE_HOME_CHANGED,
  MENU_HOME_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  rooms: [],
  socket: null,
  numberNotify: 0,
  notify: '',
  menu: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MY_ROOMS:
        return { ...state, rooms: action.payload };
    case SOCKET_CHANGED:
        return { ...state, socket: action.payload };
    case INITIAL_STATE_HOME:
        return { ...INITIAL_STATE };
    case CHANGE_NUMBER_NOTIFY_HOME:
        return { ...state, numberNotify: state.numberNotify + 1 };
    case PAGE_HOME_CHANGED:
        return { ...state, notify: action.payload };
    case MENU_HOME_CHANGED:
        return { ...state, menu: action.payload };
    default:
      return state;
  }
};
