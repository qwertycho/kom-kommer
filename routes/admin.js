const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())

// eigen troep
const login = require('../server/login.js');
const cookie = require('../server/disclaimer.js');
const database = require('../server/database.js');
const cache = require('../server/cache.js');

router.post('/login', (req, res) => {
    if(login.admin(req.body.auth, req.body.username, req.body.password)){
        res.cookie('auth', process.env.auth, { maxAge: 900000, httpOnly: true });
        res.redirect('/dashboard');
    } else {
        console.log("login: verkeerde gegevens");
        // loggen naar database
    }
});

router.all('*', (req, res, next) => {
    if(login.admin(req.cookies.auth)){
        console.log("admin");
        next();
    } else {
        console.log("geen admin");
        res.status(401).render("../views/login.ejs");
    }
});

router.post('/feitjes', (req, res) => {
        try{
            database.addFeitje(req.body.feit).then(() => {
                res.send(JSON.stringify(req.body.feit));
            });
            cache.clearAll();
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
})

router.delete('/feitjes', (req, res) => {
        console.log("request for  put in feitjes");
        try{
            database.deleteFeitje(req.body.id).then(() => {
                res.send(JSON.stringify(req.body.id));
            });
            cache.clearAll();
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
})

router.put('/feitjes', (req, res) => {
    try{
        database.updateFeitje(req.body.id, req.body.feit).then(() => {
            res.send(JSON.stringify(req.body.id));
        });
        cache.clearAll();
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// route voor het opvragen van de statistieken over de 404 errors
router.get('/urls', (req, res) => {
    try{
        // de DB returnt een array met daarin de de objecten met url en count
        // helaas is de count een bigint en die kan niet naar JSON
        // dus eerst omzetten naar een normale int
        database.getURL().then((result) => {
            let arr = [];
            result.forEach(element => {
                let obj = {
                    url: element.url,
                    count: Number(element.count),
                }
                arr.push(obj);
            });
            res.send(arr);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

router.get("/stats/:id" , (req, res) => {
    try{
        const aanvraag = req.params.id;
        let query = {}
        switch(aanvraag){
            case "url":
        // de DB returnt een array met daarin de de objecten met url en count
        // helaas is de count een bigint en die kan niet naar JSON
        // dus eerst omzetten naar een normale int
            database.getURL().then((result) => {
                let arr = [];
                result.forEach(element => {
                    let obj = {
                        url: element.url,
                        count: Number(element.count),
                    }
                    arr.push(obj);
                });
                res.send(arr);
            });
        break;
        case "quizVragen":
            query = {
                table: "quiz",
                rows: ["vraagID, quizVraag"],
            }
            database.select(query).then((result) => {
                res.send(result);
            });
        break;
        case "quizStats":
            let vraagID = req.url.split("?")[1];
            query = {
                table: "quizResultaten",
                rows: ["antwoord"],
                where: "vraagID = " + vraagID,
            }
            database.quizStats(query).then((result) => {
                console.log(result);
                result.vragen.forEach(element => {
                    element.count = Number(element.count);
                });
                result.count = Number(result.count);
                res.send(result);
            });
        break;
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

router.get('/', (req, res) => {
        res.render('../views/dashboard', {disclaimer: cookie.checkCookies(req.cookies)});
});

module.exports = router;