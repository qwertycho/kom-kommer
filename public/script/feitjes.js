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
    let feitjes = await request('/api/feitjes', 'GET');
    const list = document.createElement('ol');
    for (let i = 0; i < feitjes.length; i++) {
        const listItem = document.createElement('li');
        listItem.innerHTML = feitjes[i].feit;
        list.appendChild(listItem);
    }
    document.getElementById('feitjes').appendChild(list);

}  showFeitjes();