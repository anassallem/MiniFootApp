import { getTeams } from './api/EquipeApi';
import {
  FETCH_TEAMS,
  LOADING_TEAMS,
  SEARCH_TEAM,
  FETCH_TEAMS_MORE
} from './types';

export const searchTeamChanged = (text) => {
  return {
    type: SEARCH_TEAM,
    payload: text,
  };
};
export const fetchTeams = (text, page) => {
  return (dispatch) => {
    dispatch({ type: LOADING_TEAMS });
    getTeams(text, page).then((res) => {
        if (page === 0) {
            dispatch({ type: FETCH_TEAMS, payload: res });
        } else {
            dispatch({ type: FETCH_TEAMS_MORE, payload: res });
        }
        }, (err) => {
          console.log(err);
        }
      );
  };
};
