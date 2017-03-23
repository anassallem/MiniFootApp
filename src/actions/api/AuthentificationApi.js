import axios from 'axios';
import { URL } from './config';

export const auth = (user) => {
    const requestURL = `${URL}/authenticate`;
      return axios.post(requestURL, user).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
