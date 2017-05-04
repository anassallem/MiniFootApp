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

export const addInterrestedAdverts = (idAdvert, idUser) => {
    const requestURL = `${URL}/adverts/${idAdvert}?idUser=${idUser}`;
    return axios.post(requestURL, CONFIG).then((res) => {
      return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const deleteInterrestedAdverts = (idAdvert, idUser) => {
    const requestURL = `${URL}/adverts/${idAdvert}?idUser=${idUser}`;
    return axios.delete(requestURL, CONFIG).then((res) => {
      return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getListInteresstedAdvert = (idAdvert) => {
    const requestURL = `${URL}/adverts/${idAdvert}/interssted`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
