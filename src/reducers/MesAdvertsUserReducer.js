import {
    START_REFRESHING_MES_ADVERTS,
    GET_MES_LIST_ADVERTS,
    GET_MES_LIST_ADVERTS_MORE,
    DELETE_ADVERT_USER_BY_ID
} from '../actions/types';

const INITIAL_STATE = {
  adverts: [],
  page: 0,
  refreshing: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_REFRESHING_MES_ADVERTS:
        return { ...state, refreshing: true };
    case GET_MES_LIST_ADVERTS_MORE:
        return { ...state, adverts: [...state.adverts, ...action.payload], page: state.page + 1, refreshing: false };
    case GET_MES_LIST_ADVERTS:
        return { ...state, adverts: action.payload, page: 1, refreshing: false };
    case DELETE_ADVERT_USER_BY_ID:
        return { ...state, adverts: state.adverts.filter((item) => { return (action.payload !== item._id); }) };
    default:
      return state;
  }
};
