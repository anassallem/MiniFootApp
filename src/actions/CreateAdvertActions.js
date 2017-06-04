import {
  DESCRIPTION_ADVERT_CHANGED,
  START_ADD_NEW_ADVERT_USER,
  INITIAL_ADD_NEW_ADVERT_USER
} from './types';

export const descriptionAdvertChanged = (text) => {
  return {
    type: DESCRIPTION_ADVERT_CHANGED,
    payload: text
  };
};

export const addAdvertUser = () => {
    return (dispatch) => {
        dispatch({ type: START_ADD_NEW_ADVERT_USER });
        setTimeout(() => {
          dispatch({ type: INITIAL_ADD_NEW_ADVERT_USER });
        }, 2000);
    };
};
