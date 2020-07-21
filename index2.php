<?php

function render_template($file, $data = array(), $print = true)
{
    $output = "";
    if(file_exists($file)){
        extract($variables);
        ob_start();
        include_once($file);
        $output = ob_get_clean();
	}
	echo $output;
}

$home = getcwd();
$currentPage = $_SERVER['REQUEST_URI'];
$currentPage = str_replace("%20", " ", $currentPage);
//$project = count(explode('/',"$currentPage/")) > 2 ? explode('/',"$currentPage/")[2] : NULL;
//$project = str_replace("/","",$project);
// $project = count(explode('/',"$currentPage/")) > 3 ? explode('/',"$currentPage/")[3] : NULL;
//echo "Category: $category <br />Project: $project";
//include_once($home."/blog/wp-load.php");
include_once($home."/blog/wp-blog-header.php");


$githubBaseUrl = "https://github.com/rauenzi/";
$repos = array("discordbot.py",
				"BlockCatcher",
				"Hangman",
				"TableTennisDB",
				"Object3D-Demo",
				"BetterDiscordAddons",
				"BetterDiscordApp",
				"VHDL-Communications",
				"Intelligent-Line-And-Marker-Tracking-Car");

function isPage($name) {
	return strpos($currentPage,"/" . $name)!==true && strpos($currentPage,"/" . $name)===0;
}

$page = "home";

if ($currentPage != "/" && $currentPage != "") $page = strtolower(explode("/", substr($currentPage, 1))[0]);
if (!file_exists("pages/" . $page . ".php")) $page = "home";

include_once("templates/home.php");

?>