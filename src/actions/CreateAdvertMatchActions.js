import {
  EQUIPE_DESCRIPTION_ADVERT_CHANGED,
  CHECKBOX_CHANGED,
  START_ADD_NEW_ADVERT,
  INITIAL_ADD_NEW_ADVERT
} from './types';

export const equipeDescriptionAdvertChanged = (text) => {
  return {
    type: EQUIPE_DESCRIPTION_ADVERT_CHANGED,
    payload: text
  };
};
export const reverseChecked = (prop, value) => {
  return {
    type: CHECKBOX_CHANGED,
    payload: { prop, value }
  };
};
export const addNewAdvert = () => {
    return (dispatch) => {
        dispatch({ type: START_ADD_NEW_ADVERT });
        setTimeout(() => {
            dispatch({ type: INITIAL_ADD_NEW_ADVERT });
        }, 2000);
    };
};
