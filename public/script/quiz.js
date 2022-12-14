const main = document.querySelector('main');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const vraag = document.querySelector('.vraag');
const progress = document.querySelector('.progress-bar');

let quiz = [];

let xhr = new XMLHttpRequest();
xhr.open('GET', '/api/quiz', true);
xhr.onload = function () {
    if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        quiz = data;
        setAntwoorden();

    } else {
        console.log("error");
        console.log(this.responseText);
    }
}
xhr.send();


let vraagNummer = 0;
let antwoorden = [];


// de vorige vraag laden en antwoord verwijderen
prev.addEventListener('click', () => {
    if (vraagNummer > 0) {
        antwoorden.pop();
        vraagNummer--;
        setAntwoorden();
        next.innerHTML = 'volgende';

    } else {
        antwoorden = [];
    }
} );

// de volgende vraag laden en antwoord opslaan
next.addEventListener('click', () => {
    if (vraagNummer < quiz.length - 1) {
        getAntwoorden();
        vraagNummer++;
        setAntwoorden();
    } else {
        getAntwoorden();
        sendQuiz();
    }
} );

// de vragen en antwoorden tonen
function setAntwoorden(){
    vraag.innerHTML = quiz[vraagNummer].quizVraag;
    for (let i = 0; i < document.querySelectorAll('.antwoord').length; i++) {
        document.querySelectorAll('.ans')[i].innerHTML = quiz[vraagNummer].antwoorden[i];
        progress.style.width = `${(vraagNummer + 1) / quiz.length * 100}%`;
    }
    if (vraagNummer == quiz.length -1) {
        next.innerHTML = 'Klaar';
    }
}

function sendQuiz () {
    try{        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/checkQuiz', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            let score = this.responseText;
            showscore(score);
        }
        let data = {
            antwoorden: antwoorden
        }
        xhr.send(JSON.stringify(data));

    } catch(err){
            console.log(err);
            alert("Er is iets fout gegaan, probeer het later opnieuw");
        }
}

// de antwoorden uitlezen
function getAntwoorden() {
   for (let i = 0; i < document.querySelectorAll('.antwoord').length; i++) {
       if (document.querySelectorAll('.antwoord')[i].checked) {
        let vraagID = quiz[vraagNummer].vraagID;
        let antwoord = {
            ID: vraagID,
            antwoord: document.querySelectorAll('.antwoord')[i].value
        }
           antwoorden[vraagNummer] = antwoord;
           break;
       }
    }       
}

function showscore(score){
    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
        scoreDiv.innerHTML = score;
   
    main.innerHTML = "";
    main.appendChild(scoreDiv);
}