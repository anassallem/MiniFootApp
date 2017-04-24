import { MODAL_VISIBLE, IMAGES_MULTIPLE } from './types';

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
