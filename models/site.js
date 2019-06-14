'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  PicSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Укажите описание картинки']
    },
    description: {
      type: String,
      required: [true, 'Укажите технологии']
    },
    link: {
      type: String,
      required: [true, 'Укажите ссылку на сайт']
    },
    picture: {
      type: String
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('site', PicSchema);