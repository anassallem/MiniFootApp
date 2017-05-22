import {
    PROFILE_STADE_OPEN_MODAL,
    ADD_LIKE_TO_STADE,
    VERIF_LIKE_TO_STADE,
    DELETE_LIKE_TO_STADE
} from '../actions/types';

const INITIAL_STATE = {
  visible: false,
  photo: '',
  etat: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_STADE_OPEN_MODAL:
      return { ...state, visible: !state.visible, photo: action.payload };
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
