import {
  GET_INVITATIONS,
  GET_INVITATIONS_MORE,
  LOADING_INVITATION_FRIENDS,
  DELETE_INVITATIONS,
  ACCEPT_INVITATIONS
} from '../actions/types';

const INITIAL_STATE = {
  invitations: [],
  loading: false,
  page: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVITATIONS:
      return { ...state, invitations: action.payload, loading: false, page: 1 };
    case GET_INVITATIONS_MORE:
      return { ...state, invitations: [...state.invitations, ...action.payload], loading: false, page: 1 };
    case LOADING_INVITATION_FRIENDS:
      return { ...state, loading: true };
    case DELETE_INVITATIONS:
      return { ...state, invitations: state.invitations.filter((invitation) => { return (invitation._id === action.payload) ? false : true; }) };
    case ACCEPT_INVITATIONS:
      return { ...state, invitations: state.invitations.filter((invitation) => { return (invitation._id === action.payload) ? false : true; }) };
    default:
      return state;
  }
};
