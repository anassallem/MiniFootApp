import {
  GET_PLAYER_TEAM_BY_ID,
  START_REFRESH_MEMBRE_TEAM,
  GET_ALL_USERS_EQUIPE,
  GET_ALL_USERS_EQUIPE_MORE,
  SEARCH_PLAYERS_TEAM_CHANGED,
  ADD_PLAYER_TO_LIST_TAGS,
  FILTER_PLAYER_LIST_TAGS,
  START_LOAD_NOTIFICATION_EQUIPE,
  STOP_LOAD_NOTIFICATION_EQUIPE
} from '../actions/types';

const INITIAL_STATE = {
  players: [],
  users: [],
  tags: [],
  search: '',
  refresh: false,
  loading: false,
  page: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLAYER_TEAM_BY_ID:
      return { ...state, players: action.payload, refresh: false };
    case START_REFRESH_MEMBRE_TEAM:
      return { ...state, refresh: true };
    case SEARCH_PLAYERS_TEAM_CHANGED:
      return { ...state, search: action.payload };
    case GET_ALL_USERS_EQUIPE:
      return { ...state, users: action.payload, refresh: false, page: 1 };
    case GET_ALL_USERS_EQUIPE_MORE:
      return { ...state, users: [...state.users, ...action.payload], refresh: false, page: state.page + 1 };
    case ADD_PLAYER_TO_LIST_TAGS:
      return { ...state, tags: action.payload, search: '' };
    case FILTER_PLAYER_LIST_TAGS:
      return { ...state, tags: action.payload };
    case START_LOAD_NOTIFICATION_EQUIPE:
      return { ...state, loading: true };
    case STOP_LOAD_NOTIFICATION_EQUIPE:
      return { ...state, loading: false, search: '', tags: [], users: [] };
    default:
      return state;
  }
};
