import {
  START_LOAD_SEARSH_LIST_STADE,
  STOP_LOAD_SEARSH_LIST_STADE,
  SEARCH_LIST_STADE_CHANGED,
  STOP_LOAD_SEARSH_LIST_STADE_MORE
} from './types';
import { getStades } from './api/StadeApi';

export const fetchListStades = (text, page) => {
    return (dispatch) => {
        dispatch({ type: START_LOAD_SEARSH_LIST_STADE });
        getStades(text, page).then((res) => {
            if (page === 0) {
                dispatch({ type: STOP_LOAD_SEARSH_LIST_STADE, payload: res });
            } else {
                dispatch({ type: STOP_LOAD_SEARSH_LIST_STADE_MORE, payload: res });
            }
        }, (err) => {
            console.log(err);
        });
    };
};

export const searchListStadesChanged = (text) => {
  return {
    type: SEARCH_LIST_STADE_CHANGED,
    payload: text
  };
};
