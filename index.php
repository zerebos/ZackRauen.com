<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function render_template($file, $data = array(), $print = true) {
    $output = "";
    if (file_exists($file)) {
        extract($data);
        ob_start();
        include($file);
        $output = ob_get_clean();
	}
	if ($print) echo $output;
	return $output;
}

$home = getcwd();
$currentPage = $_SERVER['REQUEST_URI'];
$currentPage = str_replace("%20", " ", $currentPage);


$githubBaseUrl = "https://github.com/rauenzi/";
$repos = array("discordbot.py",
				"BlockCatcher",
				"Hangman",
				"TableTennisDB",
				"Object3D-Demo",
				"BetterDiscordAddons",
				"BetterDiscordApp",
				"BBDInstaller",
				"BDPluginLibrary",
				"VHDL-Communications",
				"Intelligent-Line-And-Marker-Tracking-Car");

function isPage($name) {
	return strpos($currentPage,"/" . $name)!==true && strpos($currentPage,"/" . $name)===0;
}

$page = "home";

if ($currentPage != "/" && $currentPage != "") $page = strtolower(explode("/", substr($currentPage, 1))[0]);
if (!file_exists("pages/" . $page . ".php")) $page = "home";
if ($page == "home") {
	define("WP_USE_THEMES", false);
	include_once($home . "/blog/wp-blog-header.php");
}

include_once("templates/home.php");

?>