import {
  LOAD_FORMATION,
  CHANGE_VISIBILITY_ZONE_DROP,
  SET_DROP_ZONE_VALUES,
  FILTER_BUBBLES,
  START_LOADING_FORMATION,
  STOP_LOADING_FORMATION,
  SET_IMAGE_ZONE_VALUES,
  CHANGE_TOP_FORMATION,
  CHANGE_CENTER_FORMATION,
  CHANGE_BOTTOM_FORMATION,
} from '../actions/types';

const INITIAL_STATE = {
  bubbles: [],
  tags: [],
  visibilityZoneDrop: false,
  dropZoneValues: null,
  imageZoneValues: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FORMATION:
      return { ...state, bubbles: action.payload };
    case CHANGE_VISIBILITY_ZONE_DROP:
        return { ...state, visibilityZoneDrop: action.payload };
    case SET_DROP_ZONE_VALUES:
        return { ...state, dropZoneValues: action.payload };
    case SET_IMAGE_ZONE_VALUES:
        return { ...state, imageZoneValues: action.payload };
    case FILTER_BUBBLES:
        return { ...state, bubbles: state.bubbles.filter((bubble) => bubble._id !== action.payload) };
    case START_LOADING_FORMATION:
        return { ...state, loading: true };
    case STOP_LOADING_FORMATION:
        return { ...state, loading: false };
    /*case CHANGE_TOP_FORMATION: {
        let top = 0;
        let center = 0;
        let bottom = 0;
        let newBubbles = state.bubbles.slice();
        newBubbles.forEach((item) => {
            if (item.idJoueur._id === action.payload) {
                item.position = { top: 1, center: 0, bottom: 0 };
            }
            top += item.position.top;
            center += item.position.center;
            bottom += item.position.bottom;
        });
        return { ...state, bubbles: newBubbles, top, center, bottom };
    }
    case CHANGE_CENTER_FORMATION: {
        let top = 0;
        let center = 0;
        let bottom = 0;
        let newBubbles = state.bubbles.slice();
        newBubbles.forEach((item) => {
            if (item.idJoueur._id === action.payload) {
                item.position = { top: 0, center: 1, bottom: 0 };
            }
            top += item.position.top;
            center += item.position.center;
            bottom += item.position.bottom;
        });
        return { ...state, bubbles: newBubbles, top, center, bottom };
    }
    case CHANGE_BOTTOM_FORMATION: {
        let top = 0;
        let center = 0;
        let bottom = 0;
        let newBubbles = state.bubbles.slice();
        newBubbles.forEach((item) => {
            if (item.idJoueur._id === action.payload) {
                item.position = { top: 0, center: 0, bottom: 1 };
            }
            top += item.position.top;
            center += item.position.center;
            bottom += item.position.bottom;
        });
        return { ...state, bubbles: newBubbles, top, center, bottom };
    }*/
    default:
      return state;
  }
};
