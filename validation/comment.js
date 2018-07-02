const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostData(data) {
  let errors = {};

  data.text = isEmpty(data.text) ? '' : data.text;

  if (!validator.isLength(data.text, { max: 250 })) {
    errors.text = 'Максимальная длина комментария: 350 символов!'
  }

  if (validator.isEmpty(data.text)) {
    errors.text = 'Необходимо заполнить поле';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
