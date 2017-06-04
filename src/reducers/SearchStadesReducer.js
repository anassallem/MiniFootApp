import {
    START_LOAD_SEARSH_LIST_STADE,
    STOP_LOAD_SEARSH_LIST_STADE,
    SEARCH_LIST_STADE_CHANGED,
    STOP_LOAD_SEARSH_LIST_STADE_MORE
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  stades: [],
  text: '',
  page: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOAD_SEARSH_LIST_STADE:
      return { ...state, loading: true };
    case STOP_LOAD_SEARSH_LIST_STADE:
      return { ...state, loading: false, stades: action.payload, page: 1 };
    case STOP_LOAD_SEARSH_LIST_STADE_MORE:
      return { ...state, loading: false, stades: [...state.stades, ...action.payload], page: state.page + 1 };
    case SEARCH_LIST_STADE_CHANGED:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};
