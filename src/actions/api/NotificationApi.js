import axios from 'axios';
import { URL } from './config';

export const getNotificationsUser = (idUser) => {
    const requestURL = `${URL}/notification/${idUser}/invitations`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const deleteNotificationUser = (idNotification) => {
  const requestURL = `${URL}/notification/${idNotification}/rejected`;
    return axios.delete(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const acceptNotificationUser = (idNotification, notification) => {
  const requestURL = `${URL}/notification/${idNotification}/accepted`;
    return axios.put(requestURL, notification)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
