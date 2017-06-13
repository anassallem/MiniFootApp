import { IMAGES_MULTIPLE,
         GET_IMAGES_MULTIPLE_TEAM,
         INITIAL_STATE_SHOW_TEAM_PHOTOS,
         START_UPLOAD_IMAGE_TEAM,
         DELETE_PICTURE_TEAM } from '../actions/types';

const INITIAL_STATE = {
  photos: [],
  image: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_IMAGES_MULTIPLE_TEAM:
        return { ...state, photos: action.payload };
    case IMAGES_MULTIPLE:
        return { ...state, image: action.payload };
    case START_UPLOAD_IMAGE_TEAM:
        return { ...state, loading: true };
    case INITIAL_STATE_SHOW_TEAM_PHOTOS:
        return { ...state, image: null, loading: false, photos: [...state.photos, ...action.payload] };
    case DELETE_PICTURE_TEAM:
        return { ...state, image: null, photos: state.photos.filter((item) => { return (item !== action.payload); }) };
    default:
      return state;
  }
};
