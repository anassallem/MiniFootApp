import {
  SEARCH_CHANGED,
  FETCH_PLAYERS,
  LOADING_PLAYERS,
  FETCH_PLAYERS_MORE
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
  players: [],
  loading: false,
  page: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
          return { ...state, text: action.payload };
    case FETCH_PLAYERS:
          return { ...state, players: action.payload, loading: false, page: 1 };
    case FETCH_PLAYERS_MORE:
        return { ...state, players: [...state.players, ...action.payload], loading: false, page: state.page + 1 };
    case LOADING_PLAYERS:
          return { ...state, loading: true };
    default:
      return state;
  }
};
