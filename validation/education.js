const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateEducationData(data) {
  let errors = {};

  data.university = isEmpty(data.university) ? '' : data.university;
  data.faculty = isEmpty(data.faculty) ? '' : data.faculty;
  data.specialty = isEmpty(data.specialty) ? '' : data.specialty;
  data.from = isEmpty(data.from) ? '' : data.from;

  if (validator.isEmpty(data.university)) {
    errors.university = 'Необходимо заполнить поле';
  }
  if (validator.isEmpty(data.faculty)) {
    errors.faculty = 'Необходимо заполнить поле';
  }
  if (validator.isEmpty(data.specialty)) {
    errors.specialty = 'Необходимо заполнить поле';
  }
  if (validator.isEmpty(data.from)) {
    errors.from = 'Необходимо заполнить поле';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
