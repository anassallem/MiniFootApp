import axios from 'axios';

const URL = 'https://minifoot.herokuapp.com/api';
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
