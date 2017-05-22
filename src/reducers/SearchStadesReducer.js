import {
    START_LOAD_SEARSH_LIST_STADE,
    STOP_LOAD_SEARSH_LIST_STADE,
    SEARCH_LIST_STADE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  stades: [],
  text: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOAD_SEARSH_LIST_STADE:
      return { ...state, loading: true };
    case STOP_LOAD_SEARSH_LIST_STADE:
      return { ...state, loading: false, stades: action.payload };
    case SEARCH_LIST_STADE_CHANGED:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};
