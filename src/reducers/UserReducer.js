import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PASSWORDCONFIRM_CHANGED,
  NAME_CHANGED,
  LASTNAME_CHANGED,
  ADRESSE_CHANGED,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  MESSAGE_REGISTER_ERROR_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirm: '',
  firstname: '',
  lastname: '',
  adresse: '',
  testFirstName: null,
  testLastName: null,
  testAdresse: null,
  testEmail: null,
  testPassword: null,
  validPassword: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, testEmail: action.validate };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, testPassword: action.validate };
    case PASSWORDCONFIRM_CHANGED:
        return { ...state, passwordConfirm: action.payload, validPassword: action.validate };
    case NAME_CHANGED:
        return { ...state, firstname: action.payload, testFirstName: action.validate };
    case LASTNAME_CHANGED:
        return { ...state, lastname: action.payload, testLastName: action.validate };
    case ADRESSE_CHANGED:
        return { ...state, adresse: action.payload, testAdresse: action.validate };
    case CREATE_USER:
          return { ...state, loading: true, error: '' };
    case CREATE_USER_SUCCESS:
          return { ...state, ...INITIAL_STATE };
    case CREATE_USER_FAIL:
          return { ...state, error: action.payload, loading: false };
    case MESSAGE_REGISTER_ERROR_CHANGED:
          return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
