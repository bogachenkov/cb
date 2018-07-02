const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostData(data, file) {
  let errors = {};

  data.content = isEmpty(data.content) ? '' : data.content;
  data.title = isEmpty(data.title) ? '' : data.title;

  if (!validator.isLength(data.content, { min:10, max: 3500 })) {
    errors.content = 'Длина записи должна быть в диапазоне от 10 до 3500 символов!'
  }
  if (!validator.isLength(data.title, { min:5, max: 100 })) {
    errors.title = 'Длина заголовка должна быть в диапазоне от 5 до 100 символов!'
  }

  if (validator.isEmpty(data.content)) {
    errors.content = 'Необходимо заполнить поле';
  }

  if (validator.isEmpty(data.title)) {
    errors.title = 'Необходимо заполнить поле';
  }

  if (!isEmpty(file)) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      errors.image = 'Неправильный формат изображения, Вы можете загружать только .jpg/.jpeg и .png файлы';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
