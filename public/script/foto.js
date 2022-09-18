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
    var fotoArr = myObj.fotos;
    for (let i = 0; i < fotoArr.length; i++) {
        const div = document.createElement('a');
        div.className = 'foto';
        div.id = 'foto' + i;
        div.href =  fotoArr[i].link;
        div.target = '_blank';
        const img = document.createElement('img');
        img.src = fotoArr[i].link;
        img.alt = fotoArr[i].name;
        div.appendChild(img);
        gallerij.appendChild(div);
    }
}
