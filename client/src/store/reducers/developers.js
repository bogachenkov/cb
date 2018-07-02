import * as types from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  filteredProfiles: null,
  searchName: '',
  loading: true,
  errors: {}
}

const filterBySearchName = (name, profiles) => {
  return profiles.filter((developer) => {
    return `${developer.name} ${developer.surname}`.toLowerCase().includes(name.toLowerCase());
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DEVELOPERS_LOADING:
      return {
        ...state,
        loading: true
      }
    case types.DEVELOPERS_LOADED_SUCCESS:
      return {
        ...state,
        profiles: action.profiles,
        loading: false,
        errors: {}
      }
    case types.DEVELOPERS_NOT_FOUND:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case types.HANDLE_LOADING_START:
      return {
        ...state,
        loading: true
      }
    case types.HANDLE_LOADING_FAILED:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      }
    case types.HANDLE_LOADING_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        loading: false,
        errors: {}
      }
    case types.DEVELOPES_SEARCH:
      return {
          ...state,
          filteredProfiles: filterBySearchName(action.search, [...state.profiles]),
          searchName: action.search
      }
    default:
      return state;
  }
}

export default reducer;
