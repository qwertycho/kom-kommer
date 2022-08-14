const main = document.querySelector('main');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const vraag = document.querySelector('.vraag');

const quiz = {
   vraag1: {
         vraag: 'Wat is de hoofdstad van Nederland?',
            antwoorden: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag'],
            juist: 'Amsterdam'
    },
    vraag2: {
        vraag: 'Wat is de hoofdstad van Frankrijk?',
        antwoorden: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag'],
        juist: 'Paris'
    },
    vraag3: {
        vraag: 'Wat is de hoofdstad van Duitsland?',
        antwoorden: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag'],
        juist: 'Berlijn'
    }

}

let vraagNummer = 0;
let antwoorden = [];

prev.addEventListener('click', () => {
    if (vraagNummer > 0) {
        antwoorden.pop();
        vraagNummer--;
        vraag.innerHTML = quiz[`vraag${vraagNummer}`].vraag;
    }
} );
next.addEventListener('click', () => {
    if (vraagNummer <= Object.keys(quiz).length - 1) {
        getAntwoorden();
        vraagNummer++;
        vraag.innerHTML = quiz[`vraag${vraagNummer}`].vraag;
    }
} );

function setAntwoorden{
    vraag.innerHTML = quiz[`vraag${vraagNummer}`].vraag;
    for (let i = 0; i < quiz[`vraag${vraagNummer}`].antwoorden.length; i++) {
}

function getAntwoorden() {
   for (let i = 0; i < document.querySelectorAll('.antwoord').length; i++) {
       if (document.querySelectorAll('.antwoord')[i].checked) {
           antwoorden.push(document.querySelectorAll('.antwoord')[i].value);
           break;
       }
    }       
}
