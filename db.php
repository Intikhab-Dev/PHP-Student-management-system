<?php
$host = "localhost";
$dbname = "test";
$user = "root";
$pass = "";

$conn = mysqli_connect($host, $user, $pass, $dbname) or die("Connection failed: " . mysqli_connect_error());