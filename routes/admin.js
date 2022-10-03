const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { json } = require('express/lib/response.js');

// eigen troep
const login = require('../server/login.js');
const cookie = require('../server/disclaimer.js');
const data = require('../public/data/data.json');
const navigatie = require('../server/nav.js');
const nav = navigatie.navBuilder(data);
const database = require('../server/database.ts');

router.post('/login', (req, res) => {
    console.log(req.body);
    if(login.admin(req.body.auth, req.body.username, req.body.password)){
        res.cookie('auth', process.env.auth, { maxAge: 900000, httpOnly: true });
        res.redirect('/dashboard');
    } else {
        console.log("login: verkeerde gegevens");
        // loggen naar database
    }
});

router.get('/feitjes', (req, res) => {
    console.log("request for feitjes");
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
    if(login.admin(req.cookies.auth)){
        try{
            database.addFeitje(req.body.feit).then(() => {
                res.send(JSON.stringify(req.body.feit));
            });
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    } else {
        console.log("post request feitjes: verkeerde auth");
        res.status(401).send();
    }
})
router.delete('/feitjes', (req, res) => {
    console.log("delete request");
    if(login.admin(req.cookies.auth)){
        console.log("request for  put in feitjes");
        try{
            database.deleteFeitje(req.body.id).then(() => {
                res.send(JSON.stringify(req.body.id));
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    } else {
        console.log("delete request feitjes: verkeerde auth");
        res.status(401).send();
    }
})

router.put('/feitjes', (req, res) => {
    console.log("request for  put in feitjes");
        if(login.admin(req.cookies.auth)){
        try{
            database.updateFeitje(req.body.id, req.body.feit).then(() => {
                res.send(JSON.stringify(req.body.id));
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    } else {
        console.log("put request feitjes: verkeerde auth");
        res.status(401).send();
    }
});

router.get('/', (req, res) => {
    console.log(req.cookies);
    if(login.admin(req.cookies.auth)){
        res.render('../views/dashboard', {footer:  data.footer.text, nav: nav, disclaimer: cookie.checkCookies(req.cookies)});
    } else {
        console.log("dashboard: verkeerde auth");
        res.render('../views/login', {footer:  data.footer.text, nav: nav, disclaimer: cookie.checkCookies(req.cookies)});
    }
});

module.exports = router;