const port = 3300;
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');
require('dotenv').config()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// eigen functies
const cookie = require('./server/disclaimer.js');
const database = require('./server/database.js');

app.use(express.static(__dirname +'/public'));

app.set('view engine', 'ejs');

app.get('/data', function(req, res) {
    const data = require('./public/data/data.json');
    res.send(data);
});

const quizRouter = require('./routes/quiz.js');
app.use('/quiz', quizRouter);

const adminRouter = require('./routes/admin.js');
app.use('/dashboard', adminRouter);

const apiRouter = require('./routes/api.js');
const { query } = require('express');
app.use('/api', apiRouter);

// dynamic route
// deze bullshit opruimen
app.get('/:id', (req, res) => {
    // check if filename exists
    if(req.params.id == "" || req.params.id == null || req.params.id == undefined || req.params.id == "/"){ 
        res.render(__dirname + '/views/index', {disclaimer: cookie.checkCookies(req.cookies)});;
    } 
    fs.stat(__dirname + '/views/' + req.params.id + ".ejs", function(err, stat) {
       if (err == null) {
            res.render(__dirname + '/views/' + req.params.id, {disclaimer: cookie.checkCookies(req.cookies)});
        } else {
            console.log(err);
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            let query = {
                table: "badPages",
                rows: ["url", "ip"],
                values: [req.url, ip]
            }
            database.insert(query);
            res.status(404).sendFile(__dirname + '/views/404.html');
        }
    });
});

// homepage
app.get('/', (req, res) => {
    res.render(__dirname + '/views/index', {disclaimer: cookie.checkCookies(req.cookies)});
});

// 404 handler
app.use(function (req,res){
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress[0];
    database.badPages(url, ip);
	res.status(404).send('Verkeerde pagina jij bergkip');
});

// server luisterd naar de port
app.listen(port, () => {
    console.log(`Server is running op http://localhost:${port}`);
});
