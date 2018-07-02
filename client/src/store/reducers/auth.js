import * as types from '../actions/types';
import isEmpty from '../utils/isEmpty';

const initialState = {
  isAuth: false,
  errors: {},
  loading: true,
  authRedirectUrl: '/feed'
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        isAuth: false,
        errors: {},
        loading: true
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        errors: {},
        isAuth: !isEmpty(action.user),
      };
    case types.PROFILE_LOADING_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.AUTH_LOGOUT:
      return {
        ...state,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
}
