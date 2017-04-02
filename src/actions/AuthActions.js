import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { auth } from './api/AuthentificationApi';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  TOKEN_CHANGED
} from './types';

export const emailChanged = (text) => {
  const valid = validateEmail(text);
  return {
    type: EMAIL_CHANGED,
    payload: text,
    validate: valid
  };
};

export const passwordChanged = (text) => {
  const valid = validatePassword(text);
  return {
    type: PASSWORD_CHANGED,
    payload: text,
    validate: valid
  };
};

export const tokenChanged = (token) => {
  return {
    type: TOKEN_CHANGED,
    payload: token
  };
};

export const loadUser = () => {
  return (dispatch) => {
    try {
         AsyncStorage.getItem("user",(err, user) => {
           if (user !== null){
               Actions.main();
            }
        });
    }
    catch (e) {
        console.log('caught error', e);
    }
  }
};

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    auth(user).then((res) => {
      if (res.success === true) {
        loginUserSuccess(dispatch, res);
      } else if (res.success === false) {
        loginUserFail(dispatch, res.message);
      }
      }, (err) => {
        console.log(err);
      }
    );
    };
};

const loginUserFail = (dispatch, message) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: message
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS
  });
  setCache(user);
  Actions.main();//navigation between routes
};

async function setCache (user){
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      // Error saving data
    }
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
