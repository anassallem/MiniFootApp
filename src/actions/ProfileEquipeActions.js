import { getTeamByID } from './api/EquipeApi';
import {
  GET_TEAM_BY_ID,
  START_REFRESH_PROFILE_TEAM
} from './types';

export const getTeam = (idEquipe) => {
  return (dispatch) => {
    dispatch({ type: START_REFRESH_PROFILE_TEAM });
    getTeamByID(idEquipe).then((res) => {
      dispatch({ type: GET_TEAM_BY_ID, payload: res });
      }, (err) => {
        console.log(err);
      }
    );
    };
};
