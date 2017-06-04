import { getadverts, addInterrestedAdverts, deleteInterrestedAdverts, getListInteresstedAdvert } from './api/AdvertApi';
import {
  LOAD_LIST_ADVERTS,
  LOAD_LIST_ADVERTS_BEGIN,
  START_REFRESHING_ADVERTS,
  STOP_REFRESHING_ADVERTS,
  START_POST_INTERESSTED_ADVERTS,
  STOP_POST_INTERESSTED_ADVERTS,
  START_GET_LIST_INTERESSTED_ADVERTS,
  STOP_GET_LIST_INTERESSTED_ADVERTS,
  CLOSE_MODAL_ADVERT
} from './types';


export const getListAdverts = (page, idUser) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESHING_ADVERTS });
      getadverts(page).then((res) => {
          if (res.length > 0) {
              res.forEach((item) => {
                 if (item.advertTeam.interested.indexOf(idUser) === -1) {
                     item.advertTeam.testInterested = false;
                 } else {
                     item.advertTeam.testInterested = true;
                 }
                 item.advertTeam.countInterested = item.advertTeam.interested.length;
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
             if (item.advertTeam.interested.indexOf(idUser) === -1) {
                 item.advertTeam.testInterested = false;
             } else {
                 item.advertTeam.testInterested = true;
             }
             item.advertTeam.countInterested = item.advertTeam.interested.length;
          });
          dispatch({ type: LOAD_LIST_ADVERTS_BEGIN, payload: res });
      }, (err) => {
          console.log(err);
      });
  };
};
export const addNewInterrested = (idAdvert, idUser) => {
  return (dispatch) => {
      dispatch({ type: START_POST_INTERESSTED_ADVERTS, payload: idAdvert, reverse: true, idUser });
      addInterrestedAdverts(idAdvert, idUser).then((res) => {
          dispatch({ type: STOP_POST_INTERESSTED_ADVERTS });
      }, (err) => {
          console.log(err);
      });
  };
};
export const deleteInterrested = (idAdvert, idUser) => {
  return (dispatch) => {
      dispatch({ type: START_POST_INTERESSTED_ADVERTS, payload: idAdvert, reverse: false, idUser });
      deleteInterrestedAdverts(idAdvert, idUser).then((res) => {
          dispatch({ type: STOP_POST_INTERESSTED_ADVERTS });
      }, (err) => {
          console.log(err);
      });
  };
};
export const getListInteressted = (idAdvert) => {
  return (dispatch) => {
      dispatch({ type: START_GET_LIST_INTERESSTED_ADVERTS });
      getListInteresstedAdvert(idAdvert).then((res) => {
          dispatch({ type: STOP_GET_LIST_INTERESSTED_ADVERTS, payload: res.advertTeam.interested });
      }, (err) => {
          console.log(err);
      });
  };
};
export const closeModal = () => {
  return {
    type: CLOSE_MODAL_ADVERT
  };
};
