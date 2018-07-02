const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileData(data) {
  let errors = {};

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
