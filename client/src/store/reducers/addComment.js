import * as types from '../actions/types';

const initialState = {
  loading: false
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
        loading: false,
      };
    case types.COMMENT_ADD_FAIL:
      return {
        loading: false,
      };
    default:
      return state;
  }
}
