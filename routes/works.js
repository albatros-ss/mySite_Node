const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    let obj = {
        title: 'Портфолио веб розработчика'
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/works', obj);
});

module.exports = router;