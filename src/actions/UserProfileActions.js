import { AsyncStorage } from 'react-native';
import { getUser, getUserSkills } from './api/UserApi';
import {
  GET_USER,
  GET_USER_SKILLS,
  IMAGE_CHANGED,
  OPEN_MODAL
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


export const openModal = () => {
  return {
    type: OPEN_MODAL
  };
};

export const getSkills = (idUser) => {
  return (dispatch) => {
      getUserSkills(idUser).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
            dispatch({ type: GET_USER_SKILLS, payload: res });
        }
      });
  };
};
