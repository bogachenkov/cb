import * as types from '../actions/types';

const initialState = {
  loading: false,
  errors: {},
  isRegisterSuccess: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_START:
      return {
        ...state,
        errors: {},
        loading: true,
        isRegisterSuccess: false
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        errors: {},
        loading: false,
        isRegisterSuccess: true
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false,
        isRegisterSuccess: false
      };
    case types.REGISTER_CLEAN_AFTER_REDIRECT:
      return {
        ...state,
        isRegisterSuccess: false
      };
    default:
      return state;
  }
}
