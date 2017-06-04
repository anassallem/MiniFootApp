import { getUsers } from './api/UserApi';
import {
  SEARCH_CHANGED,
  FETCH_PLAYERS,
  LOADING_PLAYERS,
  FETCH_PLAYERS_MORE
} from './types';

export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text,
  };
};

export const fetchPlayers = (text, page) => {
  return (dispatch) => {
    dispatch({ type: LOADING_PLAYERS });
    getUsers(text, page).then((res) => {
        if (page === 0) {
            dispatch({ type: FETCH_PLAYERS, payload: res });
        } else {
            dispatch({ type: FETCH_PLAYERS_MORE, payload: res });
        }
        }, (err) => {
          console.log(err);
        }
      );
  };
};
