import { getMesadverts, deleteAdvertyId } from './api/AdvertApi';
import {
  START_REFRESHING_MES_ADVERTS,
  GET_MES_LIST_ADVERTS,
  GET_MES_LIST_ADVERTS_MORE,
  DELETE_ADVERT_USER_BY_ID
} from './types';

export const getListAdvertsUser = (page, idUser) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESHING_MES_ADVERTS });
      getMesadverts(page, idUser).then((res) => {
         if (page === 0) {
             dispatch({ type: GET_MES_LIST_ADVERTS, payload: res });
         } else {
             dispatch({ type: GET_MES_LIST_ADVERTS_MORE, payload: res });
         }
      }, (err) => {
          console.log(err);
      });
  };
};
export const deleteAdvertUserById = (idAdvert) => {
  return (dispatch) => {
      deleteAdvertyId(idAdvert).then((res) => {
          dispatch({ type: DELETE_ADVERT_USER_BY_ID, payload: idAdvert });
      }, (err) => {
          console.log(err);
      });
  };
};
