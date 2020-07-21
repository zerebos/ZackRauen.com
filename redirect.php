<?php 
session_start();
$foo = $_SERVER[REQUEST_URI];
$_SESSION['path']=$foo;
$url = "http://zackrauen.com/";
header("Location: $url");

?>