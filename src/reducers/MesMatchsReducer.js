import {
    START_GET_MES_MATCHS_EQUIPE,
    STOP_GET_MES_MATCHS_EQUIPE,
    STOP_GET_MES_MATCHS_EQUIPE_LOAD,
    DELETE_MATCH_BY_ID,
    ACCEPT_MATCH_BY_ID,
    CHANGE_MODAL_SCORE,
    SCORE_ONE_CHANGED,
    SCORE_TWO_CHANGED,
    ADD_SCORE_TO_MATCH
} from '../actions/types';

const INITIAL_STATE = {
  matchs: [],
  loading: false,
  visible: false,
  idMatch: '',
  teamOne: { name: '' },
  teamTow: { name: '' },
  scoreOne: 0,
  scoreTow: 0,
  page: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_GET_MES_MATCHS_EQUIPE:
      return { ...state, loading: true };
    case STOP_GET_MES_MATCHS_EQUIPE:
      return { ...state, matchs: action.payload, loading: false, page: 1 };
    case STOP_GET_MES_MATCHS_EQUIPE_LOAD:
      return { ...state, matchs: [...state.matchs, ...action.payload], loading: false, page: state.page + 1 };
    case DELETE_MATCH_BY_ID:
      return { ...state, matchs: state.matchs.filter((item) => { return (action.payload !== item._id); }) };
    case ACCEPT_MATCH_BY_ID: {
      let newMatchs = state.matchs.slice();
      newMatchs.forEach((item) => {
        if (action.payload === item._id) {
           item.etat = 1;
        }
      });
      return { ...state, matchs: newMatchs };
    }
    case CHANGE_MODAL_SCORE:
      return { ...state,
               idMatch: action.idMatch,
               teamOne: action.teamOne,
               teamTow: action.teamTow,
               visible: true };
    case SCORE_ONE_CHANGED:
      return { ...state, scoreOne: action.payload };
    case SCORE_TWO_CHANGED:
      return { ...state, scoreTow: action.payload };
    case ADD_SCORE_TO_MATCH:
      return { ...state, visible: false, matchs: state.matchs.filter((item) => { return (action.payload !== item._id); }) };
    default:
      return state;
  }
};
