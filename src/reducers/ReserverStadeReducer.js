import {
    GET_MATCHS_STADE,
    START_GET_MATCHS_STADE,
    CHANGE_MODAL_RESERVER_STADE,
    CHANGE_MODAL_DATE_STADE,
    MESSAGE_RESERVER_CHANGED,
    DATE_CHANGED,
    START_ENVOYER_MATCHS_STADE,
    STOP_ENVOYER_MATCHS_STADE,
    HIDE_MODAL_CHARGEMENT
} from '../actions/types';

const INITIAL_STATE = {
  events: [],
  loading: false,
  visible: false,
  date: new Date(),
  message: '',
  show: false,
  loadEnvoyer: false,
  response: 'Chargement ...'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MATCHS_STADE:
        return { ...state, events: action.payload, loading: false };
    case START_GET_MATCHS_STADE:
        return { ...state, loading: true };
    case CHANGE_MODAL_DATE_STADE:
        return { ...state, visible: !state.visible };
    case DATE_CHANGED:
        return { ...state, visible: !state.visible, date: action.payload };
    case CHANGE_MODAL_RESERVER_STADE:
        return { ...state, show: !state.show };
    case MESSAGE_RESERVER_CHANGED:
        return { ...state, message: action.payload };
    case START_ENVOYER_MATCHS_STADE:
        return { ...state, loadEnvoyer: true, show: false, visible: false };
    case STOP_ENVOYER_MATCHS_STADE:
        return { ...state, message: '', response: action.payload };
    case HIDE_MODAL_CHARGEMENT:
        return { ...state, loadEnvoyer: false, response: 'Chargement ...' };
    default:
        return state;
  }
};
