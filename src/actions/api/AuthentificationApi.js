import axios from 'axios';

const URL = 'http://192.168.1.65:3000/api';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
const config = {
  headers: { 'Content-Type': 'application/json' }
};
export const auth = (user) => {
    const requestURL = `${URL}/authenticate`;
      return axios.post(requestURL, user).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    })
};
