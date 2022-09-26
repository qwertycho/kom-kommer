
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

async function showFeitjes(){
    let feitjes = await request('/dashboard/feitjes', 'GET');
    let feitjesList = document.getElementById("feitjesList");
    feitjesList.innerHTML = ""; 
    let i = 1;
    feitjes.forEach(feitje => {
        let feitjeItem = document.createElement("li");
        feitjeItem.innerHTML = `${i++} - ${feitje.feit}`;
        feitjesList.appendChild(feitjeItem);
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