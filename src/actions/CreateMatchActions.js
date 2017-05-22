import {
  SWITCH_MODAL_CHANGED,
  TEAM_ADVERSAIRE_CHANGED,
  START_LOAD_CREATE_MATCH,
  INITIAL_STATE_CREATE_MATCH,
  SWITCH_MODAL_STADE_CHANGED,
  START_LOAD_SEARSH_STADE,
  STOP_LOAD_SEARSH_STADE,
  STADE_CHANGED,
  SEARCH_STADE_CHANGED
} from './types';
import { getStades } from './api/StadeApi';

export const switchModalChanged = () => {
  return {
    type: SWITCH_MODAL_CHANGED,
  };
};

export const switchModalStadeChanged = () => {
  return {
    type: SWITCH_MODAL_STADE_CHANGED,
  };
};
export const teamAdversaireChanged = (team) => {
  return {
    type: TEAM_ADVERSAIRE_CHANGED,
    payload: team
  };
};
export const stadeChanged = (stade) => {
  return {
    type: STADE_CHANGED,
    payload: stade
  };
};
export const createMacth = (myTeam) => {
    return (dispatch) => {
        dispatch({ type: START_LOAD_CREATE_MATCH });
        setTimeout(() => {
            dispatch({ type: INITIAL_STATE_CREATE_MATCH });
        }, 1000);
    };
};
export const fetchStades = (text) => {
    return (dispatch) => {
        dispatch({ type: START_LOAD_SEARSH_STADE });
        getStades(text).then((res) => {
            dispatch({ type: STOP_LOAD_SEARSH_STADE, payload: res });
        }, (err) => {
            console.log(err);
        });
    };
};
export const searchStadeChanged = (text) => {
  return {
    type: SEARCH_STADE_CHANGED,
    payload: text
  };
};
