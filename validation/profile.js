const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileData(data) {
  let errors = {};

  data.username = isEmpty(data.username) ? '' : data.username;
  data.specialty = isEmpty(data.specialty) ? '' : data.specialty;
  data.skills = isEmpty(data.skills) ? '' : data.skills;

  if (!validator.isLength(data.username, {max: 40})) {
    errors.username = 'Максимальная длина не должна превышать 40 символов!'
  }

  // if(!isEmpty(data.email)) {
  //   if (!validator.isEmail(data.email)) {
  //     errors.email = 'Неправильный адрес электронной почты';
  //   }
  // }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Неправильный URL'
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Неправильный URL'
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Неправильный URL'
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Неправильный URL'
    }
  }
  if (!isEmpty(data.vk)) {
    if (!validator.isURL(data.vk)) {
      errors.vk = 'Неправильный URL'
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Неправильный URL'
    }
  }

  if (validator.isEmpty(data.username)) {
    errors.username = 'Необходимо заполнить поле';
  }
  if (validator.isEmpty(data.specialty)) {
    errors.specialty = 'Необходимо заполнить поле';
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Необходимо заполнить поле';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
