
async function request(url, method, data){
    return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
            resolve(this.responseText);
        }
    };
    xmlhttp.open(method, url, true);
    if(data){
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(data);
    } else {
        xmlhttp.send();
    }
    });
}

async function showFeitjes(){
    await request('/dashboard/feitjes', 'GET').then((feitjes) => {
        let feitjesData = JSON.parse(feitjes);
        let feitjesList = document.getElementById("feitjesList");
        feitjesList.innerHTML = ""; 
        let i = 1;
        feitjesData.forEach(feitje => {
            let feitjeItem = document.createElement("li");
            let div = document.createElement("div");
            let feitjeText = document.createElement("input");
            let delButton = document.createElement("button");
            let updateButton = document.createElement("button");
            feitjeText.innerHTML = `${i++} - ${feitje.feit}`
            feitjeText.value = feitje.feit;
            feitjeText.setAttribute("class", "feitjeText");
            feitjeText.setAttribute("id", "feitje" + feitje.feit_ID);
            delButton.innerHTML = "Verwijder";
            delButton.setAttribute("id", feitje.feit_ID);
            delButton.addEventListener("click", deleteFeitje);
            updateButton.innerHTML = "Update";
            updateButton.setAttribute("id", feitje.feit_ID);
            updateButton.addEventListener("click", updateFeitje);
            feitjeItem.appendChild(feitjeText);
            div.appendChild(feitjeItem);
            div.appendChild(delButton);
            div.appendChild(updateButton);
            feitjesList.appendChild(div);
    });
    }).catch((error) => {
        console.log(error);
    });
}  showFeitjes();

const feitjeToevoegen = document.getElementById("addFeitje");

feitjeToevoegen.addEventListener("click", (e) => {
    let feitje = document.getElementById("feitje").value;
    let feitjeData = {
        feit: feitje
    };
    feitjes(e, "add", feitjeData);
})

function deleteFeitje(e){
    e.preventDefault();
    let id = this.getAttribute("id");
    let feitjeData = {
        id: id
    };
    feitjes(e, "delete", feitjeData);
}
function updateFeitje(e){
    e.preventDefault();
    let id = this.getAttribute("id");
    let feitje = document.getElementById("feitje" + id).value;
    let feitjeData = {
        feit: feitje,
        id: id
    };  
    feitjes(e, "update", feitjeData);
}

function feitjes(e, action, sendData){
    e.preventDefault();
    switch(action){
        case "delete":
            request('/dashboard/feitjes', 'DELETE', JSON.stringify(sendData)).then(() => {
                showFeitjes();
            });
            break;
        case "update":
            request('/dashboard/feitjes', 'PUT', JSON.stringify(sendData)).then(() => {
                showFeitjes();
            });
            break;
        case "add":
            request('/dashboard/feitjes', 'POST', JSON.stringify(sendData)).then(() => {
                showFeitjes();
            });
            break;
    }
}

document.getElementById("addVraag").addEventListener("click", addVraag);

function addVraag (e){
    e.preventDefault();
    let vraag = document.getElementById("vraag").value;
    let antwoord1 = document.getElementById("antwoord1").value;
    let antwoord2 = document.getElementById("antwoord2").value;
    let antwoord3 = document.getElementById("antwoord3").value;
    let goedAntwoord = document.getElementById("goedAntwoord").value;
    let vraagData = {
        vraag: vraag,
        antwoord1: antwoord1,
        antwoord2: antwoord2,
        antwoord3: antwoord3,
        goedAntwoord: goedAntwoord
    };
    request('/api/quiz', 'POST', JSON.stringify(vraagData)).then(() => {
        showQuiz();
    });
}

function deleteVraag(e){
    e.preventDefault();
    let id = this.getAttribute("id");
    let vraagData = {
        id: id
    };
    request('/api/quiz', 'DELETE', JSON.stringify(vraagData)).then(() => {
        showQuiz();
    });
}

async function showQuiz(){
    document.getElementById("quizContainer").innerHTML = "";

    let quiz = await request('/api/quiz', 'GET');
    let quizData = JSON.parse(quiz);
    
    let list = document.createElement("ul");
    quizData.forEach(vraag => {
        let vraagItem = document.createElement("li");
        vraagItem.innerHTML = vraag.quizVraag;
        let antwoord1 = document.createElement("li");
        antwoord1.innerHTML = vraag.antwoorden[0];
        let antwoord2 = document.createElement("li");
        antwoord2.innerHTML = vraag.antwoorden[1];
        let antwoord3 = document.createElement("li");
        antwoord3.innerHTML = vraag.antwoorden[2];
        let goedAntwoord = document.createElement("li");
        goedAntwoord.innerHTML = vraag.juisteAntwoord;
        let delButton = document.createElement("button");
        delButton.innerHTML = "Verwijder";
        delButton.setAttribute("id", vraag.vraagID);
        delButton.addEventListener("click", deleteVraag);
        list.appendChild(vraagItem);
        list.appendChild(antwoord1);
        list.appendChild(antwoord2);
        list.appendChild(antwoord3);
        list.appendChild(goedAntwoord);
        list.appendChild(delButton);

        document.getElementById("quizContainer").innerHTML = "";
        document.getElementById("quizContainer").appendChild(list);

    });
} showQuiz();

async function urls(){
    let url = await request('/dashboard/urls', 'GET');
    let urlData = JSON.parse(url);
    console.log(urlData);
let list = document.getElementById("404List");
    urlData.forEach(url => {
        let urlItem = document.createElement("li");
        urlItem.innerHTML = `${url.url} - ${url.count}`;
        list.appendChild(urlItem);
    });
    document.getElementById("urlContainer").innerHTML = "";
    document.getElementById("urlContainer").appendChild(list);
} urls();

function getQuizStats(e){
    e.preventDefault();
    let quizSelect = document.getElementById("quizSelect");

    // de value van de geselecteerde optie
    let quizID = quizSelect.options[quizSelect.selectedIndex].value;
    // de stats van de geselecteerde quiz
    fetch(`/dashboard/stats/quizStats?${quizID}`, {
    }).then((response) => {
        response.json().then((data) => {
            // de div selecteren waar de stats in moeten komen en leegmaken
            const barChart = document.getElementById("barChart");
            barChart.innerHTML = "";
            let totaalCount = data.count;

            // voor elke vraag een balk aanmaken
            data.vragen.forEach((item) => {
                let bar = document.createElement("div");
                bar.classList.add("bar");
                bar.style.height = `50px`;
                // de breedte van de balk is het aantal keer dat de vraag is beantwoord in %
                bar.style.width = `${(item.count / totaalCount) * 100}%`;
                bar.innerHTML = `Ant ${item.antwoord} || ${item.count}`;
                barChart.appendChild(bar);
            });
           
        });
    });
}

// vraagt alle vragen uit de quiz op
function getQuizVragen(){
    // omdat de eerste response een promise is, zijn er twee .then() nodig
   fetch('/dashboard/stats/quizVragen').then((response) => {
    // de response wordt omgezet naar een json object
    response.json().then((data) => {
        data.forEach(vraag => {
            // de vragen worden toegevoegd aan de select
            // de id van de vraag wordt meegegeven als value zodat deze later gebruikt kan worden
            let select = document.getElementById("quizSelect");
            let option = document.createElement("option");
            option.innerHTML = vraag.quizVraag;
            option.setAttribute("value", vraag.vraagID);
            select.appendChild(option);
            select.addEventListener("change", getQuizStats);
        });
    });
   });
} getQuizVragen();