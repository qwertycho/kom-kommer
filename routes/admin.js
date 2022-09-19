const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const cookie = require('../server/disclaimer.js');
const data = require('../public/data/data.json');
const navigatie = require('../server/nav.js');
const nav = navigatie.navBuilder(data);

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(username == process.env.admin && password == process.env.password){
        res.cookie('auth', process.env.auth, { maxAge: 900000, httpOnly: true });
        res.redirect('/dashboard');
    } else {
        console.log("wrong credentials");
        // loggen naar database
    }
});

router.get('/', (req, res) => {
    console.log(req.cookies);
    if(req.cookies.auth == process.env.auth){
        console.log("logged in");
        res.render('../views/dashboard', {footer:  data.footer.text, nav: nav, disclaimer: cookie.checkCookies(req.cookies)});
    } else {
        console.log("not logged in");
        res.render('../views/login', {footer:  data.footer.text, nav: nav, disclaimer: cookie.checkCookies(req.cookies)});
    }
});

module.exports = router;