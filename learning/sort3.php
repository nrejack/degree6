<?php

	$myFile = "testfile.txt";
	$fh = fopen($myFile, 'w');

	//$theData = fread($fh, filesize($myFile));
	$stringData = "New stuff 1\n";
	fwrite($fh, $stringData);
	$stringData = "New STuff 2\n";
	fwrite($fh, $stringData);
	//$theData = fgets($fh);
	fclose($fh);
	//echo $theData;
	//unlink($myFile);
	
?>