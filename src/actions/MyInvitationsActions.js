import {
  GET_INVITATIONS,
  LOADING_INVITATION_FRIENDS,
  DELETE_INVITATIONS,
  ACCEPT_INVITATIONS,
  GET_INVITATIONS_MORE
} from './types';
import { getInvitationsUser, deleteInvitationsUser, acceptInvitationsUser } from './api/FriendsApi';

export const getInvitations = (page, idUser) => {
  return (dispatch) => {
    dispatch({ type: LOADING_INVITATION_FRIENDS });
    getInvitationsUser(page, idUser).then((res) => {
        if (page === 0) {
            dispatch({ type: GET_INVITATIONS, payload: res });
        } else {
            dispatch({ type: GET_INVITATIONS_MORE, payload: res });
        }
      }, (err) => {
        console.log(err);
      });
    };
};

export const deleteInvitations = (idInvitation) => {
  return (dispatch) => {
    deleteInvitationsUser(idInvitation).then((res) => {
      dispatch({ type: DELETE_INVITATIONS, payload: idInvitation });
      }, (err) => {
        console.log(err);
      });
    };
};

export const acceptInvitations = (idInvitation, invitation, socket) => {
  return (dispatch) => {
    acceptInvitationsUser(idInvitation, invitation).then((res) => {
        console.log(res);
        socket.emit('newRoomCreated', res);
      dispatch({ type: ACCEPT_INVITATIONS, payload: idInvitation });
      }, (err) => {
        console.log(err);
      });
    };
};
