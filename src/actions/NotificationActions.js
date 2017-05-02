import {
  GET_NOTIFICATIONS,
  START_LOADING_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  ACCEPT_NOTIFICATIONS,
  MENU_HOME_CHANGED
} from './types';
import { getNotificationsUser, deleteNotificationUser, acceptNotificationUser } from './api/NotificationApi';

export const getNotifications = (idUser) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING_NOTIFICATIONS });
    getNotificationsUser(idUser).then((res) => {
      console.log(res);
      dispatch({ type: GET_NOTIFICATIONS, payload: res });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const deleteNotification = (idNotification) => {
  return (dispatch) => {
    deleteNotificationUser(idNotification).then((res) => {
      dispatch({ type: DELETE_NOTIFICATIONS, payload: idNotification });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const acceptNotification = (idNotification, notification) => {
  return (dispatch) => {
    acceptNotificationUser(idNotification, notification).then((res) => {
      dispatch({ type: ACCEPT_NOTIFICATIONS, payload: idNotification });
      dispatch({ type: MENU_HOME_CHANGED, payload: 'Menu' });
      }, (err) => {
        console.log(err);
      }
    );
    };
};
