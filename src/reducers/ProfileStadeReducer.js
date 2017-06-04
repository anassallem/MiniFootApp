import {
    ADD_LIKE_TO_STADE,
    VERIF_LIKE_TO_STADE,
    DELETE_LIKE_TO_STADE
} from '../actions/types';

const INITIAL_STATE = {
  etat: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_LIKE_TO_STADE:
      return { ...state, etat: true };
    case VERIF_LIKE_TO_STADE:
      return { ...state, etat: true };
    case DELETE_LIKE_TO_STADE:
      return { ...state, etat: false };
    default:
      return state;
  }
};
