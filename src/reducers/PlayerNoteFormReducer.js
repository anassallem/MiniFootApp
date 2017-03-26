import {
  CHANGE_RATING_ATTAQUE,
  CHANGE_RATING_DEFENCE,
  CHANGE_RATING_MILIEU,
  CHANGE_RATING_GARDIEN,
  LOADING_SKILLS
} from '../actions/types';

const INITIAL_STATE = {
  attaque: 0,
  defence: 0,
  milieu: 0,
  gardien: 0,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_RATING_ATTAQUE:
          return { ...state, attaque: action.payload };
    case CHANGE_RATING_DEFENCE:
          return { ...state, defence: action.payload };
    case CHANGE_RATING_MILIEU:
          return { ...state, milieu: action.payload };
    case CHANGE_RATING_GARDIEN:
          return { ...state, gardien: action.payload };
    case LOADING_SKILLS:
          return { ...INITIAL_STATE, loading: action.payload };
    default:
      return state;
  }
};
