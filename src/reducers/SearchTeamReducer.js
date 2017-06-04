import {
  SEARCH_TEAM,
  FETCH_TEAMS,
  LOADING_TEAMS,
  FETCH_TEAMS_MORE
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
  teams: [],
  loading: false,
  page: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_TEAM:
          return { ...state, text: action.payload };
    case FETCH_TEAMS:
          return { ...state, teams: action.payload, loading: false, page: 1 };
    case FETCH_TEAMS_MORE:
          return { ...state, teams: [...state.teams, ...action.payload], loading: false, page: state.page + 1 };
    case LOADING_TEAMS:
          return { ...state, loading: true };
    default:
      return state;
  }
};
