const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLogin(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;

  if (!validator.isEmail(data.email)) {
    errors.email = 'Неправильный адрес электронной почты';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Необходимо заполнить поле'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Необходимо заполнить поле'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

}
