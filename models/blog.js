'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  BlogSchema = new Schema({
    title: {
      type: String,
      required: [true, 'Укажите заголовок статьи']
    },
    text: {
      type: String,
      required: [true, 'Укажите содержимое статьи']
    },
    date: {
      type: String,
      default: Date.now,
      required: [true, 'Укажите дату публикации']
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('blog', BlogSchema);