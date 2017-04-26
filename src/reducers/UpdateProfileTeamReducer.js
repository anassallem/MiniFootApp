import { TEAM_UPDATE, REFRESH_UPDATE_TEAM_START, UPDATE_TEAM_PROFIL,
         UPDATE_IMAGE_TEAM_CHANGED, UPLOAD_IMAGE_TEAM
 } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  adresse: '',
  description: '',
  refresh: false,
  testName: true,
  testAdresse: true,
  testDescription: true,
  display: false,
  logo: undefined,
  data: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value, [action.valid.idChamps]: action.valid.validate };
    case REFRESH_UPDATE_TEAM_START:
      return { ...state, refresh: true };
    case UPDATE_TEAM_PROFIL:
      return { ...INITIAL_STATE };
    case UPDATE_IMAGE_TEAM_CHANGED:
        return { ...state, logo: action.payload, data: action.data, display: true };
    case UPLOAD_IMAGE_TEAM:
              return { ...state, refresh: action.payload, display: false };

    default:
      return state;
  }
};
