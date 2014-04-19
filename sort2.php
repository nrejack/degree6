<?php
	include("start.html");
	// read entered numbers into array
	$numbers[0] = $_GET['element01'];
	$numbers[1] = $_GET['element02'];
	$numbers[2] = $_GET['element03'];
	$numbers[3] = $_GET['element04'];
	$numbers[4] = $_GET['element05'];
	$numbers[5] = $_GET['element06'];
	$numbers[6] = $_GET['element07'];

	echo "Unsorted list<br>";
	for($n = 0; $n < count($numbers); $n++) {
		echo $numbers[$n];
		echo "<br>";
	}

	// bubble sort implementation
	
?>