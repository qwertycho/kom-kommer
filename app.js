const port = 3000;
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const { json } = require('body-parser');
// copilot magie
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/quiz', (req, res) => {
    const footerText = require('./public/data/data.json');
    res.render(__dirname + '/views/quiz', {footer:  footerText.footer.text});
});

// quiz antwoorden
app.post('/quizans', (req, res) => {
    console.log(req.body);
    const goed = ["3", "3", "1", "1", "2"];
    let antwoorden = req.body;
    let score = 0;
    for (let i = 0; i < antwoorden.length; i++) {
        if (antwoorden[i] == goed[i]) {
            score++;
        }
    }
    console.log(score);
    // res.send(score)

    res.send(JSON.stringify(score));
} );

// homepage
app.get('/', (req, res) => {
    const footerText = require('./public/data/data.json');
    res.render(__dirname + '/views/index', {footer:  footerText.footer.text});
});

// 404 handler
app.use(function (req,res,next){
	res.status(404).send('Verkeerde pagina jij bergkip');
});

// server luisterd naar de port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
