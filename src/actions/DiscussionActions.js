import { Actions } from 'react-native-router-flux';
import {
  GET_PLAYER_ONLINE,
  SOCKET_CHANGED,
  GET_ALL_DISCUSSION,
  ID_USER_CHANGED,
} from './types';
import { getDiscussionUserById, getDiscussionByIdFriend, setRoomToVue } from './api/RoomsApi';

export const getPlayerOnline = (socket) => {
  return (dispatch) => {
    socket.on('list_connectee', (data) => {
      dispatch({ type: GET_PLAYER_ONLINE, payload: data });
    });
  };
};

export const socketChanged = (socket) => {
  return {
    type: SOCKET_CHANGED,
    payload: socket
  };
};

export const changeIdUser = (idUser) => {
  return {
    type: ID_USER_CHANGED,
    payload: idUser
  };
};

export const getDiscussionPlayer = (idUser, mySocket) => {
  return (dispatch) => {
    getDiscussionUserById(idUser).then((res) => {
      dispatch({ type: GET_ALL_DISCUSSION, payload: res });
      res.forEach((item) => {
                  mySocket.on(item._id, (data) => {
                    getDiscussionUserById(idUser).then((res) => {
                      dispatch({ type: GET_ALL_DISCUSSION, payload: res });
                    }, (err) => {
                      console.log(err);
                    });
                  });
                });
      }, (err) => {
        console.log(err);
      });
    };
};

export const getIdRoom = (user, friend, socket) => {
  return (dispatch) => {
    getDiscussionByIdFriend(user.idUser, friend._id).then((res) => {
      Actions.chat({ user, title: `${friend.firstname} ${friend.lastname}`, room: res, mySocket: socket });
      }, (err) => {
        console.log(err);
      }
    );
  };
};

export const changeRoomToVue = (user, mySocket, room, title) => {
  return (dispatch) => {
    const newUser = { _id: user.idUser, name: `${user.firstname} ${user.lastname}`, avatar: user.photo };
    setRoomToVue(room._id, newUser).then((res) => {
      Actions.chat({ user, mySocket, room, title });
    }, (err) => {
      console.log(err);
    });
  };
};
