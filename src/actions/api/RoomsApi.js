import axios from 'axios';
import { URL } from './config';

export const getRoomUserById = (idUser) => {
    const requestURL = `${URL}/rooms/${idUser}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getDiscussionUserById = (idUser) => {
    const requestURL = `${URL}/rooms/${idUser}/discussion`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getDiscussionByIdFriend = (idUser, idFriend) => {
    const requestURL = `${URL}/rooms/${idUser}/discussion/${idFriend}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const loadMessagesRoom = (idRoom, page) => {
    const requestURL = `${URL}/rooms/${idRoom}/messages/${page}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const setRoomToVue = (idRoom, user) => {
    const requestURL = `${URL}/rooms/${idRoom}/vue`;
      return axios.put(requestURL, user)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
