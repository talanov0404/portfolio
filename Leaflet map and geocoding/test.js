let mymap = L.map('mapid').setView([51.505, -0.09], 2);
let myLayer = L.geoJSON().addTo(mymap);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.pirates',
    accessToken: 'pk.eyJ1IjoidGFsYW5vdjE3NSIsImEiOiJjazBjYzZkYjkxMGZiM2Ntd3BqeTI2b3huIn0.if0L6vFsOgZQASjXivChnA'
}).addTo(mymap);


search.onclick = function requestSite(event) {
    event.preventDefault();
    const listRemoved = document.getElementById('searchresults');
    while (listRemoved.firstChild) {
        listRemoved.removeChild(listRemoved.firstChild);
    }
    let q = document.getElementById('q').value;
    let url = 'https://nominatim.openstreetmap.org/search.php?format=geojson&q=' + q + '&limit=50&polygon_geojson=1';
    fetch(url)
        .then(response => response.json()) // читаем ответ в формате JSON
        .then(data => outputData(data));
};

var searchObject = {};

function outputData (data) {
    window.searchObject = data;
    let searchResults = document.getElementById('searchresults');
    for(let i = 0; i < data.features.length; i++) {
        let div = document.createElement('div');
        div.className = 'result';
        div.dataset.position = i;
        let p = document.createElement('p');
        p.className = 'name';
        p.textContent = data.features[i].properties.display_name;
        searchResults.append(div);
        let searchResultChild = searchResults.children[i];
        if (data.features[i].properties.icon) {
            let img = document.createElement('img');
            img.alt = 'icon';
            img.src = data.features[i].properties.icon;
            searchResultChild.append(img);
        }
        searchResultChild.append(p);
    }
}

function init() {
    let searchBox = document.querySelector('#searchresults');
    searchBox.addEventListener('click', clickOnResult);
}
function clickOnResult(event) {
    event.preventDefault();
    let target = event.target.closest('.result');
    if (!target || !this.contains(target)) return;
    let arrResult = document.querySelectorAll('.result');
    for (let i = 0; i <arrResult.length; i++) {
        arrResult[i].classList.remove('highlight');
    }
    event.target.closest('.result').classList.add('highlight');
    findingPoint(event.path[1].attributes[1].nodeValue);
}
function findingPoint (value){
    let objMap = searchObject.features[value];
    mymap.removeLayer(myLayer);
    myLayer = L.geoJSON(objMap).addTo(mymap);
    console.log(L.geoJSON(objMap));
    mymap.fitBounds(myLayer.getBounds());
}