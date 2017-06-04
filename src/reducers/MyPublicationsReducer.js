import {
    LOAD_LIST_PUBLICATIONS,
    LOAD_LIST_PUBLICATIONS_BEGIN,
    START_REFRESHING_PUBLICATIONS,
    STOP_REFRESHING_PUBLICATIONS,
    START_GET_LIST_INTERESSTED_MY_PUBLICATIONS,
    STOP_GET_LIST_INTERESSTED_MY_PUBLICATIONS,
    CLOSE_MODAL_ADVERT_MY_PUBLICATIONS,
    DELETE_ADVERT_BY_ID
} from '../actions/types';

const INITIAL_STATE = {
  adverts: [],
  page: 0,
  refreshing: false,
  listInteressted: [],
  loading: false
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
    case START_GET_LIST_INTERESSTED_MY_PUBLICATIONS:
        return { ...state, loading: true };
    case STOP_GET_LIST_INTERESSTED_MY_PUBLICATIONS:
        return { ...state, listInteressted: action.payload };
    case CLOSE_MODAL_ADVERT_MY_PUBLICATIONS:
        return { ...state, loading: false };
    case DELETE_ADVERT_BY_ID:
        return { ...state, adverts: state.adverts.filter((item) => { return (item._id !== action.payload); }) };
    default:
      return state;
  }
};
