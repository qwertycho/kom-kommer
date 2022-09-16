const port = 3300;
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const { json } = require('body-parser');
const fs = require('fs');    
// copilot magie
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// eigen functies
const navigatie = require('./server/nav.js');

// navigatie en footer data
const data = require('./public/data/data.json');
const nav = navigatie.navBuilder(data);
console.log(nav);

app.use(express.static(__dirname +'/public'));

app.set('view engine', 'ejs');

app.get('/data', function(req, res) {
    const data = require('./public/data/data.json');
    res.send(data);
});

app.get('/quiz', (req, res) => {
    res.render(__dirname + '/views/quiz', {footer:  data.footer.text, nav: nav});
});

// dynamic route
app.get('/:id', (req, res) => {
    // check if filename exists
    if(req.params.id == "" || req.params.id == null || req.params.id == undefined || req.params.id == "/"){ 
        res.render(__dirname + '/views/index', {footer:  data.footer.text, nav: nav});
    } 
    fs.stat(__dirname + '/views/' + req.params.id + ".ejs", function(err, stat) {
        console.log(req.params.id);
       if (err == null) {
            res.render(__dirname + '/views/' + req.params.id, {footer:  data.footer.text, nav: nav});
        } else {
            console.log(err);
            res.status(404).sendFile(__dirname + '/views/404.html');
        }
    });
});

// quiz antwoorden
app.post('/quizans', (req, res) => {
    const goed = ["3", "3", "1", "1", "2"];
    let antwoorden = req.body;
    let score = 0;
    for (let i = 0; i < antwoorden.length; i++) {
        if (antwoorden[i] == goed[i]) {
            score++;
        }
    }
    res.send(JSON.stringify(score));
} );

// homepage
app.get('/', (req, res) => {
    res.render(__dirname + '/views/index', {footer:  data.footer.text, nav: nav});
});

// 404 handler
app.use(function (req,res,next){
	res.status(404).send('Verkeerde pagina jij bergkip');
});

// server luisterd naar de port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
