import * as types from './types';
import axios from 'axios';
import { getAllPosts } from './feed';

// DELETE A POST
const deletePostStart = () => ({
  type: types.POST_DELETE_START
})
const deletePostFail = (errors) => ({
  type: types.POST_DELETE_FAIL,
  errors
})

// GET POST
const getPostStart = () => ({
  type: types.POST_GET_START
})
const getPostSuccess = (post) => ({
  type: types.POST_GET_SUCCESS,
  post
})
const getPostFail = (errors) => ({
  type: types.POST_GET_FAIL,
  errors
})

// ADD POST TO FAVORITES
const addToFavorSuccess = (profile) => ({
  type: types.POST_ADD_FAVORITE,
  profile
})
const addToFavorFailed = (errors) => ({
  type: types.POST_ADD_FAVORITE,
  errors
})

export const getPost = (post_id) => {
  return dispatch => {
    dispatch(getPostStart());
    axios.get(`/api/posts/${post_id}`)
      .then((res) => {
        dispatch(getPostSuccess(res.data))
      })
      .catch((err) => {
        dispatch(getPostFail(err.response.data))
      })
  };
}

export const deletePost = (post_id) => {
  return dispatch => {
    dispatch(deletePostStart());
    axios.delete(`/api/posts/${post_id}`)
      .then((res) => {
        dispatch(getAllPosts())
      })
      .catch((err) => {
        dispatch(deletePostFail(err.response.data))
      })
  };
}
