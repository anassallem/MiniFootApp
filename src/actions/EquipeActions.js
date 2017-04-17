import { createTeam } from './api/EquipeApi';
import {
  CHANGE_STEP_ONE,
  CHANGE_STEP_TOW,
  EQUIPE_NAME_CHANGED,
  EQUIPE_VILLE_CHANGED,
  EQUIPE_DESCRIPTION_CHANGED,
  EQUIPE_IMAGE_CHANGED,
  CREATE_EQUIPE,
  CREATE_EQUIPE_SUCCESS,
  CREATE_EQUIPE_FAIL,
} from './types';

export const createEquipe = (equipe, data) => {
  return (dispatch) => {
    dispatch({ type: CREATE_EQUIPE });
    createTeam(equipe, data).then((res) => {
      console.log(res);
      if (res.success === true) {
        createEquipeSuccess(dispatch, res);
      } else if (res.success === false) {
        createEquipeFail(dispatch);
      }
      }, (err) => {
        console.log(err);
      }
    );
    };
};

const createEquipeFail = (dispatch, message) => {
  dispatch({
    type: CREATE_EQUIPE_FAIL,
    payload: message
  });
};

const createEquipeSuccess = (dispatch) => {
  dispatch({
    type: CREATE_EQUIPE_SUCCESS,
  });
};

export const equipeNameChanged = (text) => {
  const valid = validateEmpty(text);
  return {
    type: EQUIPE_NAME_CHANGED,
    payload: text,
    validate: valid
  };
};

export const equipeVilleChanged = (text) => {
  const valid = validateEmpty(text);
  return {
    type: EQUIPE_VILLE_CHANGED,
    payload: text,
    validate: valid
  };
};

export const equipeDescriptionChanged = (text) => {
  const valid = validateEmpty(text);
  return {
    type: EQUIPE_DESCRIPTION_CHANGED,
    payload: text,
    validate: valid
  };
};

export const changeImageEquipe = (uri, data) => {
  return {
    type: EQUIPE_IMAGE_CHANGED,
    payload: uri,
    data
  };
};

export const changeStepOne = () => {
  return {
    type: CHANGE_STEP_ONE
  };
};

export const changeStepTow = () => {
  return {
    type: CHANGE_STEP_TOW
  };
};

function validateEmpty(text) {
  if (text === '') {
    return false;
  }
  return true;
}
