import {
    GET_PLAYER_TEAM_BY_ID_FORMATION,
    START_REFRESH_MEMBRE_TEAM_FORMATION,
    FILTER_PLAYER_LIST_TAG_FORMATION,
    ADD_PLAYER_TO_LIST_TAGS_FORMATION,
    INITIAL_STATE_FORMATION
} from '../actions/types';

const INITIAL_STATE = {
  players: [],
  tags: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLAYER_TEAM_BY_ID_FORMATION:
      return { ...state, players: action.payload, loading: false };
    case START_REFRESH_MEMBRE_TEAM_FORMATION:
      return { ...state, loading: true };
    case FILTER_PLAYER_LIST_TAG_FORMATION:
      return { ...state, tags: action.payload };
    case ADD_PLAYER_TO_LIST_TAGS_FORMATION:
      return { ...state, tags: action.payload };
    case INITIAL_STATE_FORMATION:
      return { ...state, tags: [], loading: false };
    default:
      return state;
  }
};
