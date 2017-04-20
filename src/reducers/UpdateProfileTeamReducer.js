import { TEAM_UPDATE, REFRESH_UPDATE_TEAM_START, UPDATE_TEAM_PROFIL } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  adresse: '',
  description: '', 
  refresh: false,
  testName: true,
  testAdresse: true,
  testDescription: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAM_UPDATE:
    console.log(action.payload.prop);
    return { ...state, [action.payload.prop]: action.payload.value, [action.valid.idChamps]: action.valid.validate };
    case REFRESH_UPDATE_TEAM_START:
      return { ...state, refresh: true };
    case UPDATE_TEAM_PROFIL:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
