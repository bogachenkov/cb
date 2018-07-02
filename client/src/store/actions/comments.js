import * as types from './types';
import axios from 'axios';

// DELETE COMMENT
const deleteCommentStart = () => ({
  type: types.COMMENT_DELETE_START
})
const deleteCommentSuccess = (post) => ({
  type: types.COMMENT_DELETE_SUCCESS,
  post
})
const deleteCommentFail = (errors) => ({
  type: types.COMMENT_DELETE_FAIL,
  errors
})

// ADD COMMENT
const addCommentStart = () => ({
  type: types.COMMENT_ADD_START
})
const addCommentSuccess = (post) => ({
  type: types.COMMENT_ADD_SUCCESS,
  post
})
const addCommentFail = (errors) => ({
  type: types.COMMENT_ADD_FAIL,
  errors
})


export const deleteComment = (comment_id, post_id) => {
  return dispatch => {
    dispatch(deleteCommentStart());
    axios.delete(`/api/posts/comment/${post_id}/${comment_id}`)
      .then((res) => {
        dispatch(deleteCommentSuccess(res.data))
      })
      .catch((err) => {
        dispatch(deleteCommentFail(err.response.data))
      })
  };
}

export const addComment = (comment, post_id) => {
  return dispatch => {
    dispatch(addCommentStart());
    axios.post(`/api/posts/comment/${post_id}`, comment)
      .then((res) => {
        dispatch(addCommentSuccess(res.data))
      })
      .catch((err) => {
        dispatch(addCommentFail(err.response.data))
      })
  };
}
