const mongoose = require('mongoose');

// Regex para validar URL
const urlRegex = /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*)?#?$/; // Recordatorio, nos puede servir en proximas actividades

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'URL de avatar inválida',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
