import {
  GET_INVITATIONS,
  LOADING_INVITATION_FRIENDS,
  DELETE_INVITATIONS,
  ACCEPT_INVITATIONS
} from './types';
import { getInvitationsUser, deleteInvitationsUser, acceptInvitationsUser } from './api/FriendsApi';

export const getInvitations = (idUser) => {
  return (dispatch) => {
    dispatch({ type: LOADING_INVITATION_FRIENDS });
    getInvitationsUser(idUser).then((res) => {
      dispatch({ type: GET_INVITATIONS, payload: res });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const deleteInvitations = (idInvitation) => {
  return (dispatch) => {
    deleteInvitationsUser(idInvitation).then((res) => {
      dispatch({ type: DELETE_INVITATIONS, payload: idInvitation });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const acceptInvitations = (idInvitation, invitation) => {
  return (dispatch) => {
    acceptInvitationsUser(idInvitation, invitation).then((res) => {
      dispatch({ type: ACCEPT_INVITATIONS, payload: idInvitation });
      }, (err) => {
        console.log(err);
      }
    );
    };
};
