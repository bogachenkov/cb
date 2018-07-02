import * as types from '../actions/types';

const initialState = {
  loading: true,
  responsing: false,
  errors: {},
  vacancy: null,
  vacancies: null,
  search: '',
  filteredVacancies: null,
  hasBeenDeleted: false
};

const filterBySearch = (search, vacancies) => {
  return vacancies.filter((vacancy) => {
    return `${vacancy.title} ${vacancy.description} ${vacancy.skills.join(' ')}`.toLowerCase().includes(search.toLowerCase());
  })
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.VACANCY_LOAD_ALL_START:
      return {
        ...state,
        errors: {},
        loading: true,
      };
    case types.VACANCY_LOAD_ALL_SUCCESS:
      return {
        ...state,
        errors: {},
        vacancies: action.vacancies,
        loading: false,
      };
    case types.VACANCY_LOAD_ALL_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.VACANCY_LOAD_START:
      return {
        ...state,
        errors: {},
        loading: true,
        vacancy: null
      };
    case types.VACANCY_LOAD_SUCCESS:
      return {
        ...state,
        vacancy: action.vacancy,
        loading: false
      };
    case types.VACANCY_LOAD_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.VACANCY_DELETE_START:
      return {
        ...state,
        errors: {},
        loading: true,
      };
    case types.VACANCY_DELETE_SUCCESS:
      return {
        ...state,
        errors: {},
        vacancy: null,
        hasBeenDeleted: true,
        loading: false
      };
    case types.VACANCY_DELETE_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.RESPONSE_SEND_START:
      return {
        ...state,
        errors: {},
        responsing: true,
      };
    case types.RESPONSE_SEND_SUCCESS:
      return {
        ...state,
        vacancy: action.vacancy,
        responsing: false
      };
    case types.RESPONSE_SEND_FAIL:
      return {
        ...state,
        errors: action.errors,
        responsing: false
      };
    case types.VACANCY_CLEAR_STORE:
      return {
        ...state,
        vacancy: null,
        errors: {},
        loading: true
      };
    case types.VACANCIES_SEARCH:
      return {
        ...state,
        filteredVacancies: filterBySearch(action.search, [...state.vacancies]),
        search: action.search
      };
    default:
      return state;
  }
}
