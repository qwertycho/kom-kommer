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
        console.log(antwoorden);
    }
} );

// de vragen en antwoorden tonen
function setAntwoorden(){
    vraag.innerHTML = quiz[vraagNummer].vraag;
    for (let i = 0; i < document.querySelectorAll('.antwoord').length; i++) {
        document.querySelectorAll('.ans')[i].innerHTML = quiz[vraagNummer].antwoorden[i];
    }
    if (vraagNummer == quiz.length - 1) {
        next.innerHTML = 'Klaar';
        next.addEventListener('click', () => {
        //   make post request
            try{
                (async () => {
                    const rawResponse = await fetch('/quizans', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(antwoorden)
                    });
                    const content = await rawResponse.json();
                
                    console.log(content);
                })();
                next.style.backgroundColor = "green";
                next.innerHTML = "Bericht verzonden";
                } catch(err){
                    console.log(err);
                    alert("Er is iets fout gegaan, probeer het later opnieuw");
                    next.style.backgroundColor = "red";
                }
        });
    }
}

// de antwoorden uitlezen
function getAntwoorden() {
   for (let i = 0; i < document.querySelectorAll('.antwoord').length; i++) {
       if (document.querySelectorAll('.antwoord')[i].checked) {
           antwoorden[vraagNummer] = document.querySelectorAll('.antwoord')[i].value;
           break;
       }
    }       
}
