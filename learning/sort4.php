<?php
	$numberedString = "123456789012345678901234567890";
	$offset = 0;
	while($offset <= length($numberedString)) {
		$fivePos = strpos($numberedString, "5");
		echo "The position of 5 in our string was $fivePos";
	}


	
?>