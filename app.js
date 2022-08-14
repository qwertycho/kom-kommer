const port = 3000;
const express = require('express');
const app = express();

app.use(express.static('public'));


app.get('/quiz', (req, res) => {
    res.sendFile(__dirname + '/views/quiz.html');
});



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// 404 handler
app.use(function (req,res,next){
	res.status(404).send('Verkeerde pagina jij bergkip');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
