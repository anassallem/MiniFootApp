import axios from 'axios';
import { URL, CONFIG, CONFIGIMAGE } from './config';

export const create = (user) => {
    const requestURL = `${URL}/register`;
      return axios.post(requestURL, user, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getUser = (idUser) => {
    const requestURL = `${URL}/users/${idUser}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getUserSkills = (idUser) => {
    const requestURL = `${URL}/users/${idUser}/skills`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getUsers = (text) => {
    const requestURL = `${URL}/users?name=${text}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const uploadImageUser = (idUser, photo) => {
/*  const requestURL = `${URL}/users/upload/${idUser}`;
  const formData = new FormData();
  formData.append('image', {
    uri: photo,
    type: 'image/jpg',
    name: 'image.jpg',
  });
  fetch('requestURL', {
  method: 'POST',
  body: formData
});*/

    /*  return axios.post(requestURL, formData, CONFIGIMAGE).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });*/
  };
export const postUserSkills = (idUser, skills, from) => {
    const requestURL = `${URL}/users/${idUser}/skills?id=${from}`;
      return axios.post(requestURL, skills, CONFIG)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
