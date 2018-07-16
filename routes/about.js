const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    let obj = {
        title: 'Обо мне'
    };
    Object.assign(obj, req.app.locals.settings);

    const Model = mongoose.model('skills');
    //получаем список записей в блоге из базы
    Model
        .find()
        .then(items => {
            // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
            // записей в блоге
            const objNew = items[0].skills[0];
            const objOld = req.app.locals.skills;
            for (key in objOld) {
                for (x in objOld[key]) {
                    objOld[key][x] = objNew[x];
                }
            }
            Object.assign(obj, objOld);
            res.render('pages/about', obj);

        });
});

module.exports = router;