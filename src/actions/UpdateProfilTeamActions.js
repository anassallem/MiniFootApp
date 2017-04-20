import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { updateTeam } from './api/EquipeApi';
import { TEAM_UPDATE, UPDATE_TEAM_PROFIL, REFRESH_UPDATE_TEAM_START } from './types';

export const teamUpdate = (prop, value, idChamps) => {
  const validate = testChamps(prop, value);
  return {
    type: TEAM_UPDATE,
    payload: { prop, value },
    valid: { idChamps, validate }
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
        console.log(idTeam, team);
        if (err) {
          console.log(err);
        } else {
          AsyncStorage.mergeItem('team', JSON.stringify(team), () => {
            dispatch({ type: UPDATE_TEAM_PROFIL });
            Actions.profileEquipe({ idEquipe: idTeam });
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
