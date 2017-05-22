import {
    START_GET_MES_MATCHS_MY_EQUIPE,
    STOP_GET_MES_MATCHS_MY_EQUIPE,
    STOP_GET_MES_MATCHS_MY_EQUIPE_LOAD
} from '../actions/types';

const INITIAL_STATE = {
  listMatchs: [],
  loading: false,
  page: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_GET_MES_MATCHS_MY_EQUIPE:
      return { ...state, loading: true };
    case STOP_GET_MES_MATCHS_MY_EQUIPE:
      return { ...state, listMatchs: action.payload, loading: false, page: 1 };
    case STOP_GET_MES_MATCHS_MY_EQUIPE_LOAD:
      return { ...state, listMatchs: [...state.listMatchs, ...action.payload], loading: false, page: state.page + 1 };
    default:
      return state;
  }
};
