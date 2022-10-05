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
        async function getQuiz(){
            const query = {
                table: "quiz",
                rows: ["*"],
                where: ""
            };
            const data = await database.select(query);
            console.log(data);
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

router.post('/checkQuiz', (req, res) => {
    console.log("request voor controle quiz");
    try{
        let data = req.body.antwoorden;
        let score = 0;
        let goedAntwoorden = [];
            data.forEach(element => {
                async function checkQuiz(){
                const query = {
                    table: "quiz",
                    rows: ["goedAntwoord"],
                    where: "vraagID",
                    waardes: element.ID
                };
                const DBdata = await database.select(query)
                scoreTellen();
                console.log("scroetelelel");
                goedAntwoorden.push(DBdata[0].goedAntwoord);
            }
                checkQuiz();


            });
            let aantalVragen = Object.keys(data).length
            function scoreTellen(){
                score = 0;
                console.log(goedAntwoorden.length);
                goedAntwoorden.forEach(element => {
                    if(element == data.antwoord){
                        score++;
                    }
                    console.log("xxxxxxxxxxxxxxxxxxxxxx");
                    console.log(goedAntwoorden.length)
                    console.log(aantalVragen);
                console.log("xxxxxxxxxxxxxxxxxxxxxx");
                    if(goedAntwoorden.length == aantalVragen){
                        let zin;

                        if(score == aantalVragen){
                            zin = "Jij bent echt een komkommer expert! Je hebt alle vragen goed beantwoord!";
                        } else if(score > aantalVragen/2){

                            zin = "Jij bent een komkommer kenner!";
                        } else {
                            zin = "Jij bent een komkommer noob! Leer wat meer over komkommers!  ";
                            }

                        res.send(`Je hebt ${score} van de ${aantalVragen} vragen goed! <br> ${zin}`);
                    }
                });
            }


    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})



module.exports = router;