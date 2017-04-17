import {
  CHANGE_STEP_ONE,
  CHANGE_STEP_TOW,
  EQUIPE_NAME_CHANGED,
  EQUIPE_VILLE_CHANGED,
  EQUIPE_DESCRIPTION_CHANGED,
  EQUIPE_IMAGE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  steps: 0,
  name: '',
  ville: '',
  description: '',
  logo: '',
  testName: null,
  testVille: null,
  testDescription: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EQUIPE_NAME_CHANGED:
      return { ...state, name: action.payload, testName: action.validate };
    case EQUIPE_VILLE_CHANGED:
      return { ...state, ville: action.payload, testVille: action.validate };
    case EQUIPE_DESCRIPTION_CHANGED:
      return { ...state, description: action.payload, testDescription: action.validate };
    case EQUIPE_IMAGE_CHANGED:
      return { ...state, logo: action.payload };
    case CHANGE_STEP_ONE:
      return { ...state, steps: 1 };
    case CHANGE_STEP_TOW:
      return { ...state, steps: 2 };
    default:
      return state;
  }
};
