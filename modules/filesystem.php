<?php 
function human_filesize($bytes, $decimals = 2) {
	$sz[0] = 'B';
	$sz[1] = 'KB';
	$sz[2] = 'MB';
	$sz[3] = 'GB';
	$factor = floor((strlen($bytes) - 1) / 3);
	return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . " " . @$sz[$factor];
}

function listFilesNew($PATH,$URI,$TITLE="Files") {
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

	$files = array_diff(scandir($currentDir), array(".", "index.php", ".htaccess", "filelist.php"));
	
	usort($files, function($a, $b) {
		return is_dir ($a)
			? (is_dir ($b) ? strnatcasecmp ($a, $b) : -1)
			: (is_dir ($b) ? 1 : (
				strcasecmp (pathinfo ($a, PATHINFO_EXTENSION), pathinfo ($b, PATHINFO_EXTENSION)) == 0
				? strnatcasecmp ($a, $b)
				: strcasecmp (pathinfo ($a, PATHINFO_EXTENSION), pathinfo ($b, PATHINFO_EXTENSION))
			));
	});
	
	foreach ($files as $file) {
		$type = "Folder";
		$size = "";
		$link = $file . "/";
		
		if (is_file($currentDir.$file)) {
			$type = strtoupper(substr($file, strpos($file, '.') + 1,strlen($file)));
			$size = human_filesize(filesize($currentDir.$file));
			$link = $file;
		}

		$added = date ("n/d/y", filemtime($currentDir.$file));
		$access = date ("n/d/y", fileatime($currentDir.$file));
		
		

		echo "<tr><td class=\"filename\"><a href=\"$link\" download>$file</a></td><td>$size</td><td>$added</td></tr>";
	}

	echo "</table>";
	echo "</div></div>";
}

function getFileList($path) {
	$currentDir = $path;
	$files = array_diff(scandir($currentDir), array(".", "index.php", ".htaccess", "filelist.php"));
	
	usort($files, function($a, $b) {
		return is_dir ($a)
			? (is_dir ($b) ? strnatcasecmp ($a, $b) : -1)
			: (is_dir ($b) ? 1 : (
				strcasecmp (pathinfo ($a, PATHINFO_EXTENSION), pathinfo ($b, PATHINFO_EXTENSION)) == 0
				? strnatcasecmp ($a, $b)
				: strcasecmp (pathinfo ($a, PATHINFO_EXTENSION), pathinfo ($b, PATHINFO_EXTENSION))
			));
	});
	
	$fileList = array();
	foreach ($files as $file) {
		$type = "Folder";
		$size = "";
		$link = $file . "/";
		
		if (is_file($currentDir.$file)) {
			$type = strtoupper(substr($file, strpos($file, '.') + 1,strlen($file)));
			$size = human_filesize(filesize($currentDir.$file));
			$link = $file;
		}

		$added = date ("n/d/y", filemtime($currentDir.$file));
		$access = date ("n/d/y", fileatime($currentDir.$file));
		
		$fileList[] = ["name" => $file, "size" => $size, "type" => $type, "isDir" => $type == "Folder", "last_access" => $access, "last_updated" => $added];
	}
	
	return $fileList;
}
?>