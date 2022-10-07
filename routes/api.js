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
const DBescape = require("../server/DBescape");


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
        console.log("showscore");
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

router.get('/public/feitjes', (req, res) => {
    try{
        let url = req.url;
        let params = url.split("?");
        if (params[1].includes("action")){
            console.log("request for get FEITJES");
            let action = params[1].split("=");
            console.log(action[1]);
            switch(action[1]){
                case "nieuw":
                    let nieuwQuery = {
                        table: "feitjes",
                        rows: "feit",
                        order: "feit_id DESC",
                        limit: 1
                    };
                    database.select(nieuwQuery).then((result) => {
                        res.send(escape(result));
                    })
                    break;
                case "random":
                    let randQuery = {
                        table: "feitjes",
                        rows: "feit",
                        order: "RAND()",
                        limit: 1
                    };
                    database.select(randQuery).then((result) => {
                        res.send(escape(result));
                    })
                    break;
                    case "all":
                    let allQuery = {
                        table: "feitjes",
                        rows: "feit",
                    };
                    database.select(allQuery).then((result) => {
                        res.send(escape(result));
                    })
                    break;
                }

        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }

    function escape(array){
        array.forEach(element => {
            element.feit = DBescape.SQLunescape(element.feit);
        });
        return array;
    }
})



module.exports = router;