import * as types from './types';
import axios from 'axios';


// LOADING ALL PROFILES
const developersLoading = () => ({
  type: types.DEVELOPERS_LOADING
});

const developersLoadingSuccess = (profiles) => ({
  type: types.DEVELOPERS_LOADED_SUCCESS,
  profiles
});

const developersNotFound = (errors) => ({
  type: types.DEVELOPERS_NOT_FOUND,
  errors
});

// GET PROFILE BY HANDLE
const loadByHandleStart = () => ({
  type: types.HANDLE_LOADING_START
});
const loadByHandleSuccess = (profile) => ({
  type: types.HANDLE_LOADING_SUCCESS,
  profile
});
const loadByHandleFail = (errors) => ({
  type: types.HANDLE_LOADING_FAILED,
  errors
});

// SEARCH DEVELOPERS

export const searchDevelopers = (search) => ({
  type: types.DEVELOPES_SEARCH,
  search
});

export const getAllDevelopers = () => {
  return dispatch => {
    dispatch(developersLoading());
    axios.get('/api/profile/all')
      .then((res) => {
        dispatch(developersLoadingSuccess(res.data))
      })
      .catch((err) => {
        dispatch(developersNotFound(err.response.data))
      })
  };
};

export const getDeveloperByUsername = (username) => {
  return dispatch => {
    dispatch(loadByHandleStart());
    axios.get(`/api/profile/username/${username}`)
      .then(res => {
        dispatch(loadByHandleSuccess(res.data))
      })
      .catch((err) => {
        dispatch(loadByHandleFail(err.response.data))
      })
  };
};
