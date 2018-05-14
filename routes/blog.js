const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    let obj = {
        title: 'Блог'
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/blog', obj);
});

module.exports = router;