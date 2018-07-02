const isEmpty = require('./isEmpty');

module.exports = function validateImage(file) {
  let errors = {};
  if (isEmpty(file)) {
    errors.image = 'Вы не выбрали изображение';
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
