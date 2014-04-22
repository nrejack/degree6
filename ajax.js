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
	//console.log(albumInfo);

	// display
	displayArtist(artistInfo, albumInfo);

	// fetch news from EchoNest
	//getNews(artist);

	// SPARQL results
	callSparql(artist);



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

	//console.log("queryUrl = " + queryUrl);
    
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
    //console.log(x);

	// build new array of names 
    var albums = new Array();
	for (i = 0; i <= (x.length-2); i++) {
		albums[i] = x[i].childNodes[1]['textContent'];
	};

    //console.log(artist);
    return albums;
}

function displayArtist(artist, albums)
{
	range = document.getElementById('textInput').value; 

	//console.log(artist);

	//document.getElementById("databox").innerHTML=artistName;

	// add nodes to graph
	var artist_name = graph.newNode({label: artist['name']});
	//console.log(artist['name']);

	album_array = new Array();
	//for(var i = 0; i < albums.length; i++){
	for(var i = 0; i < range; i++){
		album_array[i] = graph.newNode({label: albums[i]});
		//console.log(albums[i]);
		graph.newEdge(artist_name, album_array[i]);
	};
	
	//var elem = document.getElementById("databox");
	//var content = elem.innerHTML;

}

// get headlines from EchoNest
function getNews(artist)
{
	baseUrl = "http://developer.echonest.com/api/v4/artist/news?api_key=YSB0O0HVP4UGUPIVC&name=";
	finalUrl = "&results=3&start=0";
	queryUrl = baseUrl + artist + finalUrl;

	/*
	var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", queryUrl, false);
    xmlHttp.send(null);
    */

    response = $.getJSON(queryUrl);
    console.log(response);
    /*
    //alert(xmlHttp);
    console.log(xmlHttp.responseText);
    parsed = JSON.parse(xmlHttp.responseText);
    console.log(parsed);
    return xmlHttp.responseText;
    */



}

// format news into readable
function makeNews(news)
{
	var stories = "";
	var numStories = 2; // really but numbering from 0

	// first extract data
	for(i=0; i < numStories; i++){

	}

	// then reformat and export

	return stories;
}

//SPARQL for results
function callSparql(album) {
      var endpoint = "http://dbpedia.org/sparql";
      var query = "PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> select * {?s rdf:type <http://dbpedia.org/ontology/Album> . ?s rdfs:label \"REPLACE\"@en. ?s ?p ?o } " ;
      query = query.replace("REPLACE", album);
      //console.log(query);

      // Define a callback function to receive the SPARQL JSON result.
      function myCallback(str) {
        // Convert result to JSON
        var jsonObj = eval('(' + str + ')');

        // Build up a table of results.
        var result = " <table border='2' cellpadding='9'>" ;
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
          result += " <tr> <td>" + jsonObj.results.bindings[i].s.value;
          result += " </td><td>" + jsonObj.results.bindings[i].p.value;
          result += " </td><td>" + jsonObj.results.bindings[i].o.value;
          result += " </td></tr>"; 
        } 
        result += "</table>" ;
        console.log(result);
        document.getElementById("results").innerHTML = result;
     }
      
     // Make the query.
     sparqlQueryJson(query, endpoint, myCallback, true);
      
}

function sparqlQueryJson(queryStr, endpoint, callback, isDebug) {
      var querypart = "query=" + escape(queryStr);
    isDebug = false;
      // Get our HTTP request object.
      var xmlhttp = null;
      if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
     } else if(window.ActiveXObject) {
       // Code for older versions of IE, like IE6 and before.
       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
     } else {
       alert('Perhaps your browser does not support XMLHttpRequests?');
     }
    
     // Set up a POST with JSON result format.
     xmlhttp.open('POST', endpoint, true); // GET can have caching probs, so POST
     xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    
     // Set up callback to get the response asynchronously.
     xmlhttp.onreadystatechange = function() {
       if(xmlhttp.readyState == 4) {
         if(xmlhttp.status == 200) {
           // Do something with the results
           if(isDebug) alert(xmlhttp.responseText);
           callback(xmlhttp.responseText);
         } else {
           // Some kind of error occurred.
           alert("Sparql query error: " + xmlhttp.status + " "
               + xmlhttp.responseText);
         }
       }
     };
     // Send the query to the endpoint.
     xmlhttp.send(querypart);
    
     // Done; now just wait for the callback to be called.
    };

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

