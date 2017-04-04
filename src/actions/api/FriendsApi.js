import axios from 'axios';
import { URL } from './config';

export const getInvitationsUser = (idUser) => {
    const requestURL = `${URL}/friends/${idUser}/invitations`;
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

export const getFriends = (idUser) => {
    const requestURL = `${URL}/friends/${idUser}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
