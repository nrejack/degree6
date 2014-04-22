function clickme() {
	var elem = document.getElementById('main');
	var pelem;
	if(elem.webkitMatchesSelector("section")) {
		pelem = elem.querySelector("p:first-child");
		pelem.addEventListener('click', showalert);
	}
}

function showalert() {
	alert('you clicked me!');
}
addEventListener('load', clickme)

function newstyle() {
	var elem = document.getElementById('main');
	elem.style.background = "#990000";
}
addEventListener('load', newstyle);