var	url = "";

function loadArtist() {
	// this function is the "main" for this script and calls most of the loads
	artist = document.query.q.value;
	console.log("artist= " + artist);

	// first call artist load, then process
	artistXmlDoc = httpGet('artist', null)
	artistInfo = processArtistXmlDoc(artistXmlDoc);
	//console.log(artistInfo);
	
	// now query for albums, then process
	albumXmlDoc = httpGet('albums', artistInfo['uri']);
	albumInfo = processAlbumXmlDoc(albumXmlDoc);

	// display
	displayArtist(artistInfo['name']);


}

function httpGet(queryType, artistUri)
{
	if(queryType == 'artist') {
		console.log("artist query");
		baseUrl = 'https://ws.spotify.com/search/1/artist';
		queryUrl = baseUrl + "?q=" + artist;
	}
	else if (queryType == 'albums') {
		console.log("albums query");
    	baseUrl = 'http://ws.spotify.com/lookup/1/';
    	queryUrl = baseUrl + '?uri=' + artistUri + "&extras=album";
	}

	console.log("queryUrl = " + queryUrl);
    
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", queryUrl, false);
    xmlHttp.send(null);
    //alert(xmlHttp);
    return xmlHttp.responseXML;

}

function processArtistXmlDoc(artistXmlDoc) {
    x = artistXmlDoc.getElementsByTagName("artist");
    console.log(x);
    
    // get the first result no matter what
    var artist = new Array();
    artistName = x[0].childNodes[1]['textContent'];
    artistUri = x[0].attributes[0]['nodeValue'];
    artistPop = x[0].childNodes[3]['textContent'];
    
    artist['name'] = artistName;
    artist['uri'] = artistUri;
    artist['pop'] = artistPop;

    //console.log(artist);
    return artist;
}


function processAlbumXmlDoc(albumXmlDoc) {
	//console.log(albumXmlDoc);

    x = albumXmlDoc.getElementsByTagName("album");
    console.log(x);

	// build new array of names 
    var albums = new Array();
	for (i = 0; i <= (x.length-2); i++) {
		albums[i] = x[0].childNodes[1]['textContent'];
	};

    //console.log(artist);
    return albums;
}

function displayArtist(artistName)
{
	document.getElementById("databox").innerHTML=artistName;


}

function drawGraph()
{
	var graph = new Springy.graph();

	var spruce = graph.newNode({label: 'Norway Spruce'});
	var fir = graph.newNode({label: 'Sicilian Fir'});

	// connect them with an edge
	graph.newEdge(spruce, fir);
}
var databox;
function initiate() {
	databox = document.getElementById('databox');
	
	var button = document.getElementById('submit');
	button.addEventListener('click', loadArtist);
}

function read() {
	url = "";
	var request = new XMLHttpRequest();
	request.addEventListener('load', show);
	request.open("GET", url, true);
	request.send(null);
}

function show(e) {
	var data = e.target;
	if(data.status == 200) {
		databox.innerHTML = data.responseText;
	}
}
addEventListener('load', drawGraph);
addEventListener('load', initiate);
/*
// CORS stuff from http://www.html5rocks.com/en/tutorials/cors/
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
*/
/*
var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}
*/
/* 
function makeCorsRequest() {
	var url = 'http://freemusicarchive.org/api/get/curators.xml?api_key=A7L7P6UX5NB6MW22';
	var xhr = createCORSRequest('GET', url);
	if(!xhr) {
		alert('CORS not supported');
		return;
	}

	xhr.onload = function() {
		var text = xhr.responseText;

		alert(xhr.responseText);
		alert('Response from ' + url + ' ' + text);
	};

 	xhr.onerror = function() {
		alert('there was an error making the request.');
	};

	alert(xhr.send());
}
*/

