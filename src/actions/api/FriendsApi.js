import axios from 'axios';
import { URL } from './config';

export const getInvitationsUser = (page, idUser) => {
    const requestURL = `${URL}/friends/${idUser}/invitations?page=${page}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const deleteInvitationsUser = (idInvitation) => {
  const requestURL = `${URL}/friends/${idInvitation}/rejected`;
    return axios.delete(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const acceptInvitationsUser = (idInvitation, invitation) => {
  const requestURL = `${URL}/friends/${idInvitation}/accepted`;
    return axios.put(requestURL, invitation)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const getFriends = (page, idUser) => {
    const requestURL = `${URL}/friends/${idUser}?page=${page}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
