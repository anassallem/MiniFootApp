import { AsyncStorage } from 'react-native';
import { updateUser, updatePassword } from './api/UserApi';
import {
USER_UPDATE,
UPDATE_USER_PROFIL,
CHANGE_CARD_INFO,
CHANGE_CARD_CARC,
CHANGE_CARD_PASSWORD,
UPDATE_USER_PASSWORD,
UPDATE_PASSWORD,
CONFIRM_NEW_PASSWORD,
UPDATE_USER_POSTE,
USER_UPDATE_JOUEUR,
REFRESH_UPDATE_START
} from './types';

export const userUpdate = ({ prop, value, idChamps }) => {
  const validate = testChamps(prop, value);
  return {
    type: USER_UPDATE,
    payload: { prop, value },
    valid: { idChamps, validate }
  };
};

export const joueurUpdate = ({ prop, value, idChamps }) => {
  const validate = testChamps(prop, value);
  return {
    type: USER_UPDATE_JOUEUR,
    payload: { prop, value },
    valid: { idChamps, validate }
  };
};


function testChamps(prop, value) {
  switch (prop) {
    case 'firstname':
      return testChampVide(value);
    case 'lastname':
      return testChampVide(value);
    case 'email':
      return validateEmail(value);
    case 'adresse':
      return testChampVide(value);
    case 'city':
      return testChampVide(value);
    case 'phone':
      return validatePhone(value);
    case 'age':
      return testChampNumber(value);
    case 'poid':
      return testChampNumber(value);
    case 'taille':
      return testChampNumber(value);

    default:
        return true;
  }
}

export const updateUserPassword = (idUser, password) => {
  return (dispatch) => {
    dispatch({ type: REFRESH_UPDATE_START });
    try {
         AsyncStorage.getItem('user').then((value) => {
           const user = JSON.parse(value);
           user.user.password = password;
           AsyncStorage.mergeItem('user', JSON.stringify(user), () => {
             updatePassword(idUser, user.user.password).then((res, err) => {
                if (err) {
                  console.log(err);
                } else {
                    dispatch({ type: UPDATE_USER_PASSWORD });
                }
              });
        });
         }).done();
     } catch (e) {
         console.log('caught error', e);
     }
  };
};

export const passwordUpdateChanged = (text) => {
  const valid = validatePassword(text);
  return {
    type: UPDATE_PASSWORD,
    payload: text,
    validate: valid
  };
};

export const confirmNewPassword = (text, newPassword) => {
  const valid = testPassword(text, newPassword);
  return {
    type: CONFIRM_NEW_PASSWORD,
    payload: text,
    validate: valid
  };
};

export const updateUserPost = (value) => {
  return {
    type: UPDATE_USER_POSTE,
    payload: value,
  };
};

export const onchangeCardInfo = () => {
  return {
    type: CHANGE_CARD_INFO
  };
};

export const onchangeCardCarac = () => {
  return {
    type: CHANGE_CARD_CARC
  };
};

export const onchangeCardPassword = () => {
  return {
    type: CHANGE_CARD_PASSWORD
  };
};

export const updateUserProfil = (idUser, user) => {
  return (dispatch) => {
      dispatch({ type: REFRESH_UPDATE_START });
      updateUser(idUser, user).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          AsyncStorage.mergeItem('user', JSON.stringify(user), () => {
            dispatch({ type: UPDATE_USER_PROFIL });
          });
        }
      });
  };
};

function validatePhone(phone) {
    const phoneno = /^[0-9]{8}$/;
    return phoneno.test(phone);
}

function testPassword(password, confirmPassword) {
  return (password !== confirmPassword) ? false: true;
}

function validatePassword(password) {
  if (password !== '') {
    const re = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    return re.test(password);
  }
  return null;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function testChampVide(text) {
  if (text === '') {
    return false;
  }
  return true;
}

function testChampNumber(value) {
    const re = /^\d+$/;
    return re.test(value);
}
