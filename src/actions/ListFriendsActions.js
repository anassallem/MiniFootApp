import {
  SWITCH_CHANGED,
  LOADING_MY_FRIENDS,
  GET_MY_FRIENDS
} from './types';
import { getFriends } from './api/FriendsApi';

export const changeSwitch = () => {
  return {
    type: SWITCH_CHANGED
  };
};

export const getMyFriends = (idUser) => {
  return (dispatch) => {
    dispatch({ type: LOADING_MY_FRIENDS });
    getFriends(idUser).then((res) => {
      dispatch({ type: GET_MY_FRIENDS, payload: res.friends });
      }, (err) => {
        console.log(err);
      }
    );
    };
};
