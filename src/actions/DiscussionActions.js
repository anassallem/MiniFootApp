import { Actions } from 'react-native-router-flux';
import {
  GET_PLAYER_ONLINE,
  ON_NEW_MESSAGE_RECEIVE,
  CHANGE_ROOM_TO_VUE
} from './types';
import { getDiscussionByIdFriend, setRoomToVue, updateRoom } from './api/RoomsApi';


export const onNewMessageReceive = (idRoom, room, users) => {
    return (dispatch) => {
        updateRoom(idRoom, room).then((res) => {
            res.users = users;
          dispatch({ type: ON_NEW_MESSAGE_RECEIVE, payload: res });
        }, (err) => {
          console.log(err);
        });
    };
};

export const getPlayerOnline = (data) => {
    return {
      type: GET_PLAYER_ONLINE,
      payload: data
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
        dispatch({ type: CHANGE_ROOM_TO_VUE, user: newUser, idRoom: room._id });
      Actions.chat({ user, mySocket, room, title });
    }, (err) => {
      console.log(err);
    });
  };
};
