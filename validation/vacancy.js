const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateVacancyData(data) {
  let errors = {};

  data.title = isEmpty(data.title) ? '' : data.title;
  data.description = isEmpty(data.description) ? '' : data.description;
  data.company = isEmpty(data.company) ? '' : data.company;
  data.skills = isEmpty(data.skills) ? '' : data.skills;

  if (!validator.isLength(data.description, { min:10, max: 3500 })) {
    errors.description = 'Длина описания должна быть в диапазоне от 10 до 3500 символов!'
  }
  if (!validator.isLength(data.title, { max: 100 })) {
    errors.title = 'Длина не должна превышать 100 символов!'
  }

  if (validator.isEmpty(data.title)) {
    errors.title = 'Необходимо заполнить поле';
  }

  if (validator.isEmpty(data.description)) {
    errors.description = 'Необходимо заполнить поле';
  }

  if (validator.isEmpty(data.company)) {
    errors.company = 'Необходимо заполнить поле';
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Необходимо заполнить поле';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
