import { getPublicationsTeam } from './api/AdvertApi';
import {
  LOAD_LIST_PUBLICATIONS,
  LOAD_LIST_PUBLICATIONS_BEGIN,
  START_REFRESHING_PUBLICATIONS,
  STOP_REFRESHING_PUBLICATIONS
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
