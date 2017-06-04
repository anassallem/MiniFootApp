import {
  GET_TEAM_BY_ID,
  START_REFRESH_PROFILE_TEAM,
  GET_IMAGES_TEAM_PROFIL,
  GET_ID_USER,
  REJOINDRE_TEAM,
  CANCEL_REJOINDRE_TEAM,
  CHANGE_MODAL_VISIBLE_IMAGE,
  GET_MATCH_TEAM_TERMINATED,
  INITIAL_STATE_TEAM_SEARCH
} from '../actions/types';

const INITIAL_STATE = {
  team: {
    name: '',
    adresse: '',
    logo: '',
    description: '',
    date_creation: '',
    createdBy: {},
    joueurs: []
  },
  idUser: null,
  refresh: false,
  photosEquipe: [],
  matchs: [],
  playerRejoindreTeam: null,
  etat: 0,
  modalVisible: false,
  image: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TEAM_BY_ID:
      return { ...state, team: action.payload, refresh: false };
    case START_REFRESH_PROFILE_TEAM:
      return { ...state, refresh: true };
    case GET_IMAGES_TEAM_PROFIL:
        return { ...state, photosEquipe: action.payload };
    case GET_ID_USER:
        return { ...state, idUser: action.payload };
    case REJOINDRE_TEAM:
        return { ...state, playerRejoindreTeam: action.payload, etat: 1 };
    case CANCEL_REJOINDRE_TEAM:
        return { ...state, etat: 0 };
    case CHANGE_MODAL_VISIBLE_IMAGE:
        return { ...state, modalVisible: !state.modalVisible, image: action.payload };
    case GET_MATCH_TEAM_TERMINATED:
        return { ...state, matchs: action.payload };
    case INITIAL_STATE_TEAM_SEARCH:
        return { ...state, photosEquipe: [] };
    default:
      return state;
  }
};
