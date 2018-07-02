import * as types from '../actions/types';

const initialState = {
  loading: false,
  errors: {},
  v_id: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.VACANCY_ADD_START:
      return {
        ...state,
        errors: {},
        loading: true,
      };
    case types.VACANCY_ADD_SUCCESS:
      return {
        ...state,
        errors: {},
        v_id: action.v_id,
        loading: false,
      };
    case types.VACANCY_ADD_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    case types.VACANCY_CLEAR_V_ID:
      return {
        ...state,
        v_id: null
      };
    default:
      return state;
  }
}
