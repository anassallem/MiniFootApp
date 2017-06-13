import {
  GET_PLAYER_ONLINE,
  SWITCH_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  switcher: true,
  online: [],
  message: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_CHANGED:
      return { ...state, switcher: !state.switcher };
    case GET_PLAYER_ONLINE:
      return { ...state, online: action.payload };
    default:
      return state;
  }
};
