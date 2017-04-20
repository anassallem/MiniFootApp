import { AsyncStorage } from 'react-native';
import { createTeam, deletePlayerTeam } from './api/EquipeApi';
import { getUser } from './api/UserApi';
import {
  CHANGE_STEP_ZERO,
  CHANGE_STEP_ONE,
  CHANGE_STEP_TOW,
  EQUIPE_NAME_CHANGED,
  EQUIPE_VILLE_CHANGED,
  EQUIPE_DESCRIPTION_CHANGED,
  EQUIPE_IMAGE_CHANGED,
  CREATE_EQUIPE,
  CREATE_EQUIPE_SUCCESS,
  CREATE_EQUIPE_FAIL,
  INITIAL_STATE_EQUIPE,
  START_LOAD_MENU_EQUIPE
} from './types';

export const createEquipe = (equipe, data, user) => {
  return (dispatch) => {
    dispatch({ type: CREATE_EQUIPE });
    createTeam(equipe, data).then((res) => {
      if (res.success === true) {
        res.message.joueurs = undefined;
        setCache(res.message);
        createEquipeSuccess(dispatch, res.message, user);
      } else if (res.success === false) {
        createEquipeFail(dispatch);
      }
      }, (err) => {
        console.log(err);
      }
    );
    };
};

const createEquipeFail = (dispatch) => {
  dispatch({
    type: CREATE_EQUIPE_FAIL
  });
};

const createEquipeSuccess = (dispatch, equipe, user) => {
    user.user.joueur.type = 'Responsable';
    user.user.equipe = equipe._id;
    AsyncStorage.mergeItem('user', JSON.stringify(user), () => {
        dispatch({
          type: CREATE_EQUIPE_SUCCESS,
          payload: equipe,
          user: user.user
        });
    });
};

function setCache(equipe) {
  try {
     AsyncStorage.setItem('equipe', JSON.stringify(equipe));
     AsyncStorage.getItem('user').then((value) => {
       const user = JSON.parse(value);
       user.user.joueur.type = 'Responsable';
       AsyncStorage.mergeItem('user', JSON.stringify(user), () => {
       });
       }).done();
    } catch (error) {
      console.log(error);
    }
}

export const equipeNameChanged = (text) => {
  const valid = validateEmpty(text);
  return {
    type: EQUIPE_NAME_CHANGED,
    payload: text,
    validate: valid
  };
};

export const initialState = (idEquipe, idJoueur) => {
  return (dispatch) => {
      deletePlayerTeam(idEquipe, idJoueur).then((res) => {
          AsyncStorage.removeItem('equipe');
          dispatch({ type: INITIAL_STATE_EQUIPE });
      }, (err) => {
          console.log(err);
      });
    };
};

function mergeCacheUser(user, type) {
  try {
       user.user.joueur.type = type;
       AsyncStorage.mergeItem('user', JSON.stringify(user), () => {
       });
    } catch (error) {
      console.log(error);
    }
}
export const equipeVilleChanged = (text) => {
  const valid = validateEmpty(text);
  return {
    type: EQUIPE_VILLE_CHANGED,
    payload: text,
    validate: valid
  };
};

export const equipeDescriptionChanged = (text) => {
  const valid = validateEmpty(text);
  return {
    type: EQUIPE_DESCRIPTION_CHANGED,
    payload: text,
    validate: valid
  };
};

export const changeImageEquipe = (uri, data) => {
  return {
    type: EQUIPE_IMAGE_CHANGED,
    payload: uri,
    data
  };
};

export const changeStepOne = () => {
  return {
    type: CHANGE_STEP_ONE
  };
};

export const changeStepTow = (equipe, user) => {
    return (dispatch) => {
        dispatch({ type: START_LOAD_MENU_EQUIPE });
        getUser(user.user._id).then((res, err) => {
          if (err) {
            console.log(err);
          } else {
              mergeCacheUser(user, res.joueur.type);
              if (res.equipe !== undefined) {
                  setCache(res.equipe);
                  dispatch({ type: CHANGE_STEP_TOW, payload: user.user, myTeam: res.equipe });
              } else {
                  dispatch({ type: CHANGE_STEP_ZERO });
              }
          }
        });
    };
};

function validateEmpty(text) {
  if (text === '') {
    return false;
  }
  return true;
}
