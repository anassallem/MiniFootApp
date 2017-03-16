import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  loading: false,
  testEmail: null,
  testPassword: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, testEmail: action.validate };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, testPassword: action.validate };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    default:
      return state;
  }
};
