import { AsyncStorage } from 'react-native';
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
  INITIAL_STATE_EQUIPE
} from './types';

export const createEquipe = (equipe, data) => {
  return (dispatch) => {
    dispatch({ type: CREATE_EQUIPE });
    createTeam(equipe, data).then((res) => {
      if (res.success === true) {
        setCache(res.message);
        createEquipeSuccess(dispatch, res.message);
      } else if (res.success === false) {
        createEquipeFail(dispatch);
      }
      }, (err) => {
        console.log(err);
      }
    );
    };
};

const createEquipeFail = (dispatch) => {
  dispatch({
    type: CREATE_EQUIPE_FAIL
  });
};

const createEquipeSuccess = (dispatch, equipe) => {
  dispatch({
    type: CREATE_EQUIPE_SUCCESS,
    payload: equipe
  });
};

function setCache(equipe) {
  try {
     AsyncStorage.setItem('equipe', JSON.stringify(equipe));
    } catch (error) {
      console.log(error);
    }
}

export const equipeNameChanged = (text) => {
  const valid = validateEmpty(text);
  return {
    type: EQUIPE_NAME_CHANGED,
    payload: text,
    validate: valid
  };
};

export const initialState = () => {
  return {
    type: INITIAL_STATE_EQUIPE
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

export const changeStepTow = (equipe) => {
    return {
      type: CHANGE_STEP_TOW,
      payload: equipe
    };
};

function validateEmpty(text) {
  if (text === '') {
    return false;
  }
  return true;
}
