import axios from 'axios';
import { URL, CONFIG } from './config';

export const getadverts = (page) => {
    const requestURL = `${URL}/adverts?page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const getPublicationsTeam = (idEquipe, page) => {
    const requestURL = `${URL}/adverts/${idEquipe}?page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
