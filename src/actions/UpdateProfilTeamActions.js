import { AsyncStorage } from 'react-native';
import { updateTeam, uploadLogoTeam } from './api/EquipeApi';
import { TEAM_UPDATE, UPDATE_TEAM_PROFIL, REFRESH_UPDATE_TEAM_START, UPDATE_IMAGE_TEAM_CHANGED, UPLOAD_IMAGE_TEAM
 } from './types';

export const teamUpdate = (prop, value, idChamps) => {
  const validate = testChamps(prop, value);
  return {
    type: TEAM_UPDATE,
    payload: { prop, value },
    valid: { idChamps, validate }
  };
};

export const updateImageTeam = (uri, data, display) => {
  return {
    type: UPDATE_IMAGE_TEAM_CHANGED,
    payload: uri,
    data,
    display
  };
};

export const uploadImageTeam = (idEquipe, logo) => {
          console.log(idEquipe, logo);
  return (dispatch) => {
      dispatch({ type: UPLOAD_IMAGE_TEAM, payload: true });
      uploadLogoTeam(idEquipe, logo).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
            dispatch({ type: UPLOAD_IMAGE_TEAM, payload: false });
        }
      });
  };
};
function testChamps(prop, value) {
  switch (prop) {
    case 'name':
      return testChampVide(value);
    case 'adresse':
      return testChampVide(value);
    case 'description':
      return testChampVide(value);
    default:
        return true;
  }
}

export const updateTeamProfil = (idTeam, team) => {
  return (dispatch) => {
      dispatch({ type: REFRESH_UPDATE_TEAM_START });
      updateTeam(idTeam, team).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          AsyncStorage.mergeItem('team', JSON.stringify(team), () => {
            dispatch({ type: UPDATE_TEAM_PROFIL });
          });
        }
      });
  };
};

function testChampVide(text) {
  if (text === '') {
    return false;
  }
  return true;
}
