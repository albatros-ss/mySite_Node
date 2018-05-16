const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

router.get('/', function (req, res) {
    let obj = {
        title: 'Админ панель'
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/admin', obj);
});
router.post('/upload', function (req, res) {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), config.upload);
    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.json({status: 'Не удалось загрузить картинку'});
        }
        if (!fields.name) {
            fs.unlink(files.photo.path);
            return res.json({status: 'Не указано описание картинки!'});
        }
        fs.rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
            if (err) {
                fs.unlink(path.join(config.upload, files.photo.name));
                fs.rename(files.photo.path, files.photo.name);
            }
            res.json({status: 'Картинка успешно загружена'});
        });
    });
});
module.exports = router;