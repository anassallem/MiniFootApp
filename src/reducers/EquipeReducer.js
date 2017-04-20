import {
  CHANGE_STEP_ONE,
  CHANGE_STEP_TOW,
  CHANGE_STEP_ZERO,
  EQUIPE_NAME_CHANGED,
  EQUIPE_VILLE_CHANGED,
  EQUIPE_DESCRIPTION_CHANGED,
  EQUIPE_IMAGE_CHANGED,
  CREATE_EQUIPE,
  CREATE_EQUIPE_SUCCESS,
  CREATE_EQUIPE_FAIL,
  MESSAGE_REGISTER_ERROR_CHANGED,
  INITIAL_STATE_EQUIPE,
  START_LOAD_MENU_EQUIPE
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
  team: null,
  user: null,
  refresh: false
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
          return { ...INITIAL_STATE, team: action.payload, steps: 2, user: action.user };
    case CREATE_EQUIPE_FAIL:
          return { ...state, error: action.payload, loading: false };
    case MESSAGE_REGISTER_ERROR_CHANGED:
          return { ...state, error: action.payload, loading: false };
    case CHANGE_STEP_ONE:
      return { ...state, steps: 1 };
    case START_LOAD_MENU_EQUIPE:
      return { ...state, refresh: true };
    case CHANGE_STEP_ZERO:
      return { ...state, steps: 0, refresh: false };
    case CHANGE_STEP_TOW:
      return { ...state, steps: 2, team: action.myTeam, user: action.payload, refresh: false };
    case INITIAL_STATE_EQUIPE:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
