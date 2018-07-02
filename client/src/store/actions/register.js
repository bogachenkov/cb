import * as types from './types';
import axios from 'axios';

export const registerStart = () => {
  return {
    type: types.REGISTER_START,
  };
}

export const registerSuccess = () => {
  return {
    type: types.REGISTER_SUCCESS
  };
}

export const registerFail = (errors) => {
  return {
    type: types.REGISTER_FAIL,
    errors
  };
}

export const registerCleanAfterRedirect = () => {
  return {
    type: types.REGISTER_CLEAN_AFTER_REDIRECT
  };
}

export const register = (userData) => {
  return dispatch => {
    dispatch(registerStart());
    axios.post('/api/profile/register', userData)
      .then((res) => {
        dispatch(registerSuccess());
        dispatch(registerCleanAfterRedirect());
      })
      .catch((err) => {
        dispatch(registerFail(err.response.data))
      });
  };
}
