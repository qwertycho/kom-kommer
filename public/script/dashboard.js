
async function request(url, method, data){
    return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.status != 500) {
            let data = JSON.parse(this.responseText);
            resolve(data);
        } else {
            reject(this.status);
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

async function deleteFeitje(e){
    e.preventDefault();
    let id = this.getAttribute("id");
    let feitjeData = {
        id: id
    };
    return new Promise((resolve, reject) => {

        request('/dashboard/feitjes', 'DELETE', JSON.stringify(feitjeData)).then((result) => {
            showFeitjes();
        });
    });
}

async function updateFeitje(e){
    e.preventDefault();
    let id = this.getAttribute("id");
    let feitje = document.getElementById("feitje" + id).value;
    let feitjeData = {
        feit: feitje,
        id: id
    };
    return new Promise((resolve, reject) => {

        request('/dashboard/feitjes', 'PUT', JSON.stringify(feitjeData)).then((result) => {
            showFeitjes();
        });
    });
}

async function showFeitjes(){
    let feitjes = await request('/dashboard/feitjes', 'GET');
    let feitjesList = document.getElementById("feitjesList");
    feitjesList.innerHTML = ""; 
    let i = 1;
    feitjes.forEach(feitje => {
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
}  showFeitjes();

const feitjeToevoegen = document.getElementById("addFeitje");
feitjeToevoegen.addEventListener("click", (e) => {
    e.preventDefault();
    let feitje = document.getElementById("feitje").value;
    let feitjeData = {
        feit: feitje
    };
    request('/dashboard/feitjes', 'POST', JSON.stringify(feitjeData)).then((result) => {
        showFeitjes();
    });
});