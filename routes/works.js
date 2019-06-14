const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');
const mongoose = require('mongoose');


router.get('/', function (req, res) {
  let obj = {
    title: 'Мои работы'
  };
  Object.assign(obj, req.app.locals.settings);
  const Model = mongoose.model('site');
  Model
    .find()
    .then(items => {
      // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
      // записей в блоге
      let arr = [];
      for (let index in items) {
        arr.push(items[index]);
      }
      const x = req.app.locals.works.concat(arr);

      Object.assign(obj, {works: x});

      res.render('pages/works', obj);
    });
});

router.post('/', function (req, res) {
  //требуем наличия имени, обратной почты и текста
  if (!req.body.name || !req.body.email || !req.body.text) {
    //если что-либо не указано - сообщаем об этом
    return res.json({status: 'Укажите данные!'});
  }
  //инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: req
      .body
      .text
      .trim()
      .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
  };
  //отправляем почту
  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error);
    //если есть ошибки при отправке - сообщаем об этом
    if (error) {
      return res.json({status: 'При отправке письма произошла ошибка'});
    }
    res.json({status: 'Письмо успешно отправлено'});
  });
});

module.exports = router;
