import {
  SEARCH_TEAM,
  FETCH_TEAMS,
  LOADING_TEAMS
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
  teams: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_TEAM:
          return { ...state, text: action.payload };
    case FETCH_TEAMS:
          return { ...state, teams: action.payload, loading: false };
    case LOADING_TEAMS:
          return { ...state, loading: true };
    default:
      return state;
  }
};
