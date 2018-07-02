import * as types from './types';
import axios from 'axios';

// LOADING OWN PROFILE

const profileLoading = () => ({
  type: types.PROFILE_LOADING
});

export const profileLoadingSuccess = (profile) => ({
  type: types.PROFILE_LOADING_SUCCESS,
  profile
})

const profileEmpty = (profile) => ({
  type: types.PROFILE_EMPTY,
  profile
})

// CREATING PROFILE
const profileEditStart = () => ({
  type: types.PROFILE_EDIT_START
})
const profileEditFail = (errors) => ({
  type: types.PROFILE_EDIT_FAIL,
  errors
})

// ADDING EDUCATION
const addEduStart = () => ({
  type: types.PROFILE_ADD_EDU_START
});
const addEduSuccess = (profile) => ({
  type: types.PROFILE_ADD_EDU_SUCCESS,
  profile
});
const addEduFail = (errors) => ({
  type: types.PROFILE_ADD_EDU_FAIL,
  errors
});

// DELETE EDUCATION
const deleteEduStart = () => ({
  type: types.PROFILE_DELETE_EDU_START
});
const deleteEduSuccess = (profile) => ({
  type: types.PROFILE_DELETE_EDU_SUCCESS,
  profile
});
const deleteEduFail = (errors) => ({
  type: types.PROFILE_DELETE_EDU_FAIL,
  errors
});

// ADDING EXPERIENCE
const addExpStart = () => ({
  type: types.PROFILE_ADD_EXP_START
});
const addExpSuccess = (profile) => ({
  type: types.PROFILE_ADD_EXP_SUCCESS,
  profile
});
const addExpFail = (errors) => ({
  type: types.PROFILE_ADD_EXP_FAIL,
  errors
});

// DELETE EXPERIENCE
const deleteExpStart = () => ({
  type: types.PROFILE_DELETE_EXP_START
});
const deleteExpSuccess = (profile) => ({
  type: types.PROFILE_DELETE_EXP_SUCCESS,
  profile
});
const deleteExpFail = (errors) => ({
  type: types.PROFILE_DELETE_EXP_FAIL,
  errors
});

// ADDING SOCIAL LINKS
const addSocialStart = () => ({
  type: types.PROFILE_ADD_SOCIAL_START
});
const addSocialSuccess = (profile) => ({
  type: types.PROFILE_ADD_SOCIAL_SUCCESS,
  profile
});
const addSocialFail = (errors) => ({
  type: types.PROFILE_ADD_SOCIAL_FAIL,
  errors
});

// ADDING CONTACTS
const addContactStart = () => ({
  type: types.PROFILE_ADD_CONTACTS_START
});
const addContactSuccess = (profile) => ({
  type: types.PROFILE_ADD_CONTACTS_SUCCESS,
  profile
});
const addContactFail = (errors) => ({
  type: types.PROFILE_ADD_CONTACTS_FAIL,
  errors
});

// ADD_PHOTO
const addPhotoStart = () => ({
  type: types.PROFILE_ADD_PHOTO_START
})
const addPhotoSuccess = (profile) => ({
  type: types.PROFILE_ADD_PHOTO_SUCCESS,
  profile
})
const addPhotoFail = (errors) => ({
  type: types.PROFILE_ADD_PHOTO_FAIL,
  errors
})

// DELETE_PHOTO
const deletePhotoStart = () => ({
  type: types.PROFILE_DELETE_PHOTO_START
})
const deletePhotoSuccess = (profile) => ({
  type: types.PROFILE_DELETE_PHOTO_SUCCESS,
  profile
})
const deletePhotoFail = (errors) => ({
  type: types.PROFILE_DELETE_PHOTO_FAIL,
  errors
})

// EXPORT ACTIONS WITH DISPATCHING

export const getProfile = () => {
  return dispatch => {
    dispatch(profileLoading());
    axios.get('/api/profile')
      .then((res) => {
        dispatch(profileLoadingSuccess(res.data))
      })
      .catch((err) => {
        dispatch(profileEmpty({}));
      })
  };
}

export const editProfile = (profileData) => {
  return dispatch => {
    dispatch(profileEditStart());
    axios.post('/api/profile', profileData)
      .then((res) => {
        dispatch(profileLoadingSuccess(res.data))
      })
      .catch((err) => {
        dispatch(profileEditFail(err.response.data))
      })
  };
}

export const addEducation = (eduData) => {
  return dispatch => {
    dispatch(addEduStart());
    axios.post('/api/profile/education', eduData)
      .then((res) => {
        dispatch(addEduSuccess(res.data))
      })
      .catch((err) => {
        dispatch(addEduFail(err.response.data))
      })
  };
}

export const addExperience = (expData) => {
  return dispatch => {
    dispatch(addExpStart());
    axios.post('/api/profile/experience', expData)
      .then((res) => {
        dispatch(addExpSuccess(res.data))
      })
      .catch((err) => {
        dispatch(addExpFail(err.response.data))
      })
  };
}

export const deleteExperience = (exp_id) => {
  return dispatch => {
    dispatch(deleteExpStart());
    axios.delete(`/api/profile/experience/${exp_id}`)
      .then((res) => {
        dispatch(deleteExpSuccess(res.data))
      })
      .catch((err) => {
        dispatch(deleteExpFail(err.response.data))
      })
  };
}

export const deleteEducation = (edu_id) => {
  return dispatch => {
    dispatch(deleteEduStart());
    axios.delete(`/api/profile/education/${edu_id}`)
      .then((res) => {
        dispatch(deleteEduSuccess(res.data))
      })
      .catch((err) => {
        dispatch(deleteEduFail(err.response.data))
      })
  };
}

export const addContacts = (contacts) => {
  return dispatch => {
    dispatch(addContactStart());
    axios.post('/api/profile/contacts', contacts)
      .then((res) => {
        dispatch(addContactSuccess(res.data))
      })
      .catch((err) => {
        dispatch(addContactFail(err.response.data))
      })
  };
}

export const addSocial = (socials) => {
  return dispatch => {
    dispatch(addSocialStart());
    axios.post('/api/profile/social', socials)
      .then((res) => {
        dispatch(addSocialSuccess(res.data))
      })
      .catch((err) => {
        dispatch(addSocialFail(err.response.data))
      })
  };
}

export const addPhoto = (data) => {
  return dispatch => {
    dispatch(addPhotoStart());
    axios.post(`/api/profile/photo`, data)
      .then((res) => dispatch(addPhotoSuccess(res.data)))
      .catch((err) => dispatch(addPhotoFail(err.response.data)))
  };
}

export const deletePhoto = () => {
  return dispatch => {
    dispatch(deletePhotoStart());
    axios.post(`/api/profile/photo/delete`)
      .then((res) => dispatch(deletePhotoSuccess(res.data)))
      .catch((err) => {
        console.log(err.response.data);
        dispatch(deletePhotoFail(err.response.data))
      })
  };
}
