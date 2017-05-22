import moment from 'moment';
import {
  GET_MATCHS_STADE,
  START_GET_MATCHS_STADE,
  CHANGE_MODAL_RESERVER_STADE,
  CHANGE_MODAL_DATE_STADE,
  MESSAGE_RESERVER_CHANGED,
  DATE_CHANGED,
  START_ENVOYER_MATCHS_STADE,
  STOP_ENVOYER_MATCHS_STADE,
  HIDE_MODAL_CHARGEMENT
} from './types';
import { getMatchsStade } from './api/StadeApi';
import { reserverMatch } from './api/MatchApi';

const icon = require('../components/assets/ballon.png');

export const getMatchs = (idStade, date) => {
    return (dispatch) => {
        dispatch({ type: START_GET_MATCHS_STADE });
        getMatchsStade(idStade, date).then((res) => {
            let events = [];
            res.forEach((item) => {
                //const dateEvent = moment(item.event.start).subtract(2, 'hours').format('HH:mm');
                const dateEvent = moment(item.event.start).add(4, 'hours').format('HH:mm');
                events.push({
                            time: dateEvent,
                            title: `${item.teamOne.name} VS ${item.teamTow.name}`,
                            description: '',
                            icon,
                            teamOne: item.teamOne,
                            teamTow: item.teamTow,
                            scoreOne: item.scoreOne,
                            scoreTow: item.scoreTow });
            });
            dispatch({ type: GET_MATCHS_STADE, payload: events });
        }, (err) => {
            console.log(err);
        });
    };
};

export const changeModalReserver = () => {
  return { type: CHANGE_MODAL_DATE_STADE };
};
export const dateChanged = (date) => {
  return { type: DATE_CHANGED, payload: date };
};
export const showModalReserver = () => {
  return { type: CHANGE_MODAL_RESERVER_STADE };
};
export const messageReserverChanged = (message) => {
  return { type: MESSAGE_RESERVER_CHANGED, payload: message };
};
export const hideModalChargement = () => {
  return { type: HIDE_MODAL_CHARGEMENT };
};

export const envoyerMatchForReserver = (idMatch, date, message) => {
    return (dispatch) => {
        dispatch({ type: START_ENVOYER_MATCHS_STADE });
        reserverMatch(idMatch, date, message).then((res) => {
            dispatch({ type: STOP_ENVOYER_MATCHS_STADE, payload: res.message });
        }, (err) => {
            console.log(err);
        });
    };
};
