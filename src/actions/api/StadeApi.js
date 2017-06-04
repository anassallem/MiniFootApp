import axios from 'axios';
import { URL, CONFIG } from './config';

export const getStades = (text, page) => {
    const requestURL = `${URL}/stade?name=${text}&page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const addLickStade = (idStade, idUser) => {
    const requestURL = `${URL}/stade/${idStade}/like/${idUser}`;
    return axios.put(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const deleteLickStade = (idStade, idUser) => {
    const requestURL = `${URL}/stade/${idStade}/deslike/${idUser}`;
    return axios.put(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const getLickStade = (idStade, idUser) => {
    const requestURL = `${URL}/stade/${idStade}/abonnees/${idUser}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const getMatchsStade = (idStade, date) => {
    const requestURL = `${URL}/stade/${idStade}/matchs?date=${date}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
