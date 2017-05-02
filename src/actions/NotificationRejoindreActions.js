import {
   GET_NOTIFICATIONS_REJOINDRE_TEAM,
   LOADING_NOTIFICATIONS_REJOINDRE_TEAM,
   DELETE_NOTIFICATIONS_REJOINDRE_TEAM,
   ACCEPT_NOTIFICATIONS_REJOINDRE_TEAM
 } from './types';
import { getNotificationsRejoindre, refuseNotificationRejoindre, acceptNotificationRejoindre } from './api/NotificationApi';

export const getNotificationRejoindreTeam = (idEquipe) => {
  return (dispatch) => {
    dispatch({ type: LOADING_NOTIFICATIONS_REJOINDRE_TEAM });
    getNotificationsRejoindre(idEquipe).then((res) => {
      dispatch({ type: GET_NOTIFICATIONS_REJOINDRE_TEAM, payload: res });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const acceptRejoindreTeam = (idRejoindreTeam, notificationRejoindre) => {
  return (dispatch) => {
    acceptNotificationRejoindre(idRejoindreTeam, notificationRejoindre).then((res) => {
      dispatch({ type: ACCEPT_NOTIFICATIONS_REJOINDRE_TEAM, payload: idRejoindreTeam });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const refuseRejoindreTeam = (idRejoindreTeam) => {
    return (dispatch) => {
        refuseNotificationRejoindre(idRejoindreTeam).then((res, err) => {
          if (err) {
            console.log(err);
          } else {
              dispatch({ type: DELETE_NOTIFICATIONS_REJOINDRE_TEAM, payload: idRejoindreTeam });
          }
        });
    };
};
