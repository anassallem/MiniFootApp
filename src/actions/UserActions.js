import { Actions } from 'react-native-router-flux';
import { create } from './api/UserApi';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  NAME_CHANGED,
  LASTNAME_CHANGED,
  ADRESSE_CHANGED,
  PASSWORDCONFIRM_CHANGED,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  MESSAGE_REGISTER_ERROR_CHANGED
} from './types';

export const registerEmailChanged = (text) => {
  const valid = validateEmail(text);
  return {
    type: EMAIL_CHANGED,
    payload: text,
    validate: valid
  };
};

export const registerPasswordChanged = (text) => {
  const valid = validatePassword(text);
  return {
    type: PASSWORD_CHANGED,
    payload: text,
    validate: valid
  };
};

export const nameChanged = (text) => {
  const valid = testFirstName(text);
  return {
    type: NAME_CHANGED,
    payload: text,
    validate: valid
  };
};


export const setMessageRegisterError = (message) => {
  return {
    type: MESSAGE_REGISTER_ERROR_CHANGED,
    payload: message
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
function validateEmail(email) {
  if (email !== '') {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
    return null;
}

function validatePassword(password) {
  if (password !== '') {
    const re =(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    return re.test(password);
  }
  return null;
}
