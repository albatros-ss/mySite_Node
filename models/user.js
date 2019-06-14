'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  login: {
    type: String,
    required: [true, 'Укажите логин']
  },
  password: {
    type: String,
    required: [
      true, 'Укажите пароль'
    ],
    set: v => v !== '' ? crypto
      .createHash('sha256')
      .update(v)
      .digest('hex') : v
  }
});

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('user', UserSchema);