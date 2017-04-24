import { MODAL_VISIBLE, IMAGES_MULTIPLE, GET_IMAGES_MULTIPLE_TEAM } from '../actions/types';

const INITIAL_STATE = {
  modalVisible: false,
  modalImage: null,
  images: [],
  photos: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_VISIBLE:
      return { ...state, modalVisible: action.payload, modalImage: action.image };
    case IMAGES_MULTIPLE:
      return { ...state, photos: action.payload };
    case GET_IMAGES_MULTIPLE_TEAM:
      return { ...state, images: action.payload, modalImage: action.imageModal };
    default:
      return state;
  }
};
