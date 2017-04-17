import { getUser, getUserSkills, uploadImageUser, getRelationshipUser, removeFriends, deleteInvitationFriend, addInvitation, confirmInvitationsUser } from './api/UserApi';
import { URL } from './api/config';
import {
  GET_USER,
  GET_USER_SKILLS,
  IMAGE_CHANGED,
  UPLOAD_IMAGE_USER,
  REFRESH_START,
  GET_RELATIONSHIP_USER,
  DELETE_RELATIONSHIP_USER,
  CANCEL_INVITATION_USER,
  ADD_INVITATION_USER,
  CONFIRM_INVITATIONS
} from './types';


export const getUserById = (idUser) => {
  return (dispatch) => {
  getUser(idUser).then((res, err) => {
    if (err) {
      console.log(err);
    } else {
        const newUser = { ...res, photo: `${URL}/users/upload/${res.photo}` };
        dispatch({ type: GET_USER, payload: newUser });
    }
  });
  };
};

export const changeImage = (uri, data, show) => {
  return {
    type: IMAGE_CHANGED,
    payload: uri,
    photo: data,
    show
  };
};

export const getSkills = (idUser) => {
  return (dispatch) => {
    dispatch({ type: REFRESH_START });
      getUserSkills(idUser).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
            dispatch({ type: GET_USER_SKILLS, payload: res, refresh: false });
        }
      });
  };
};

export const uploadImage = (idUser, photo) => {
  return (dispatch) => {
      dispatch({ type: UPLOAD_IMAGE_USER, payload: true });
      uploadImageUser(idUser, photo).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
            dispatch({ type: UPLOAD_IMAGE_USER, payload: false });
        }
      });
  };
};

export const getRelationship = (idUser, idFriend) => {
    return (dispatch) => {
        getRelationshipUser(idUser, idFriend).then((res, err) => {
          if (err) {
            console.log(err);
          } else {
              dispatch({ type: GET_RELATIONSHIP_USER, payload: res });
          }
        });
    };
};

export const deleteFriend = (idInvitation, relationship) => {
    return (dispatch) => {
        removeFriends(idInvitation, relationship).then((res, err) => {
          if (err) {
            console.log(err);
          } else {
              dispatch({ type: DELETE_RELATIONSHIP_USER, payload: res });
          }
        });
    };
};

export const cancelInvitationFriend = (idInvitation) => {
    return (dispatch) => {
        deleteInvitationFriend(idInvitation).then((res, err) => {
          if (err) {
            console.log(err);
          } else {
              dispatch({ type: CANCEL_INVITATION_USER, payload: res });
          }
        });
    };
};

export const addInvitationFriend = (idUser, idFriend, title) => {
    return (dispatch) => {
        addInvitation(idUser, idFriend, title).then((res, err) => {
          if (err) {
            console.log(err);
          } else {
              dispatch({ type: ADD_INVITATION_USER, payload: res.data._id });
          }
        });
    };
};

export const confirmInvitations = (idInvitation, invitation) => {
  return (dispatch) => {
    confirmInvitationsUser(idInvitation, invitation).then((res) => {
      dispatch({ type: CONFIRM_INVITATIONS, payload: idInvitation });
      }, (err) => {
        console.log(err);
      }
    );
    };
};
