import {
  PROFILE_STADE_OPEN_MODAL,
  VERIF_LIKE_TO_STADE,
  ADD_LIKE_TO_STADE,
  START_ADD_LIKE_TO_STADE,
  DELETE_LIKE_TO_STADE
} from './types';
import { addLickStade, getLickStade, deleteLickStade } from './api/StadeApi';

export const profileStadeOpenModal = (photo) => {
  return {
    type: PROFILE_STADE_OPEN_MODAL,
    payload: photo
  };
};

export const verifLickStade = (idStade, idUser) => {
    return (dispatch) => {
        getLickStade(idStade, idUser).then((res) => {
            if (res.success === true) {
                dispatch({ type: VERIF_LIKE_TO_STADE });
            } 
        }, (err) => {
            console.log(err);
        });
    };
};

export const clickLikeStade = (idStade, idUser) => {
    return (dispatch) => {
        addLickStade(idStade, idUser).then((res) => {
            dispatch({ type: ADD_LIKE_TO_STADE });
        }, (err) => {
            console.log(err);
        });
    };
};
export const clickDeslikeStade = (idStade, idUser) => {
    return (dispatch) => {
        deleteLickStade(idStade, idUser).then((res) => {
            dispatch({ type: DELETE_LIKE_TO_STADE });
        }, (err) => {
            console.log(err);
        });
    };
};
