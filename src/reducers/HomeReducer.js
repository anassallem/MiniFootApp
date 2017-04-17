import {
  GET_MY_ROOMS,
  SOCKET_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  rooms: [],
  socket: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MY_ROOMS:
      return { ...state, rooms: action.payload };
    case SOCKET_CHANGED:
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};
