import {
    LOAD_LIST_ADVERTS,
    LOAD_LIST_ADVERTS_BEGIN,
    START_REFRESHING_ADVERTS,
    STOP_REFRESHING_ADVERTS,
    START_POST_INTERESSTED_ADVERTS,
    STOP_POST_INTERESSTED_ADVERTS,
    START_GET_LIST_INTERESSTED_ADVERTS,
    STOP_GET_LIST_INTERESSTED_ADVERTS,
    CLOSE_MODAL_ADVERT
} from '../actions/types';

const INITIAL_STATE = {
  adverts: [],
  page: 0,
  refreshing: false,
  loadInterrested: false,
  loading: false,
  listInteressted: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_REFRESHING_ADVERTS:
        return { ...state, refreshing: true };
    case LOAD_LIST_ADVERTS:
        return { ...state, adverts: [...state.adverts, ...action.payload], page: state.page + 1, refreshing: false };
    case LOAD_LIST_ADVERTS_BEGIN:
        return { ...state, adverts: action.payload, page: 1, refreshing: false };
    case STOP_REFRESHING_ADVERTS:
        return { ...state, refreshing: false };
    case START_POST_INTERESSTED_ADVERTS: {
        let newAdverts = state.adverts;
        newAdverts.forEach((item) => {
            if (item._id === action.payload) {
                 item.testInterested = action.reverse;
                 if (action.reverse) {
                     item.interested.push(action.idUser);
                 } else {
                     if (item.interested.indexOf(action.idUser) > -1) {
                       item.interested.splice(item.interested.indexOf(action.idUser), 1);
                      }
                 }
                 item.countInterested = item.interested.length;
             }
         });
        return { ...state, loadInterrested: true, adverts: newAdverts };
    }
    case STOP_POST_INTERESSTED_ADVERTS:
        return { ...state, loadInterrested: false };
    case START_GET_LIST_INTERESSTED_ADVERTS:
        return { ...state, loading: true };
    case STOP_GET_LIST_INTERESSTED_ADVERTS:
        return { ...state, listInteressted: action.payload };
    case CLOSE_MODAL_ADVERT:
        return { ...state, loading: false };
    default:
      return state;
  }
};
