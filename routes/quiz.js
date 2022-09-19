const express = require('express');
const router = express.Router();
const cookie = require('../server/disclaimer.js');
const data = require('../public/data/data.json');
const navigatie = require('../server/nav.js');
const nav = navigatie.navBuilder(data);
const quiz = require('../server/quiz.js');

// quiz antwoorden
router.post('/', (req, res) => {
    res.send(JSON.stringify(quiz.quizCheck(req.body)));
} );

router.get('/', (req, res) => {
    res.render('../views/quiz', {footer:  data.footer.text, nav: nav, disclaimer: cookie.checkCookies(req.cookies)});
});

module.exports = router;