import {
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  TOKEN_CHANGED,
  MESSAGE_ERROR_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  loading: false,
  testEmail: null,
  testPassword: null,
  token: '',
  notification: null
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_EMAIL_CHANGED:
      return { ...state, email: action.payload, testEmail: action.validate };
    case LOGIN_PASSWORD_CHANGED:
      return { ...state, password: action.payload, testPassword: action.validate };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case TOKEN_CHANGED:
      return { ...state, token: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, testPassword: null, testEmail: null, password: '', loading: false };
    case MESSAGE_ERROR_CHANGED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
