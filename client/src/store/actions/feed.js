import * as types from './types';
import axios from 'axios';


// ADD A POST
const addPostStart = () => ({
  type: types.POST_ADD_START
})
const addPostSuccess = (posts) => ({
  type: types.POST_ADD_SUCCESS,
  posts
})
const addPostFail = (errors) => ({
  type: types.POST_ADD_FAIL,
  errors
})


// GET ALL POSTS
const getAllPostStart = () => ({
  type: types.POST_GET_ALL_START
})
const getAllPostSuccess = (posts) => ({
  type: types.POST_GET_ALL_SUCCESS,
  posts
})
const getAllPostFail = (errors) => ({
  type: types.POST_GET_ALL_FAIL,
  errors
})

// FILTER POSTS BY TAG
export const getPostsByTag = (tag) => ({
  type: types.POST_GET_BY_TAG,
  tag
})
export const clearTagSearch = () => ({
  type: types.POST_CLEAR_TAG
})

export const addPost = (postData) => {
  return dispatch => {
    dispatch(addPostStart());
    axios.post('/api/posts', postData)
      .then((res) => {
        dispatch(addPostSuccess(res.data))
      })
      .catch((err) => {
        dispatch(addPostFail(err.response.data))
      })
  };
}

export const getAllPosts = (tag) => {
  return dispatch => {
    dispatch(getAllPostStart());
    axios.get('/api/posts')
      .then((res) => {
        dispatch(getAllPostSuccess(res.data));
        if (tag) dispatch(getPostsByTag(tag));
      })
      .catch((err) => {
        dispatch(getAllPostFail(err.response.data))
      })
  };
}
