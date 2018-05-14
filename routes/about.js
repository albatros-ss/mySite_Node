const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    let obj = {
        title: 'Обо мне'
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/about', obj);
});

module.exports = router;