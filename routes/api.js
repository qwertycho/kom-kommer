const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { json } = require('express/lib/response.js');

// eigen troep
const login = require('../server/login.js');
const data = require('../public/data/data.json');
const database = require('../server/database.ts');


router.get('/quiz', (req, res) => {
    console.log("request for post QUIZ");
        try{
            const query = {
                table: "quiz",
                rows: ["*"],
                where: ""
            };
            async function getQuiz(){
                const data = await database.select(query);
                console.log(data);
                let quiz = [];
                for (let i = 0; i < data.length; i++) {
                    let quizStuk = {
                        vraagID: data[i].vraagID,
                        quizVraag: data[i].quizVraag,
                        antwoord: [data[i].antwoord1, data[i].antwoord2, data[i].antwoord3],
                    }
                    quiz.push(quizStuk);
                }
                res.send(quiz);
            }
            getQuiz();
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
})

router.post('/quiz', (req, res) => {
    console.log("request for post QUIZ");
    if(login.admin(req.cookies.auth)){
        try{
            let waardes = [];
            waardes.push(req.body.vraag);
            waardes.push(req.body.antwoord1);
            waardes.push(req.body.antwoord2);
            waardes.push(req.body.antwoord3);
            waardes.push(req.body.goedAntwoord);
            const query = {
                table: "quiz",
                rows: ["quizVraag", "antwoord1", "antwoord2", "antwoord3", "goedAntwoord"],
                values: waardes,
                vraagtekens: "?, ?, ?, ?, ?"
            };
            database.insert(query).then((result) => {
                res.send(result);
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

router.delete('/quiz', (req, res) => {
    console.log("request for delete QUIZ");
    if(login.admin(req.cookies.auth)){
        try{
            const query = {
                table: "quiz",
                value: req.body.id,
                where: "vraagID"
            };
            database.delete(query).then((result) => {
                res.send(result);
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    } else {
        console.log("post request feitjes: verkeerde auth");
        res.status(401).send();
    }
})



module.exports = router;