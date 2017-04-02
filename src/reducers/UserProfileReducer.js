import {
  GET_USER,
  GET_USER_SKILLS,
  IMAGE_CHANGED,
  OPEN_MODAL,
  CLOSE_MODAL,
  UPLOAD_IMAGE_USER,
  GET_RELATIONSHIP_USER,
  DELETE_RELATIONSHIP_USER,
  CANCEL_INVITATION_USER,
  ADD_INVITATION_USER,
  CONFIRM_INVITATIONS
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
  show: false,
  modalchange: false,
  loading: false,
  relationship: { success: false,
                  data: {
                    _id: '',
                    from: '',
                    to: '',
                    accepted: false
                    }
                }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
          return { ...state, user: action.payload };
    case GET_USER_SKILLS:
          return { ...state, skills: action.payload };
    case IMAGE_CHANGED:
          return { ...state, user: { ...state.user, photo: action.payload }, photo: action.photo, show: true };
    case OPEN_MODAL:
          return { ...state, modalchange: true };
    case CLOSE_MODAL:
          return { ...state, modalchange: false };
    case UPLOAD_IMAGE_USER:
          return { ...state, loading: action.payload, show: false };
    case GET_RELATIONSHIP_USER:
          return { ...state, relationship: action.payload };
    case DELETE_RELATIONSHIP_USER:
          return { ...state, relationship: { ...state.relationship, success: false } };
    case CANCEL_INVITATION_USER:
          return { ...state, relationship: { ...state.relationship, success: false } };
    case ADD_INVITATION_USER:
          return { ...state, relationship: { success: true, data: { ...state.relationship.data, _id: action.payload } } };
    case CONFIRM_INVITATIONS:
          return { ...state, relationship: { success: true, data: { ...state.relationship.data, accepted: true } } };
    default:
      return state;
  }
};
