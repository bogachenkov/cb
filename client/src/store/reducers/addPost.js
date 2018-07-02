import * as types from '../actions/types';

const initialState = {
  loading: false,
  errors: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.POST_ADD_START:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case types.POST_ADD_SUCCESS:
      return {
        loading: false,
        errors: {}
      };
    case types.POST_ADD_FAIL:
      return {
        loading: false,
        errors: action.errors
      };
    default:
      return state;
  }
}
