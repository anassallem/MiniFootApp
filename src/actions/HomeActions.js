import {
  GET_MY_ROOMS,
  SOCKET_CHANGED,
  INITIAL_STATE_HOME,
  CHANGE_NUMBER_NOTIFY_HOME,
  PAGE_HOME_CHANGED,
  CHANGE_NUMBER_NOTIFY_TEAM,
  CHANGE_NUMBER_NOTIFY_ADVERTS,
  GET_USER_CACHE
} from './types';
import { getDiscussionUserById } from './api/RoomsApi';

export const getUserCache = (user) => {
    return {
      type: GET_USER_CACHE,
      payload: user.user
    };
};

export const getRoomUser = (idUser, socket) => {
  return (dispatch) => {
    getDiscussionUserById(idUser).then((res) => {
        res.forEach((room) => {
            socket.emit('room', room._id);
        });
        dispatch({ type: GET_MY_ROOMS, payload: res });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const getSocket = (socket) => {
  return {
    type: SOCKET_CHANGED,
    payload: socket
  };
};

export const initialStateHome = () => {
  return { type: INITIAL_STATE_HOME };
};

export const changeNumberNotify = () => {
  return { type: CHANGE_NUMBER_NOTIFY_HOME };
};

export const changeNumberEquipe = () => {
  return { type: CHANGE_NUMBER_NOTIFY_TEAM };
};
export const changeNumberAdverts = () => {
  return { type: CHANGE_NUMBER_NOTIFY_ADVERTS };
};
export const changePage = (notify) => {
  return {
    type: PAGE_HOME_CHANGED,
    payload: notify
  };
};
