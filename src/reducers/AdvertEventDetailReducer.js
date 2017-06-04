import {
    DESCRIPTION_COMMENT_CHANGED,
    START_LOAD_COMMENTS_ADVERT,
    STOP_LOAD_COMMENTS_ADVERT,
    STOP_LOAD_MORE_COMMENTS_ADVERT,
    ADD_COMMENT_ADVERT_EVENT,
    DELETE_COMMENT_ADVERT_EVENT
} from '../actions/types';

const INITIAL_STATE = {
  comments: [],
  page: 0,
  text: '',
  refreshing: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOAD_COMMENTS_ADVERT:
        return { ...state, refreshing: true };
    case STOP_LOAD_MORE_COMMENTS_ADVERT:
        return { ...state, comments: [...state.comments, ...action.payload], page: state.page + 1, refreshing: false };
    case STOP_LOAD_COMMENTS_ADVERT:
        return { ...state, comments: action.payload, page: 1, refreshing: false };
    case DESCRIPTION_COMMENT_CHANGED:
        return { ...state, text: action.payload };
    case ADD_COMMENT_ADVERT_EVENT:
        return { ...state, comments: [...action.payload, ...state.comments], text: '' };
    case DELETE_COMMENT_ADVERT_EVENT:
        return { ...state, comments: state.comments.filter((item) => { return (item._id !== action.payload); }) };
    default:
      return state;
  }
};
