import {
  SEARCH_CHANGED,
  FETCH_PLAYERS,
  LOADING_PLAYERS
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
  players: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
          return { ...state, text: action.payload };
    case FETCH_PLAYERS:
          console.log(action.payload);
          return { ...state, players: action.payload, loading: false };
    case LOADING_PLAYERS:
          return { ...state, loading: true };
    default:
      return state;
  }
};
