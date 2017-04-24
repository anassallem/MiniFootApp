import { MODAL_VISIBLE, IMAGES_MULTIPLE, GET_IMAGES_MULTIPLE_TEAM } from './types';
import { getAllPhotosTeam } from './api/EquipeApi';

export const setModalVisible = (visible, key) => {
  return {
    type: MODAL_VISIBLE,
    payload: visible,
    image: key
  };
};

export const setMultiplePhotos = (photos) => {
  return {
    type: IMAGES_MULTIPLE,
    payload: photos
  };
};

export const getPhotosTeam = (idEquipe) => {
  return (dispatch) => {
    getAllPhotosTeam(idEquipe).then((res) => {
      console.log(res);
      if (res.photos.length > 0) {
          dispatch({ type: GET_IMAGES_MULTIPLE_TEAM, payload: res.photos });
      }
    }, (err) => {
      console.log(err);
    }
    );
  };
};
