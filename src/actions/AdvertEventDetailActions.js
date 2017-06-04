import {
  DESCRIPTION_COMMENT_CHANGED,
  START_LOAD_COMMENTS_ADVERT,
  STOP_LOAD_COMMENTS_ADVERT,
  STOP_LOAD_MORE_COMMENTS_ADVERT,
  ADD_COMMENT_ADVERT_EVENT,
  DELETE_COMMENT_ADVERT_EVENT
} from './types';
import { getListCommentAdvert, addCommentAdvertEvent, deleteCommentAdvertEvent } from './api/AdvertApi';

export const descriptionCommentChanged = (text) => {
  return {
    type: DESCRIPTION_COMMENT_CHANGED,
    payload: text
  };
};
export const deleteCommentAdvert = (idComment) => {
    return (dispatch) => {
        deleteCommentAdvertEvent(idComment).then((res) => {
            dispatch({ type: DELETE_COMMENT_ADVERT_EVENT, payload: idComment });
        }, (err) => {
            console.log(err);
        });
    };
};
export const addCommentAdvert = (comment, postedBy) => {
    return (dispatch) => {
        addCommentAdvertEvent(comment).then((res) => {
            res.postedBy = postedBy;
            let comments = [];
            comments.push(res);
            dispatch({ type: ADD_COMMENT_ADVERT_EVENT, payload: comments });
        }, (err) => {
            console.log(err);
        });
    };
};

export const getListComment = (idAdvert, page) => {
    return (dispatch) => {
        dispatch({ type: START_LOAD_COMMENTS_ADVERT });
        getListCommentAdvert(idAdvert, page).then((res) => {
            if (page === 0) {
                dispatch({ type: STOP_LOAD_COMMENTS_ADVERT, payload: res });
            } else {
                dispatch({ type: STOP_LOAD_MORE_COMMENTS_ADVERT, payload: res });
            }
        }, (err) => {
            console.log(err);
        });
    };
};
