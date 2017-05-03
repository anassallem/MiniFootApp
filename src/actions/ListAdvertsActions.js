import { getadverts } from './api/AdvertApi';
import {
  LOAD_LIST_ADVERTS,
  LOAD_LIST_ADVERTS_BEGIN,
  START_REFRESHING_ADVERTS,
  STOP_REFRESHING_ADVERTS
} from './types';


export const getListAdverts = (page, idUser) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESHING_ADVERTS });
      getadverts(page).then((res) => {
          if (res.length > 0) {
              res.forEach((item) => {
                 if (item.interested.indexOf(idUser) === -1) {
                     item.testInterested = false;
                 } else {
                     item.testInterested = true;
                 }
              });
              dispatch({ type: LOAD_LIST_ADVERTS, payload: res });
          } else {
              dispatch({ type: STOP_REFRESHING_ADVERTS });
          }
      }, (err) => {
          console.log(err);
      });
  };
};
export const initialListAdverts = (idUser) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESHING_ADVERTS });
      getadverts(0).then((res) => {
          res.forEach((item) => {
             if (item.interested.indexOf(idUser) === -1) {
                 item.testInterested = false;
             } else {
                 item.testInterested = true;
             }
          });
          dispatch({ type: LOAD_LIST_ADVERTS_BEGIN, payload: res });
      }, (err) => {
          console.log(err);
      });
  };
};
