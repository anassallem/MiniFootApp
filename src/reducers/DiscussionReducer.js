import {
  GET_PLAYER_ONLINE,
  SWITCH_CHANGED,
  SOCKET_CHANGED,
  GET_ALL_DISCUSSION,
  ID_USER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  switcher: true,
  players: [],
  online: [],
  mySocket: null,
  message: null,
  idUser: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_CHANGED:
      return { ...state, switcher: !state.switcher };
    case GET_PLAYER_ONLINE:
      return { ...state, online: action.payload };
    case GET_ALL_DISCUSSION:
      return { ...state, players: action.payload };
    case SOCKET_CHANGED:
      return { ...state, mySocket: action.payload };
    case ID_USER_CHANGED:
      return { ...state, idUser: action.payload };
    default:
      return state;
  }
};
