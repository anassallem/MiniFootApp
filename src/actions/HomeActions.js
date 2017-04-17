import {
  GET_MY_ROOMS,
  SOCKET_CHANGED
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
