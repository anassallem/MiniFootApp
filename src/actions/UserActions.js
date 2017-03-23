import { Actions } from 'react-native-router-flux';
import { create } from './api/UserApi';
import {
  NAME_CHANGED,
  LASTNAME_CHANGED,
  ADRESSE_CHANGED,
  PASSWORDCONFIRM_CHANGED,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from './types';

export const nameChanged = (text) => {
  const valid = testFirstName(text);
  return {
    type: NAME_CHANGED,
    payload: text,
    validate: valid
  };
};

export const lastNameChanged = (text) => {
  const valid = testLastName(text);
  return {
    type: LASTNAME_CHANGED,
    payload: text,
    validate: valid
  };
};

export const adressChanged = (text) => {
  const valid = testAdresse(text);
  return {
    type: ADRESSE_CHANGED,
    payload: text,
    validate: valid
  };
};

export const passwordConfirmChanged = (text, password) => {
  const valid = testPassword(text, password);
  return {
    type: PASSWORDCONFIRM_CHANGED,
    payload: text,
    validate: valid
  };
};


export const createUser = (user) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });
    create(user).then((res) => {
      if (res.success === true) {
        createUserSuccess(dispatch, res);
        console.log(res);
      } else if (res.success === false) {
        createUserFail(dispatch, res.message);
      }
      }, (err) => {
        console.log(err);
      }
    );
    };
};

const createUserFail = (dispatch, message) => {
  dispatch({
    type: CREATE_USER_FAIL,
    payload: message
  });
};

const createUserSuccess = (dispatch) => {
  dispatch({
    type: CREATE_USER_SUCCESS,
  });
  Actions.login();
};

function testPassword(password, confirmPassword) {
  return (password !== confirmPassword) ? false: true;
}
function testAdresse(adresse) {
  if (adresse === '') {
    return false;
  }
  return true;
}
function testFirstName(firstName) {
  if (firstName === '') {
    return false;
  }
  return true;
}
function testLastName(lastName) {
  if (lastName === '') {
    return false;
  }
  return true;
}
