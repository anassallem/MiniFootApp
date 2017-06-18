import {
  GET_MY_ROOMS,
  SOCKET_CHANGED,
  INITIAL_STATE_HOME,
  CHANGE_NUMBER_NOTIFY_HOME,
  PAGE_HOME_CHANGED,
  CHANGE_NUMBER_NOTIFY_TEAM,
  CHANGE_NUMBER_NOTIFY_ADVERTS,
  CHANGE_NUMBER_NOTIFY_FRIENDS,
  INITIAL_STATE_HOME_NUMBER_NOTIFY_FRIENDS,
  GET_USER_CACHE,
  ON_NEW_ROOM_CREATED
} from './types';
import { getDiscussionUserById } from './api/RoomsApi';

export const getUserCache = (user) => {
    return {
      type: GET_USER_CACHE,
      payload: user.user
    };
};
export const onNewRoomCreated = (room) => {
    let newRoom = [];
    newRoom.push(room);
    return {
      type: ON_NEW_ROOM_CREATED,
      payload: newRoom
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
export const initialStateNumberNotifyFriend = () => {
  return { type: INITIAL_STATE_HOME_NUMBER_NOTIFY_FRIENDS };
};

export const changeNumberNotify = () => {
  return { type: CHANGE_NUMBER_NOTIFY_HOME };
};
export const changeNumberNotifyFriend = () => {
  return { type: CHANGE_NUMBER_NOTIFY_FRIENDS };
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
