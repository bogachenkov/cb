import * as types from './types';
import axios from 'axios';
//import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { profileLoadingSuccess, getProfile } from './profile';

export const authStart = () => ({
  type: types.AUTH_START
});

export const authSuccess = (user) => ({
  type: types.AUTH_SUCCESS,
  user
});

export const authFail = (errors) => ({
  type: types.AUTH_FAIL,
  errors
});

export const logout = () => {
  localStorage.removeItem('jwToken');
  localStorage.removeItem('exp_date');
  return {
    type: types.AUTH_LOGOUT
  };
}


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('jwToken');
    if (!token) {
      dispatch(logout());
    }
    else {
      const exp_date = new Date(localStorage.getItem('exp_date'));
      const now = (new Date()).getTime();
      if (exp_date.getTime() >= now) {
        setAuthToken(token);
        // const profile = jwt_decode(token);
        axios.get('/api/profile')
          .then((res) => {
            dispatch(authSuccess(res.data));
            dispatch(profileLoadingSuccess(res.data));
          })
      } else {
        dispatch(logout())
      }
    }
  };
}



export const auth = (authData) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('/api/profile/login', authData)
      .then((response) => {
        const { token, profile } = response.data;
        localStorage.setItem('jwToken', token);
        localStorage.setItem('exp_date', new Date((new Date()).getTime() + (24 * 60 * 60 * 1000)));
        setAuthToken(token);
        dispatch(authSuccess(profile));
        dispatch(profileLoadingSuccess(profile));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data))
      })
  };
}
