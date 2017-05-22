import {
  START_GET_MES_MATCHS_MY_EQUIPE,
  STOP_GET_MES_MATCHS_MY_EQUIPE,
  STOP_GET_MES_MATCHS_MY_EQUIPE_LOAD
} from './types';

import { getMesMatchsEquipe } from './api/MatchApi';

export const getMatchsMyEquipe = (idEquipe, date, page) => {
    return (dispatch) => {
        dispatch({ type: START_GET_MES_MATCHS_MY_EQUIPE });
        getMesMatchsEquipe(idEquipe, date, page).then((res) => {
          if (page === 0) {
              dispatch({ type: STOP_GET_MES_MATCHS_MY_EQUIPE, payload: res });
          } else {
              dispatch({ type: STOP_GET_MES_MATCHS_MY_EQUIPE_LOAD, payload: res });
          }
        }, (err) => {
            console.log(err);
        });
    };
};
