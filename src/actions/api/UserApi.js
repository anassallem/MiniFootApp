import axios from 'axios';
import { URL, CONFIG } from './config';

export const create = (user) => {
    const requestURL = `${URL}/register`;
      return axios.post(requestURL, user, CONFIG).then((res) => {
            console.log(res.data);
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getUser = (idUser) => {
//  const idUser = '58c86411f633e229300cf3ea';
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
