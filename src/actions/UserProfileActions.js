import { AsyncStorage } from 'react-native';
import { getUser, getUserSkills, uploadImageUser } from './api/UserApi';
import { URL } from './api/config';
import {
  GET_USER,
  GET_USER_SKILLS,
  IMAGE_CHANGED,
  OPEN_MODAL,
  CLOSE_MODAL,
  UPLOAD_IMAGE_USER
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
                  const newUser = { ...res, photo: `${URL}/users/upload/${res.photo}` };
                  dispatch({ type: GET_USER, payload: newUser });
              }
            });
      }).done();
  } catch (e) {
      console.log('caught error', e);
  }
  };
};

export const changeImage = (uri, data, show) => {
  return {
    type: IMAGE_CHANGED,
    payload: uri,
    photo: data,
    show
  };
};


export const openModal = () => {
  return {
    type: OPEN_MODAL
  };
};
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
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

export const uploadImage = (photo) => {
  return (dispatch) => {
  };
};
