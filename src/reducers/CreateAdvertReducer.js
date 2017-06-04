import {
    DESCRIPTION_ADVERT_CHANGED,
    START_ADD_NEW_ADVERT_USER,
    INITIAL_ADD_NEW_ADVERT_USER
} from '../actions/types';

const INITIAL_STATE = {
  description: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DESCRIPTION_ADVERT_CHANGED:
        return { ...state, description: action.payload };
    case START_ADD_NEW_ADVERT_USER:
        return { ...state, loading: true };
    case INITIAL_ADD_NEW_ADVERT_USER:
        return { ...INITIAL_STATE };
    default:
      return state;
  }
};
