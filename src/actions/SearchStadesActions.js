import {
  START_LOAD_SEARSH_LIST_STADE,
  STOP_LOAD_SEARSH_LIST_STADE,
  SEARCH_LIST_STADE_CHANGED
} from './types';
import { getStades } from './api/StadeApi';

export const fetchListStades = (text) => {
    return (dispatch) => {
        dispatch({ type: START_LOAD_SEARSH_LIST_STADE });
        getStades(text).then((res) => {
            dispatch({ type: STOP_LOAD_SEARSH_LIST_STADE, payload: res });
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
