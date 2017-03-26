import {
  GET_USER,
  GET_USER_SKILLS,
  OPEN_MODAL
} from '../actions/types';

const INITIAL_STATE = {
  user: {
    firstname: '',
    lastname: '',
    adresse: '',
    city: '',
    photo: '',
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
  modalchange: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
          return { ...state, user: action.payload };
    case GET_USER_SKILLS:
          return { ...state, skills: action.payload };
  /*  case IMAGE_CHANGED:
          return { ...state, photo: action.payload };*/
    case OPEN_MODAL:
          return { ...state, modalchange: true };
    default:
      return state;
  }
};
