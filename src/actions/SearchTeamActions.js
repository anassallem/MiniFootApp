import { getTeams } from './api/EquipeApi';
import {
  FETCH_TEAMS,
  LOADING_TEAMS,
  SEARCH_TEAM
} from './types';

export const searchTeamChanged = (text) => {
  return {
    type: SEARCH_TEAM,
    payload: text,
  };
};
export const fetchTeams = (text) => {
  return (dispatch) => {
    dispatch({ type: LOADING_TEAMS });
    getTeams(text).then((res) => {
        dispatch({ type: FETCH_TEAMS, payload: res });
        }, (err) => {
          console.log(err);
        }
      );
  };
};
