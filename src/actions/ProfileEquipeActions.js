import { getTeamByID, getAllPhotosTeam } from './api/EquipeApi';
import {
  GET_TEAM_BY_ID,
  START_REFRESH_PROFILE_TEAM,
  GET_IMAGES_TEAM_PROFIL
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

export const getImagesTeamProfil = (idEquipe) => {
  return (dispatch) => {
    getAllPhotosTeam(idEquipe).then((res) => {
      if (res.photos.length > 0) {
          dispatch({ type: GET_IMAGES_TEAM_PROFIL, payload: res.photos });
      }
    }, (err) => {
      console.log(err);
    }
    );
  };
};
