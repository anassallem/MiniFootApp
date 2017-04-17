import {
  CHANGE_STEP_ONE,
  CHANGE_STEP_TOW,
  EQUIPE_NAME_CHANGED,
  EQUIPE_VILLE_CHANGED,
  EQUIPE_DESCRIPTION_CHANGED,
  EQUIPE_IMAGE_CHANGED
} from './types';

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

export const changeImageEquipe = (uri) => {
  return {
    type: EQUIPE_IMAGE_CHANGED,
    payload: uri
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
