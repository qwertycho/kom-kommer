const gallerij = document.getElementById('gallerij');

// xml get request
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        makeImg(myObj);
    }
};
xmlhttp.open("GET", "/data", true);
xmlhttp.send();

function makeImg(myObj) {
    var fotos = myObj.fotos;
    for (let i = 0; i < fotos.length; i++) {
        const div = document.createElement('div');
        div.className = 'foto';
        div.id = 'foto' + i;
        const img = document.createElement('img');
        img.src = fotos[i].link;
        img.alt = fotos[i].name;
        div.appendChild(img);
        gallerij.appendChild(div);
    }
}
