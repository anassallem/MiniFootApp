import {
  GET_MY_ROOMS,
  SOCKET_CHANGED,
  INITIAL_STATE_HOME,
  CHANGE_NUMBER_NOTIFY_HOME,
  PAGE_HOME_CHANGED,
  CHANGE_NUMBER_NOTIFY_TEAM
} from './types';
import { getRoomUserById } from './api/RoomsApi';

export const getRoomUser = (idUser) => {
  return (dispatch) => {
    getRoomUserById(idUser).then((res) => {
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

export const changePage = (notify) => {
  return {
    type: PAGE_HOME_CHANGED,
    payload: notify
  };
};
