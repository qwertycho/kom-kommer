// xml get request
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        console.log(myObj.feitjes);
        setFeitjes(myObj);
    }
};
xmlhttp.open("GET", "/data", true);
xmlhttp.send();

function setFeitjes(myObj) {
    var feitjes = myObj.feitjes;
    const list = document.createElement('ol');
    for (let i = 0; i < feitjes.length; i++) {
        const listItem = document.createElement('li');
        listItem.innerHTML = feitjes[i];
        list.appendChild(listItem);
    }
    document.getElementById('feitjes').appendChild(list);
}
