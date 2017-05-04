import {
    LOAD_LIST_PUBLICATIONS,
    LOAD_LIST_PUBLICATIONS_BEGIN,
    START_REFRESHING_PUBLICATIONS,
    STOP_REFRESHING_PUBLICATIONS
} from '../actions/types';

const INITIAL_STATE = {
  adverts: [],
  page: 0,
  refreshing: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_REFRESHING_PUBLICATIONS:
        return { ...state, refreshing: true };
    case LOAD_LIST_PUBLICATIONS:
        return { ...state, adverts: [...state.adverts, ...action.payload], page: state.page + 1, refreshing: false };
    case LOAD_LIST_PUBLICATIONS_BEGIN:
        return { ...state, adverts: action.payload, page: 1, refreshing: false };
    case STOP_REFRESHING_PUBLICATIONS:
        return { ...state, refreshing: false };
    default:
      return state;
  }
};
