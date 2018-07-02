const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExperienceData(data) {
  let errors = {};

  data.title = isEmpty(data.title) ? '' : data.title;
  data.from = isEmpty(data.from) ? '' : data.from;

  if (validator.isEmpty(data.title)) {
    errors.title = 'Необходимо заполнить поле';
  }
  if (validator.isEmpty(data.from)) {
    errors.from = 'Необходимо заполнить поле';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
