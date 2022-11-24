const express = require('express');
const router = express.Router();
const cookie = require('../server/disclaimer.js');

router.get('/', (req, res) => {
        res.render('../views/quiz', {disclaimer: cookie.checkCookies(req.cookies)});
});

module.exports = router;