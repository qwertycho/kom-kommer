
async function request(url, method, data){
    return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        
        console.log(this.readyState);
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

        console.log(feitjes);
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
    feitjes(e, "add", null, feitjeData);
})

function deleteFeitje(e){
    e.preventDefault();
    let id = this.getAttribute("id");
    let feitjeData = {
        id: id
    };
    feitjes(e, "delete", null, feitjeData);
}
function updateFeitje(e){
    e.preventDefault();
    let id = this.getAttribute("id");
    let feitje = document.getElementById("feitje" + id).value;
    let feitjeData = {
        feit: feitje,
        id: id
    };  
    feitjes(e, "update", null, feitjeData);
}

function feitjes(e, action, id, data){
    e.preventDefault();
    switch(action){
        case "delete":
            request('/dashboard/feitjes', 'DELETE', JSON.stringify(data)).then((result) => {
                showFeitjes();
            });
            break;
        case "update":
            request('/dashboard/feitjes', 'PUT', JSON.stringify(data)).then((result) => {
                showFeitjes();
            });
            break;
        case "add":
            request('/dashboard/feitjes', 'POST', JSON.stringify(data)).then((result) => {
                showFeitjes();
            });
            break;
    }
}