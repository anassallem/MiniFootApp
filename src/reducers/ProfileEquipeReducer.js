import {
  GET_TEAM_BY_ID,
  START_REFRESH_PROFILE_TEAM
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
  refresh: false,
  photosEquipe: [{ id: 1, image: logoEquipe }, { id: 2, image: logoEquipe },
                                { id: 3, image: logoEquipe }, { id: 4, image: logoEquipe },
                                { id: 5, image: logoEquipe }, { id: 6, image: logoEquipe }],
  photos: [{ id: 1, name: 'Riadh', image: imgUser }, { id: 2, name: 'Mohamed', image: imgUser },
          { id: 3, name: 'Youssef', image: imgUser }, { id: 4, name: 'Nabil', image: imgUser },
          { id: 5, name: 'Anas', image: imgUser }, { id: 6, name: 'Salem', image: imgUser },
          { id: 7, name: 'Marwan', image: imgUser }, { id: 8, name: 'Fredj', image: imgUser }],
  matchs: [{ id: 1, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
          { id: 2, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
          { id: 3, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
          { id: 4, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 }]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TEAM_BY_ID:
      return { ...state, team: action.payload, refresh: false };
    case START_REFRESH_PROFILE_TEAM:
      return { ...state, refresh: true };
    default:
      return state;
  }
};
