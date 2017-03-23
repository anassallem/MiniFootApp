import {
  GET_USER,
  GET_USER_SKILLS
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  skills: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
          return { ...state, user: action.payload };
    case GET_USER_SKILLS:
          return { ...state, skills: action.payload };

    default:
      return state;
  }
};
