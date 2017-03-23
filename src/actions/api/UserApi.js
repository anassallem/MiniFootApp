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
    const requestURL = `${URL}/${idUser}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getUserSkills = (idUser) => {
    const requestURL = `${URL}/${idUser}/skills`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
