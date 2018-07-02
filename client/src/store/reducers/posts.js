import * as types from '../actions/types';

const initialState = {
  post: null,
  errors: {},
  loading: true,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.POST_GET_START:
      return {
        ...state,
        loading: true
      };
    case types.POST_GET_SUCCESS:
      return {
        ...state,
        post: action.post,
        loading: false,
        errors: {}
      };
    case types.POST_GET_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.POST_DELETE_START:
      return {
        ...state,
        loading: true
      };
    case types.POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {}
      };
    case types.POST_DELETE_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.COMMENT_DELETE_START:
      return {
        ...state,
        loading: false
      };
    case types.COMMENT_ADD_START:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
