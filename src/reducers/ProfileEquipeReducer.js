import {
  GET_TEAM_BY_ID,
  START_REFRESH_PROFILE_TEAM,
  GET_IMAGES_TEAM_PROFIL,
  GET_ID_USER,
  REJOINDRE_TEAM,
  CANCEL_REJOINDRE_TEAM
} from '../actions/types';

const logoEquipe = require('../components/assets/logoEquipe.jpg');
const imgUser = require('../components//assets/userdefault.png');

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
  matchs: [{ id: 1, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
          { id: 2, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
          { id: 3, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
          { id: 4, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 }],
  playerRejoindreTeam: { success: false, data: {} }

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
        return { ...state, playerRejoindreTeam: action.payload };
    case CANCEL_REJOINDRE_TEAM:
        return { ...state, playerRejoindreTeam: { ...state.playerRejoindreTeam, success: false } };
    default:
      return state;
  }
};
