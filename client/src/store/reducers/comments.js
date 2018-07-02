import * as types from '../actions/types';

const initialState = {
  comments: [],
  errors: {},
  loading: true,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.COMMENT_ADD_START:
      return {
        ...state,
        loading: true
      };
    case types.COMMENT_ADD_SUCCESS:
      return {
        ...state,
        comments: action.post.comments,
        loading: false,
        errors: {}
      };
    case types.COMMENT_ADD_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.COMMENT_DELETE_START:
      return {
        ...state,
        loading: true
      };
    case types.COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        comments: action.post.comments,
        loading: false,
        errors: {}
      };
    case types.COMMENT_DELETE_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.POST_GET_SUCCESS:
      return {
        ...state,
        comments: action.post.comments,
        loading: false,
        errors: {}
      };
    default:
      return state;
  }
}
