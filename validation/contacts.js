const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileData(data) {
  let errors = {};

  if(!isEmpty(data.email)) {
    if (!validator.isEmail(data.email)) {
      errors.email = 'Неправильный адрес электронной почты';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
