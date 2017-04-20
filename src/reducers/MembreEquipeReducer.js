import {
  GET_PLAYER_TEAM_BY_ID,
  START_REFRESH_MEMBRE_TEAM
} from '../actions/types';

const INITIAL_STATE = {
  players: [],
  refresh: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLAYER_TEAM_BY_ID:
      return { ...state, players: action.payload, refresh: false };
    case START_REFRESH_MEMBRE_TEAM:
      return { ...state, refresh: true };
    default:
      return state;
  }
};
