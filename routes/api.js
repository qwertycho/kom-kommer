const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())

// eigen troep
const login = require('../server/login.js');
const database = require('../server/database.js');
const DBescape = require("../server/DBescape");
const api = require('../server/apiClass.js');
const cache = require('../server/cache.js');

router.get('/quiz', (req, res) => {
    try{
        async function getQuiz(){
            const query = {
                table: "quiz",
                rows: ["*"],
                where: ""
            };
            const data = await database.select(query);
            let quiz = [];

            if(!login.admin(req.cookies.auth)){
                for (let i = 0; i < data.length; i++) {
                    let quizStuk = {
                        vraagID: data[i].vraagID,
                        quizVraag: data[i].quizVraag,
                        antwoorden: [data[i].antwoord1, data[i].antwoord2, data[i].antwoord3],
                        juisteAntwoord: data[i].juisteAntwoord
                    }
                    quiz.push(quizStuk);
                }
            } else {
                 for (let i = 0; i < data.length; i++) {
                    let quizStuk = {
                        vraagID: data[i].vraagID,
                        quizVraag: data[i].quizVraag,
                        antwoorden: [data[i].antwoord1, data[i].antwoord2, data[i].antwoord3],
                        juisteAntwoord: data[i].goedAntwoord
                    }
                    quiz.push(quizStuk);
                }
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
    if(login.admin(req.cookies.auth)){
        try{
            
            let waardes = [req.body.vraag, req.body.antwoord1, req.body.antwoord2, req.body.antwoord3, req.body.goedAntwoord];

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

router.post('/checkQuiz', (req, res) => {
    try{
    let userAnswers = req.body.antwoorden;
        let score = 0;
        let goedAntwoorden = [];

        function saveData(){
            userAnswers.forEach((answer) => {
                let query = {
                    table: "quizResultaten",
                    rows: ["vraagID", "antwoord"],
                    values: [answer.ID, answer.antwoord]
                }
                database.insert(query);
            });
        }

      async function getGoedAntwoorden(){
        saveData();
        userAnswers.forEach(element => {
            let query = {
                table: "quiz",
                rows: "goedAntwoord",
                where: "vraagID",
                waardes: element.ID
            };
            database.select(query).then((result) => {
                goedAntwoorden.push(result[0].goedAntwoord);
                if(element.antwoord == result[0].goedAntwoord){
                    score++;
                }
                if(goedAntwoorden.length == userAnswers.length){
                   showScore();
                }
            });
        });
    }

    function showScore(){
        if(score == goedAntwoorden.length){
            uitslag = `Jij hebt ${score} van de ${goedAntwoorden.length} vragen goed beantwoord! <br> Jij bent echt een komkommer expert!`;
        } else if(score == goedAntwoorden.length/2){
            uitslag = `Jij hebt ${score} van de ${goedAntwoorden.length} vragen goed beantwoord! <br> Jij bent een beetje een komkommer kenner!`;
        } else {
            uitslag = `Jij hebt ${score} van de ${goedAntwoorden.length} vragen goed beantwoord! <br> Jij bent een komkommer noob!`;
        }

        res.send(uitslag);
    }
    getGoedAntwoorden();

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.get('/feitjes', async (req, res) => {
    try{
        res.send(await cache.getFeitjes());
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.get('/public/feitjes', async (req, res) => {
    try{
        let feitjes = await api.getMethod(req)
        res.send(feitjes);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports = router;