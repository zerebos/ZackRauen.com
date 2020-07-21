<?php 
function human_filesize($bytes, $decimals = 2) {
	$sz[0] = 'B';
	$sz[1] = 'KB';
	$sz[2] = 'MB';
	$sz[3] = 'GB';
	$factor = floor((strlen($bytes) - 1) / 3);
	return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . " " . @$sz[$factor];
}

function listFiles($PATH,$URI,$TITLE="Files") {
	$currentDir=$PATH.$URI;
	$pagearray = trim($URI,'/');
	
	$pagearray = explode('/',$pagearray);
	for ($i = 0; $i < count($pagearray); $i++) {
		$link = '/';
		for ($j = 0; $j <= $i; $j++) {
			$link = $link.$pagearray[$j]."/";
		}
		$prettypage[$i] = "<a href=\"$link\">$pagearray[$i]</a>";
	}
	$prettypage=implode(" / ",$prettypage);
	//foreach ($pagearray as $part) { $prettypage=$prettypage."/".$part;}
	//$prettypage = str_replace('/'," / ",$prettypage);
	?>
	
	<div class="filesContainer card minimizable">
	<div class="card-header">
	<h1><?php echo $TITLE; ?></h1>
	<span class="fa fa-minus button-minimize"></span>
	</div>
	<div class="content-container">
	<span class="directoryTree"><?php echo $prettypage;?></span>
	<table><tr><th class="filename">Filename</th><th>Size</th><th>Updated</th></tr>
	<?php

	$files = scandir($currentDir);
	$i=0;
	$j=0;
	foreach ($files as $file) {
		if ($file != "." && $file != ".git" && $file != "index.php" && $file != ".htaccess" && $file !="filelist.php") {
			if (is_file($currentDir.$file)) {
				$fileList[$i]=$file;
				$i++;
			}
			else {
				$directoryList[$j]=$file;
				$j++;
			}
		}
	}

	if (isset($directoryList)) {
	foreach ($directoryList as $file) {
		if ($file != "." && $file != "index.php" && $file != ".htaccess" && $file != "filelist.php") {

		$type = "Folder";
		$size = "";
		$added = date ("n/d/y", filemtime($currentDir.$file));
		$access = "";
			if ($file == "..") {
			$added ="";
			}

			echo "<tr><td class=\"filename\"><a href=\"".$file."/\">$file</a></td><td>$size</td><td>$added</td></tr>";
		}
	}
	}
	if (isset($fileList)) {
	foreach ($fileList as $file) {
		if ($file != "." && $file != "index.php" && $file != ".htaccess") {

		$type = strtoupper(substr($file, strpos($file, '.') + 1,strlen($file)));
		$size = human_filesize(filesize($currentDir.$file));
		$added = date ("n/d/y", filemtime($currentDir.$file));
		$access = date ("n/d/y", fileatime($currentDir.$file));

			echo "<tr><td class=\"filename\"><a href=\"$file\" download>$file</a></td><td>$size</td><td>$added</td></tr>";
		}
	}
	}

	echo "</table>";
	echo "</div></div>";
}
?>