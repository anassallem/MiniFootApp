import {
  SWITCH_CHANGED,
  LOADING_MY_FRIENDS,
  GET_MY_FRIENDS,
  GET_MY_FRIENDS_MORE
} from '../actions/types';

const INITIAL_STATE = {
  players: [],
  switcher: true,
  loading: false,
  page: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_CHANGED:
        return { ...state, switcher: !state.switcher };
    case LOADING_MY_FRIENDS:
        return { ...state, loading: true };
    case GET_MY_FRIENDS:
        return { ...state, players: action.payload, loading: false, page: 1 };
    case GET_MY_FRIENDS_MORE:
        return { ...state, players: [...state.players, ...action.payload], loading: false, page: state.page + 1 };
    default:
      return state;
  }
};
