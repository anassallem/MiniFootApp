import {
  USER_UPDATE,
  UPDATE_USER_PROFIL,
  CHANGE_CARD_INFO,
  CHANGE_CARD_CARC,
  CHANGE_CARD_PASSWORD,
  UPDATE_PASSWORD,
  CONFIRM_NEW_PASSWORD,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_POSTE,
  USER_UPDATE_JOUEUR,
  REFRESH_UPDATE_START
} from '../actions/types';

const INITIAL_STATE = {
  refresh: false,
  firstname: '',
  lastname: '',
  adresse: '',
  email: '',
  city: '',
  phone: 0,
  password: '',
  passwordConfirm: '',
  changeCardInfo: false,
  changeCardCarac: false,
  changeCardPassword: false,
  validPassword: null,
  testPassword: null,
  loading: false,
  testFirstName: true,
  testLastName: true,
  testEmail: true,
  testAdresse: true,
  testCity: true,
  testPhone: true,
  testPoid: true,
  testAge: true,
  testTaille: true,
  age: 0,
  taille: 0,
  poid: 0,
  poste: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value, [action.valid.idChamps]: action.valid.validate };
    case USER_UPDATE_JOUEUR:
      return { ...state, [action.payload.prop]: action.payload.value, [action.valid.idChamps]: action.valid.validate };
    case REFRESH_UPDATE_START:
            return { ...state, refresh: true };
    case UPDATE_USER_PROFIL:
            return { ...INITIAL_STATE };
    case CHANGE_CARD_INFO:
            return { ...state, changeCardInfo: !state.changeCardInfo, changeCardCarac: false, changeCardPassword: false };
    case CHANGE_CARD_CARC:
            return { ...state, changeCardCarac: !state.changeCardCarac, changeCardInfo: false, changeCardPassword: false };
    case CHANGE_CARD_PASSWORD:
            return { ...state, changeCardPassword: !state.changeCardPassword, changeCardInfo: false, changeCardCarac: false };
    case UPDATE_USER_PASSWORD:
            return { ...state, password: '', passwordConfirm: '', testPassword: null, validPassword: null, refresh: false };
    case UPDATE_PASSWORD:
            return { ...state, password: action.payload, testPassword: action.validate };
    case CONFIRM_NEW_PASSWORD:
            return { ...state, passwordConfirm: action.payload, validPassword: action.validate };
    case UPDATE_USER_POSTE:
            return { ...state, poste: action.payload };

    default:
      return state;
  }
};
