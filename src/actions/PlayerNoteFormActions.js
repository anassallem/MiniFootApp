import {
  CHANGE_RATING_ATTAQUE,
  CHANGE_RATING_DEFENCE,
  CHANGE_RATING_MILIEU,
  CHANGE_RATING_GARDIEN,
  LOADING_SKILLS
} from './types';
import { postUserSkills } from './api/UserApi';

export const addSkills = (idUser, skills, from) => {
  return (dispatch) => {
    dispatch({ type: LOADING_SKILLS, payload: true });
    postUserSkills(idUser, skills, from).then((res) => {
      dispatch({ type: LOADING_SKILLS, payload: false });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const changeRatingAttaque = (rating) => {
  return {
    type: CHANGE_RATING_ATTAQUE,
    payload: rating
  };
};

export const changeRatingDefence = (rating) => {
  return {
    type: CHANGE_RATING_DEFENCE,
    payload: rating
  };
};

export const changeRatingMilieu = (rating) => {
  return {
    type: CHANGE_RATING_MILIEU,
    payload: rating
  };
};

export const changeRatingGardien = (rating) => {
  return {
    type: CHANGE_RATING_GARDIEN,
    payload: rating
  };
};
