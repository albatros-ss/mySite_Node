const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const mongoose = require('mongoose');

const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том, что он является
    // администратором
    if (req.session.isAdmin) {
        //то всё хорошо :)
        return next();
    }
    //если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/');
};

router.get('/', isAdmin, function (req, res) {
    let obj = {
        title: 'Админ панель'
    };
    Object.assign(obj, req.app.locals.settings);

    const Model = mongoose.model('skills');
    //получаем список записей в блоге из базы
    Model
        .find()
        .then(items => {
            // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
            // записей в блоге
            if (items[0]) {
                const objNew = items[0].skills[0];
                const objOld = req.app.locals.skills;
                for (key in objOld) {
                    for (x in objOld[key]) {
                        objOld[key][x] = objNew[x];
                    }
                }
                Object.assign(obj, objOld);
            }
            res.render('pages/admin', obj);
        });
});
router.post('/upload', function (req, res) {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), config.upload);
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.json({status: 'Не удалось добавить сайт'});
        }
        if (!fields.name) {
            fs.unlink(files.photo.path);
            return res.json({status: 'Не указано описание сайта!'});
        }
        const Model = mongoose.model('site');
        fs.rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {

            if (err) {
                fs.unlink(path.join(config.upload, files.photo.name));
                fs.rename(files.photo.path, files.photo.name);
            }
            let dir = config
                .upload
                .substr(config.upload.indexOf('/'));
            const item = new Model({
                name: fields.name,
                description: fields.description, link: fields.link, picture: path.join(dir, files.photo.name)
            });
            item
                .save()
                .then(
                    i => res.json({status: 'Проект добавлен'}),
                    e => res.json({status: e.message})
                );
        });
    });
});

router.post('/addpost', isAdmin, (req, res) => {
    //требуем наличия заголовка, даты и текста
    if (!req.body.title || !req.body.date || !req.body.text) {
        //если что-либо не указано - сообщаем об этом
        return res.json({status: 'Укажите данные!'});
    }
    //создаем новую запись блога и передаем в нее поля из формы
    const Model = mongoose.model('blog');
    let item = new Model({title: req.body.title, date: req.body.date, text: req.body.text});
    item.save().then(
        //обрабатываем и отправляем ответ в браузер
        (i) => {
            return res.json({status: 'Запись успешно добавлена'});
        }, e => {
            //если есть ошибки, то получаем их список и так же передаем в шаблон
            const error = Object
                .keys(e.errors)
                .map(key => e.errors[key].message)
                .join(', ');

            //обрабатываем шаблон и отправляем его в браузер
            res.json({
                status: 'При добавление записи произошла ошибка: ' + error
            });
        });
});

router.post('/updateskill', isAdmin, (req, res) => {

    //создаем новую запись блога и передаем в нее поля из формы
    const Model = mongoose.model('skills'),
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

    Model.findOneAndUpdate({}, req.body, options, function (err, data) {
        if (err) throw err;
        data.skills = req.body;

        data.save().then(
            //обрабатываем и отправляем ответ в браузер
            (i) => {
                return res.json({status: 'Запись успешно обновлена'});
            }, e => {
                //если есть ошибки, то получаем их список и так же передаем в шаблон
                const error = Object
                    .keys(e.errors)
                    .map(key => e.errors[key].message)
                    .join(', ');

                //обрабатываем шаблон и отправляем его в браузер
                res.json({
                    status: 'При добавление записи произошла ошибка: ' + error
                });
            });
    });
});

module.exports = router;