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
