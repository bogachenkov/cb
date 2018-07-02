import * as types from './types';
import axios from 'axios';

// ADD VACANCY
const addVacancyStarts = () => ({
  type: types.VACANCY_ADD_START
});
const addVacancySuccess = (v_id) => ({
  type: types.VACANCY_ADD_SUCCESS,
  v_id
});
const addVacancyFails = (errors) => ({
  type: types.VACANCY_ADD_FAIL,
  errors
});

// LOAD ALL VACANCIES
const startLoadingAll = () => ({
  type: types.VACANCY_LOAD_ALL_START
});
const loadingAllSuccess = (vacancies) => ({
  type: types.VACANCY_LOAD_ALL_SUCCESS,
  vacancies
});
const loadingAllFail = (errors) => ({
  type: types.VACANCY_LOAD_ALL_FAIL,
  errors
});

// LOAD VACANCY BY ID
const startLoading = () => ({
  type: types.VACANCY_LOAD_START
});
const loadingSuccess = (vacancy) => ({
  type: types.VACANCY_LOAD_SUCCESS,
  vacancy
});
const loadingFails = (errors) => ({
  type: types.VACANCY_LOAD_FAIL,
  errors
});

// SEND VACANCY RESPONSE
const sendResponseStart = () => ({
  type: types.RESPONSE_SEND_START
});
const sendResponseSuccess = (vacancy) => ({
  type: types.RESPONSE_SEND_SUCCESS,
  vacancy
});
const sendResponseFails = (errors) => ({
  type: types.RESPONSE_SEND_FAIL,
  errors
});

// DELETE VACANCY
const deleteStart = () => ({
  type: types.VACANCY_DELETE_START
});
const deleteSuccess = () => ({
  type: types.VACANCY_DELETE_SUCCESS,
});
const deleteFails = (errors) => ({
  type: types.VACANCY_DELETE_FAIL,
  errors
});

export const addVacancy = (data) => {
  return dispatch => {
    dispatch(addVacancyStarts);
    axios.post(`/api/vacancies`, data)
      .then((res) => {
        dispatch(addVacancySuccess(res.data.v_id))
      })
      .catch((err) => {
        dispatch(addVacancyFails(err.response.data))
      })
  };
};

export const loadAllVacancies = () => {
  return dispatch => {
    dispatch(startLoadingAll());
    axios.get('/api/vacancies')
      .then(res => dispatch(loadingAllSuccess(res.data)))
      .catch((err) => dispatch(loadingAllFail(err.response.data)))
  };
};

export const loadMyVacancies = () => {
  return dispatch => {
    dispatch(startLoadingAll());
    axios.get('/api/vacancies/my')
      .then(res => dispatch(loadingAllSuccess(res.data)))
      .catch((err) => dispatch(loadingAllFail(err.response.data)))
  };
};

export const loadMyResponses = () => {
  return dispatch => {
    dispatch(startLoadingAll());
    axios.get('/api/vacancies/responses')
      .then(res => dispatch(loadingAllSuccess(res.data)))
      .catch((err) => dispatch(loadingAllFail(err.response.data)))
  };
};

export const responseVacancy = (id) => dispatch => {
  dispatch(sendResponseStart());
  axios.post(`/api/vacancies/responses`, id)
    .then(res => dispatch(sendResponseSuccess(res.data)))
    .catch(err => dispatch(sendResponseFails(err.response.data)))
};

export const applyViewed = (id, data) => dispatch => {
  dispatch(sendResponseStart());
  axios.post(`/api/vacancies/apply/${id}`, data)
    .then(res => dispatch(sendResponseSuccess(res.data)))
    .catch(err => dispatch(sendResponseFails(err.response.data)))
};


export const loadVacancy = (id) => dispatch => {
  dispatch(startLoading());
  axios.get(`/api/vacancies/${id}`)
    .then(res => dispatch(loadingSuccess(res.data)))
    .catch(err => dispatch(loadingFails(err.response.data)))
};

export const clearVId = () => ({
  type: types.VACANCY_CLEAR_V_ID
});

export const clearVacancy = () => ({
  type: types.VACANCY_CLEAR_STORE
});

export const deleteVacancy = (id) => dispatch => {
  dispatch(deleteStart());
  axios.delete(`/api/vacancies/${id}`)
    .then(() => dispatch(deleteSuccess()))
    .catch(err => dispatch(deleteFails(err.response.data)));
};

export const searchVacancies = (search) => ({
  type: types.VACANCIES_SEARCH,
  search
});