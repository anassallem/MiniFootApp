import { AsyncStorage } from 'react-native';
import { getUser, getUserSkills } from './api/UserApi';
import {
  GET_USER,
  GET_USER_SKILLS,
  IMAGE_CHANGED
} from './types';

export const getUserById = () => {
  return (dispatch) => {
  try {
      AsyncStorage.getItem('user').then((value) => {
        const user = JSON.parse(value);
            getUser(user.user._id).then((res, err) => {
              if (err) {
                console.log(err);
              } else {
                  dispatch({ type: GET_USER, payload: res });
              }
            });
      }).done();
  } catch (e) {
      console.log('caught error', e);
  }
  };
};

export const changeImage = (uri) => {
  return {
    type: IMAGE_CHANGED,
    payload: uri
  };
};

export const getSkills = () => {
  return (dispatch) => {
  try {
      AsyncStorage.getItem('user').then((value) => {
        const user = JSON.parse(value);
            getUserSkills(user.user._id).then((res, err) => {
              if (err) {
                console.log(err);
              } else {
                  dispatch({ type: GET_USER_SKILLS, payload: res });
              }
            });
      }).done();
  } catch (e) {
      console.log('caught error', e);
  }
  };
};
