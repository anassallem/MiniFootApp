import {
    SWITCH_MODAL_CHANGED,
    TEAM_ADVERSAIRE_CHANGED,
    START_LOAD_CREATE_MATCH,
    INITIAL_STATE_CREATE_MATCH,
    SWITCH_MODAL_STADE_CHANGED,
    START_LOAD_SEARSH_STADE,
    STOP_LOAD_SEARSH_STADE,
    STADE_CHANGED,
    SEARCH_STADE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  visible: false,
  visibleStade: false,
  teamAdversaire: null,
  loadCreate: false,
  loadingStade: false,
  stades: [],
  stade: null,
  textStade: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_MODAL_CHANGED:
      return { ...state, visible: !state.visible };
    case TEAM_ADVERSAIRE_CHANGED:
      return { ...state, teamAdversaire: action.payload };
    case START_LOAD_CREATE_MATCH:
      return { ...state, loadCreate: true };
    case INITIAL_STATE_CREATE_MATCH:
      return { ...INITIAL_STATE };
    case SWITCH_MODAL_CHANGED:
      return { ...state, visible: !state.visible };
    case SWITCH_MODAL_STADE_CHANGED:
      return { ...state, visibleStade: !state.visibleStade };
    case START_LOAD_SEARSH_STADE:
      return { ...state, loadingStade: true };
    case STOP_LOAD_SEARSH_STADE:
      return { ...state, loadingStade: false, stades: action.payload };
    case STADE_CHANGED:
      return { ...state, stade: action.payload };
    case SEARCH_STADE_CHANGED:
      return { ...state, textStade: action.payload };
    default:
      return state;
  }
};
