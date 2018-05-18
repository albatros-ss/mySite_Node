const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    let obj = {
        title: 'Блог'
    };
    Object.assign(obj, req.app.locals.settings);
    const Model = mongoose.model('blog');
    //получаем список записей в блоге из базы
    Model
        .find()
        .then(items => {
            // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
            // записей в блоге
            let arr = [];
            for (let index in items) {
                arr.push(items[index])
            }
            ;
            const x = req.app.locals.posts.concat(arr);

            Object.assign(obj, {posts: x});

            res.render('pages/blog', obj);
        });
});

module.exports = router;