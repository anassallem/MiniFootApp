import axios from 'axios';

const URL = 'https://minifoot.herokuapp.com/api';
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
