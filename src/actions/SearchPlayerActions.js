import { getUsers } from './api/UserApi';
import {
  SEARCH_CHANGED,
  FETCH_PLAYERS,
  LOADING_PLAYERS
} from './types';

export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text,
  };
};

export const fetchPlayers = (text) => {
  return (dispatch) => {
    dispatch({ type: LOADING_PLAYERS });
    getUsers(text).then((res) => {
        dispatch({ type: FETCH_PLAYERS, payload: res });
        }, (err) => {
          console.log(err);
        }
      );
  };
};
