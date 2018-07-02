const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegister(data) {
  let errors = {};

  data.name = isEmpty(data.name) ? '' : data.name;
  data.surname = isEmpty(data.surname) ? '' : data.surname;
  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;
  data.password_confirm = isEmpty(data.password_confirm) ? '' : data.password_confirm;
  data.username = isEmpty(data.username) ? '' : data.username;
  data.specialty = isEmpty(data.specialty) ? '' : data.specialty;
  data.skills = isEmpty(data.skills) ? '' : data.skills;

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Длина поля должна быть в диапазоне от 2 до 30 символов';
  }
  if (!validator.isLength(data.surname, { min: 2, max: 30 })) {
    errors.surname = 'Длина поля должна быть в диапазоне от 2 до 30 символов';
  }
  if (!validator.isLength(data.username, {max: 40})) {
    errors.username = 'Максимальная длина не должна превышать 40 символов!'
  }
  
  if (!validator.isEmail(data.email)) {
    errors.email = 'Неправильный адрес электронной почты';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Длина пароля должна быть в диапазоне от 6 до 30 символов'
  }

  if (!validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Пароли не совпадают'
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Необходимо заполнить поле'
  }
  if (validator.isEmpty(data.surname)) {
    errors.surname = 'Необходимо заполнить поле'
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Необходимо заполнить поле'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Необходимо заполнить поле'
  }
  if (validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Необходимо заполнить поле'
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
