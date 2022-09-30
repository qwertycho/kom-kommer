const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const cookie = require('../server/disclaimer.js');
const data = require('../public/data/data.json');
const navigatie = require('../server/nav.js');
const nav = navigatie.navBuilder(data);
const database = require('../server/database.ts');
const { json } = require('express/lib/response.js');

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

router.get('/feitjes', (req, res) => {
    console.log("request for feitjes");
    console.log(req.body);
    try{
        database.loadFeitjes().then((result) => {
            res.send(JSON.stringify(result));
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}).post('/feitjes', (req, res) => {
    console.log("request for post feitjes");
    console.log(req.body);
    try{
        database.addFeitje(req.body.feit).then(() => {
            res.send(JSON.stringify(req.body.feit));
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})
router.delete('/feitjes', (req, res) => {
    console.log("delete request");
    console.log("request for  put in feitjes");
    console.log(req.body);
    try{
        database.deleteFeitje(req.body.id).then(() => {
            res.send(JSON.stringify(req.body.id));
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.put('/feitjes', (req, res) => {
    console.log("request for  put in feitjes");
    console.log(req.body);
    try{
        database.updateFeitje(req.body.id, req.body.feit).then(() => {
            res.send(JSON.stringify(req.body.id));
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
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