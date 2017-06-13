import { IMAGES_MULTIPLE,
         GET_IMAGES_MULTIPLE_TEAM,
         INITIAL_STATE_SHOW_TEAM_PHOTOS,
         START_UPLOAD_IMAGE_TEAM,
         DELETE_PICTURE_TEAM } from './types';
import { getAllPhotosTeam, uploadPictureTeam, deletePictureTeam } from './api/EquipeApi';

export const setMultiplePhotos = (response) => {
  return {
    type: IMAGES_MULTIPLE,
    payload: response
  };
};

export const getPhotosTeam = (idEquipe) => {
  return (dispatch) => {
    getAllPhotosTeam(idEquipe).then((res) => {
      if (res.photos.length > 0) {
          dispatch({ type: GET_IMAGES_MULTIPLE_TEAM, payload: res.photos });
      }
    }, (err) => {
      console.log(err);
    }
    );
  };
};

export const uploadImageEquipe = (idEquipe, image) => {
  return (dispatch) => {
    dispatch({ type: START_UPLOAD_IMAGE_TEAM });
    uploadPictureTeam(idEquipe, image).then((res) => {
        let tabs = [];
        tabs.push(JSON.parse(res).imageName);
        dispatch({ type: INITIAL_STATE_SHOW_TEAM_PHOTOS, payload: tabs });
    }, (err) => {
      console.log(err);
    });
  };
};
export const deletePictureMyTeam = (idEquipe, image) => {
  return (dispatch) => {
        deletePictureTeam(idEquipe, image).then((res) => {
            dispatch({ type: DELETE_PICTURE_TEAM, payload: image });
        }, (err) => {
          console.log(err);
        });
  };
};
