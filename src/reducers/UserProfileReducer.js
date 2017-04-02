import {
  GET_USER,
  GET_USER_SKILLS,
  IMAGE_CHANGED,
  UPLOAD_IMAGE_USER,
  REFRESH_START
} from '../actions/types';

const INITIAL_STATE = {
  user: {
    refresh: false,
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
  show: false,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH_START:
          return { ...state, refresh: true };
    case GET_USER:
          return { ...state, user: action.payload };
    case GET_USER_SKILLS:
          return { ...state, skills: action.payload, refresh: action.refresh };
    case IMAGE_CHANGED:
          return { ...state, user: { ...state.user, photo: action.payload }, photo: action.photo, show: true };
    case UPLOAD_IMAGE_USER:
          return { ...state, loading: action.payload, show: false };

    default:
      return state;
  }
};
