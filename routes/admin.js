const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    let obj = {
        title: 'Админ панель'
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/admin', obj);
});

module.exports = router;