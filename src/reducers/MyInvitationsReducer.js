import {
  GET_INVITATIONS,
  LOADING_INVITATION_FRIENDS,
  DELETE_INVITATIONS,
  ACCEPT_INVITATIONS
} from '../actions/types';

const INITIAL_STATE = {
  invitations: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVITATIONS:
      return { ...state, invitations: action.payload, loading: false };
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
