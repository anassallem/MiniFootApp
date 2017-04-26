import {
  LOAD_FORMATION,
  CHANGE_VISIBILITY_ZONE_DROP,
  SET_DROP_ZONE_VALUES,
  FILTER_BUBBLES,
  START_LOADING_FORMATION,
  STOP_LOADING_FORMATION
} from '../actions/types';

const INITIAL_STATE = {
  bubbles: [],
  visibilityZoneDrop: false,
  dropZoneValues: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FORMATION:
      return { ...state, bubbles: action.payload };
    case CHANGE_VISIBILITY_ZONE_DROP:
        return { ...state, visibilityZoneDrop: action.payload };
    case SET_DROP_ZONE_VALUES:
        return { ...state, dropZoneValues: action.payload };
    case FILTER_BUBBLES:
    console.log(state.bubbles);
        return { ...state, bubbles: state.bubbles.filter((bubble) => bubble._id !== action.payload) };
    case START_LOADING_FORMATION:
        return { ...state, loading: true };
    case STOP_LOADING_FORMATION:
        return { ...state, loading: false };
    default:
      return state;
  }
};
