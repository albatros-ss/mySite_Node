const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    let obj = {
        title: 'Обо мне'
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/about', obj);
});

router.get('/', function (req, res) {
    const Model = mongoose.model('skills');

    Model.find().then(items => {
        let arr = [];
        for (let index in items) {
            arr.push(items[index])
        }
        const x = req.app.locals.posts.concat(arr);

        Object.assign(obj, {posts: x});

        res.render('pages/about', obj)
    })
})

module.exports = router;