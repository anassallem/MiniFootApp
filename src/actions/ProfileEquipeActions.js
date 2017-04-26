import { getTeamByID, getAllPhotosTeam, rejoindreTeam } from './api/EquipeApi';
import {
  GET_TEAM_BY_ID,
  START_REFRESH_PROFILE_TEAM,
  GET_IMAGES_TEAM_PROFIL,
  REJOINDRE_TEAM,
  GET_ID_USER
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

export const addInvitationRejoindre = (idUser, idEquipe) => {
  console.log(idUser, idEquipe);
    return (dispatch) => {
        rejoindreTeam(idUser, idEquipe).then((res, err) => {
          if (err) {
            console.log(err);
          } else {
              dispatch({ type: REJOINDRE_TEAM, payload: res });
          }
        });
    };
};

export const getIdUser = (idUser) => {
  return {
    type: GET_ID_USER,
    payload: idUser
  };
};
