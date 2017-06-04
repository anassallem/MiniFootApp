import { getPublicationsTeam, getListInteresstedAdvert, deleteAdvertyId } from './api/AdvertApi';
import {
  LOAD_LIST_PUBLICATIONS,
  LOAD_LIST_PUBLICATIONS_BEGIN,
  START_REFRESHING_PUBLICATIONS,
  STOP_REFRESHING_PUBLICATIONS,
  START_GET_LIST_INTERESSTED_MY_PUBLICATIONS,
  STOP_GET_LIST_INTERESSTED_MY_PUBLICATIONS,
  CLOSE_MODAL_ADVERT_MY_PUBLICATIONS,
  DELETE_ADVERT_BY_ID
} from './types';


export const getPublications = (idEquipe, page) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESHING_PUBLICATIONS });
      getPublicationsTeam(idEquipe, page).then((res) => {
          if (res.length > 0) {
              dispatch({ type: LOAD_LIST_PUBLICATIONS, payload: res });
          } else {
              dispatch({ type: STOP_REFRESHING_PUBLICATIONS });
          }
      }, (err) => {
          console.log(err);
      });
  };
};
export const initialListPublications = (idEquipe) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESHING_PUBLICATIONS });
      getPublicationsTeam(idEquipe, 0).then((res) => {
          dispatch({ type: LOAD_LIST_PUBLICATIONS_BEGIN, payload: res });
      }, (err) => {
          console.log(err);
      });
  };
};
export const deleteAdvert = (idAdvert) => {
  return (dispatch) => {
      deleteAdvertyId(idAdvert).then((res) => {
          dispatch({ type: DELETE_ADVERT_BY_ID, payload: idAdvert });
      }, (err) => {
          console.log(err);
      });
  };
};

export const getListInteresstedPublication = (idAdvert) => {
  return (dispatch) => {
      dispatch({ type: START_GET_LIST_INTERESSTED_MY_PUBLICATIONS });
      getListInteresstedAdvert(idAdvert).then((res) => {
          dispatch({ type: STOP_GET_LIST_INTERESSTED_MY_PUBLICATIONS, payload: res.advertTeam.interested });
      }, (err) => {
          console.log(err);
      });
  };
};
export const closeModalPublication = () => {
  return {
    type: CLOSE_MODAL_ADVERT_MY_PUBLICATIONS
  };
};
