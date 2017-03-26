import {
  GET_USER,
  GET_USER_SKILLS,
  IMAGE_CHANGED,
  OPEN_MODAL,
  CLOSE_MODAL,
  UPLOAD_IMAGE_USER
} from '../actions/types';

const INITIAL_STATE = {
  user: {
    firstname: '',
    lastname: '',
    adresse: '',
    city: '',
    photo: null,
    phone: 0,
    email: '',
    password: '',
    role: 'Joueur',
    joueur: {
        poste: '',
        taille: 0,
        poid: 0,
        age: 0,
        type: 'Joueur'
    }
  },
  skills: {},
  photo: null,
  modalchange: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
          return { ...state, user: action.payload };
    case GET_USER_SKILLS:
          return { ...state, skills: action.payload };
    case IMAGE_CHANGED:
          return { ...state, user: { ...state.user, photo: action.payload }, photo: action.photo };
    case OPEN_MODAL:
          return { ...state, modalchange: true };
    case CLOSE_MODAL:
          return { ...state, modalchange: false };
    case UPLOAD_IMAGE_USER:
          return { ...state };

    default:
      return state;
  }
};
