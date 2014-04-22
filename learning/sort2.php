<?php
	include("start.html");
	// read entered numbers into array
	
	foreach($_GET as $key => $value) {
		$numbers[$key] = $value;
	}
	
	foreach($numbers as $key => $value) {
		echo "Index: $key, Value: $value <br>";
	}

	$newfilename = "testfile.txt";
	//r read, w write, a append
	//r+ rw pointer at start, w+ rw clear file first, a+ pointer at end
	$filehandle = fopen("$newfilename", 'w') or die("can't open file");
	$stringData = "floppy jalopy\n";
	fwrite($filehandle, $stringData);
	$stringData = "pointy pinto\n";
	fwrite($filehandle, $stringData);
	fclose($filehandle);

	//echo "Unsorted list<br>";
	/*
	for($n = 0; $n < count($numbers); $n++) {
		echo $numbers[$n];
		echo "<br>";
	}
	*/

	// bubble sort implementation
	
?>