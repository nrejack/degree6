<?php
	include("start.html");
	print($_GET['element01']);
	print("<br>");
	print($_GET['element02']);
	print("<br>");
	print($_GET['element03']);
	print("<br>");
	$hello = "Hello world";
	echo $hello;
	print($_GET['element07']);
	print("<br>");

	print("hello " . "world");
	//single line comment

	/* multiple line comment
	more stuff */
	include("bogus.html"); // no error message generated?

	if($_GET['element01'] == 10) {
		print("<br>congrats. you entered 10");
	}
	elseif($_GET['element01'] == 11) {
		print("<br>congrats. you entered 11");
	}
	else {
		print("<br>well, you entered something else");
	}
	print("<br>");
	switch($_GET['element02']){
		case 1:
			print("you entered 1");
			break;
		case 2:
			print("You entered 2");
			break;
		case 3:
			print("you entered 3");
			break;
		case 4:
			print("you entered 4");
			break;
		default:
			print("i'm not sure what you entered, but it wasn't 1, 2, 3, 4");
			break;
	}
	$name = $_GET['name'];

	function sayHello() {
		echo "hello";
	}

	function sayHelloName($name) {
		echo "hello " . $name;
	}

	function squared($num) {
		return $num * $num;
	}
	sayHello();
	sayHelloName($name);
	echo squared(4);
	include("end.html");

?>