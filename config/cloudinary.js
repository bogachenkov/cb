if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cloudinary_prod');
} else {
  module.exports = require('./cloudinary_dev');
}
