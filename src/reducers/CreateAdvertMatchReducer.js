import {
  EQUIPE_DESCRIPTION_ADVERT_CHANGED,
  CHECKBOX_CHANGED,
  START_ADD_NEW_ADVERT,
  INITIAL_ADD_NEW_ADVERT
} from '../actions/types';

const INITIAL_STATE = {
  description: '',
  testLundi: false,
  testMardi: false,
  testMercredi: false,
  testJeudi: false,
  testVendredi: false,
  testSamedi: false,
  testDimanche: false,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EQUIPE_DESCRIPTION_ADVERT_CHANGED:
        return { ...state, description: action.payload };
    case CHECKBOX_CHANGED:
        return { ...state, [action.payload.prop]: !action.payload.value };
    case START_ADD_NEW_ADVERT:
        return { ...state, loading: true };
    case INITIAL_ADD_NEW_ADVERT:
        return { ...INITIAL_STATE };
    default:
      return state;
  }
};
