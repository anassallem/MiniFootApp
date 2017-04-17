import { getTeams } from './api/EquipeApi';
import {
  FETCH_TEAMS,
  LOADING_TEAMS
} from './types';

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
