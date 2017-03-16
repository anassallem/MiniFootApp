import axios from 'axios';

const URL = 'http://192.168.1.65:3000/api';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
const config = {
  headers: { 'Content-Type': 'application/json' }
};
export const create = (user) => {
    const requestURL = `${URL}/register`;

      return axios.post(requestURL, user, config).then((res) => {
            console.log(res.data);
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
