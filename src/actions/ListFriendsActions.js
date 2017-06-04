import {
  SWITCH_CHANGED,
  LOADING_MY_FRIENDS,
  GET_MY_FRIENDS,
  GET_MY_FRIENDS_MORE
} from './types';
import { getFriends } from './api/FriendsApi';

export const changeSwitch = () => {
  return {
    type: SWITCH_CHANGED
  };
};

export const getMyFriends = (page, idUser) => {
  return (dispatch) => {
    dispatch({ type: LOADING_MY_FRIENDS });
    getFriends(page, idUser).then((res) => {
        if (page === 0) {
            dispatch({ type: GET_MY_FRIENDS, payload: res.friends });
        } else {
            dispatch({ type: GET_MY_FRIENDS_MORE, payload: res.friends });
        }
      }, (err) => {
        console.log(err);
      }
    );
    };
};
