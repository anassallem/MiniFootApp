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
  MESSAGE_REGISTER_ERROR_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  steps: 0,
  name: '',
  ville: '',
  description: '',
  logo: '',
  testName: null,
  testVille: null,
  testDescription: null,
  loading: false,
  error: '',
  data: null,
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
      return { ...state, logo: action.payload, data: action.data };
    case CREATE_EQUIPE:
          return { ...state, loading: true, error: '' };
    case CREATE_EQUIPE_SUCCESS:
          return { ...INITIAL_STATE, steps: 3 };
    case CREATE_EQUIPE_FAIL:
          return { ...state, error: action.payload, loading: false };
    case MESSAGE_REGISTER_ERROR_CHANGED:
          return { ...state, error: action.payload, loading: false };
    case CHANGE_STEP_ONE:
      return { ...state, steps: 1 };
    case CHANGE_STEP_TOW:
      return { ...state, steps: 2 };
    default:
      return state;
  }
};
