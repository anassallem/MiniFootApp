import { getTeamByID, getAllPhotosTeam, getPlayerInTeam, deleteRejoindreTeam } from './api/EquipeApi';
import {
  GET_TEAM_BY_ID,
  START_REFRESH_PROFILE_TEAM,
  GET_IMAGES_TEAM_PROFIL,
  REJOINDRE_TEAM,
  GET_ID_USER,
  CANCEL_REJOINDRE_TEAM,
  CHANGE_MODAL_VISIBLE_IMAGE
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
export const getPlayerBelongsTeam = (idUser, idEquipe) => {
  return (dispatch) => {
    getPlayerInTeam(idUser, idEquipe).then((res) => {
      console.log(res);
      dispatch({ type: REJOINDRE_TEAM, payload: res });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const getIdUser = (idUser) => {
  return {
    type: GET_ID_USER,
    payload: idUser
  };
};

export const cancelRejoindreTeam = (idRejoindreTeam) => {
    return (dispatch) => {
        deleteRejoindreTeam(idRejoindreTeam).then((res, err) => {
          if (err) {
            console.log(err);
          } else {
              dispatch({ type: CANCEL_REJOINDRE_TEAM, payload: res });
          }
        });
    };
};
export const changeModalVisibleImage = (image) => {
  return {
    type: CHANGE_MODAL_VISIBLE_IMAGE,
    payload: image
  };
};
