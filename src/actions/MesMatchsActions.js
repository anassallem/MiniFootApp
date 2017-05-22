import {
  START_GET_MES_MATCHS_EQUIPE,
  STOP_GET_MES_MATCHS_EQUIPE,
  STOP_GET_MES_MATCHS_EQUIPE_LOAD,
  DELETE_MATCH_BY_ID,
  ACCEPT_MATCH_BY_ID,
  CHANGE_MODAL_SCORE,
  SCORE_ONE_CHANGED,
  SCORE_TWO_CHANGED,
  ADD_SCORE_TO_MATCH
} from './types';

import { getMesMatchs, deleteMacth, acceptMatch, addScoreMatch } from './api/MatchApi';

export const getMatchsEquipe = (idEquipe, date, page) => {
    return (dispatch) => {
        dispatch({ type: START_GET_MES_MATCHS_EQUIPE });
        getMesMatchs(idEquipe, date, page).then((res) => {
            if (page === 0) {
                dispatch({ type: STOP_GET_MES_MATCHS_EQUIPE, payload: res });
            } else {
                dispatch({ type: STOP_GET_MES_MATCHS_EQUIPE_LOAD, payload: res });
            }
        }, (err) => {
            console.log(err);
        });
    };
};
export const deleteMatchById = (idMatch) => {
    return (dispatch) => {
        deleteMacth(idMatch).then((res) => {
          dispatch({ type: DELETE_MATCH_BY_ID, payload: idMatch });
        }, (err) => {
            console.log(err);
        });
    };
};
export const acceptMatchById = (idMatch) => {
    return (dispatch) => {
        acceptMatch(idMatch).then((res) => {
            dispatch({ type: ACCEPT_MATCH_BY_ID, payload: idMatch });
        }, (err) => {
            console.log(err);
        });
    };
};
export const changeModalScore = (idMatch, teamOne, teamTow) => {
  return { type: CHANGE_MODAL_SCORE, idMatch, teamOne, teamTow };
};

export const scoreOneChanged = (scoreOne) => {
  return { type: SCORE_ONE_CHANGED, payload: scoreOne };
};

export const scoreTowChanged = (scoreTow) => {
  return { type: SCORE_TWO_CHANGED, payload: scoreTow };
};
export const addScoreToMatch = (idMatch, scoreOne, scoreTow) => {
    return (dispatch) => {
        addScoreMatch(idMatch, scoreOne, scoreTow).then((res) => {
            dispatch({ type: ADD_SCORE_TO_MATCH, payload: idMatch });
        }, (err) => {
            console.log(err);
        });
    };
};
