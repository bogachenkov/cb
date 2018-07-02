import * as types from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  errors: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.profile,
        errors: {}
      }
    case types.PROFILE_EMPTY:
      return {
        ...state,
        loading: false,
        profile: action.profile
      }
    case types.PROFILE_EDIT_START:
      return {
        ...state,
        loading: true,
      }
    case types.PROFILE_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.errors
      }
    case types.PROFILE_ADD_EDU_START:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_ADD_EDU_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.PROFILE_ADD_EDU_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    case types.PROFILE_DELETE_EDU_START:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_DELETE_EDU_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.PROFILE_DELETE_EDU_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    case types.PROFILE_ADD_EXP_START:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_ADD_EXP_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.PROFILE_ADD_EXP_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    case types.PROFILE_DELETE_EXP_START:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_DELETE_EXP_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.PROFILE_DELETE_EXP_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    case types.PROFILE_ADD_CONTACTS_START:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_ADD_CONTACTS_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.PROFILE_ADD_CONTACTS_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    case types.PROFILE_ADD_SOCIAL_START:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_ADD_SOCIAL_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.PROFILE_ADD_SOCIAL_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    case types.PROFILE_ADD_PHOTO_START:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_ADD_PHOTO_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.PROFILE_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    case types.PROFILE_DELETE_PHOTO_START:
      return {
        ...state,
        loading: true
      }
    case types.PROFILE_DELETE_PHOTO_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.PROFILE_DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    default:
      return state;
  }
}

export default reducer;
