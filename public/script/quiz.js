const main = document.querySelector('main');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const vraag = document.querySelector('.vraag');

const quiz = [
    vraag1 = {
        vraag: "Welke kleur heeft een komkommer?",
        antwoorden: ["geel", "bruin", "groen"],
    },
    vraag2 = {
        vraag: "Hoe groeit een komkommer?",
        antwoorden: ["aan een boom", "in de grond", "aan een plant"],
    },
    vraag3 = {
        vraag: "Wat is de ideale groei temperatuur van een komkommer?",
        antwoorden: ["??", "??", "??"],
    },
    vraag4 = {
        vraag: "Wat kan je met komkommers maken?",
        antwoorden: ["augurken", "ijs", "stampot"],
    },
    vraag5 = {
        vraag: "Hoe bewaar je het beste een komkommer?",
        antwoorden: ["in de zon", "in de koelkast", "in de vriezer"],
    }
];

let vraagNummer = 0;
let antwoorden = [];


setAntwoorden();

// de vorige vraag laden en antwoord verwijderen
prev.addEventListener('click', () => {
    if (vraagNummer > 0) {
        antwoorden.pop();
        vraagNummer--;
        setAntwoorden();
        console.log(vraagNummer);
        console.log(antwoorden);
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
    vraag.innerHTML = quiz[vraagNummer].vraag;
    for (let i = 0; i < document.querySelectorAll('.antwoord').length; i++) {
        document.querySelectorAll('.ans')[i].innerHTML = quiz[vraagNummer].antwoorden[i];
    }
    if (vraagNummer == quiz.length -1) {
        next.innerHTML = 'Klaaar';
    }
}

function sendQuiz () {
    try{
        console.log("hier");
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/quizans', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            console.log(this.responseText);
            let score = this.responseText;
            showscore(score);
        }
        xhr.send(JSON.stringify(antwoorden));
        console.log("data send");

        next.style.backgroundColor = "green";
        next.innerHTML = "Bericht verzonden";
        } catch(err){
            console.log(err);
            alert("Er is iets fout gegaan, probeer het later opnieuw");
            next.style.backgroundColor = "red";
        }
}

// de antwoorden uitlezen
function getAntwoorden() {
   for (let i = 0; i < document.querySelectorAll('.antwoord').length; i++) {
       if (document.querySelectorAll('.antwoord')[i].checked) {
           antwoorden[vraagNummer] = document.querySelectorAll('.antwoord')[i].value;
           console.log(vraagNummer + " " + antwoorden[vraagNummer]);
           break;
       }
    }       
}

function showscore(score){
    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
    scoreDiv.innerHTML = `Je score is ${score}/5`;
    main.innerHTML = "";
    main.appendChild(scoreDiv);
}
