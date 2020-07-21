<?php 
$currentDir=$home.$page;
if (!file_exists($currentDir)) {
$currentDir=$home."/PublicFiles/";
}
$subDir = explode('/',$page);
$subDir = $subDir[count($subDir)-2];
?>
<div class="files">
<h2>Directory: <?php echo $subDir;?></h2>
<table><tr><th>Filename</th><th>Filesize</th><th>Filetype</th><th>Last Accessed</th><th>Added to Server</th></tr>
<?php
function human_filesize($bytes, $decimals = 2) {
	$sz[0] = 'B';
	$sz[1] = 'KB';
	$sz[2] = 'MB';
	$sz[3] = 'GB';
	$factor = floor((strlen($bytes) - 1) / 3);
	return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . " " . @$sz[$factor];
}
$files = scandir($currentDir);
$i=0;
$j=0;
foreach ($files as $file) {
	if ($file != "." && $file != "index.php" && $file != ".htaccess" && $file !="filelist.php") {
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

		echo "<tr><td id=\"name\"><img src=\"http://zackrauen.com/images/folder.ico\" width=\"24\" /><a href=\"$file\">$file</a></td><td id=\"size\" class=\"center\">$size</td><td id=\"type\" class=\"center\">$type</td><td id=\"access\" class=\"center\">$access</td><td id=\"date\" class=\"center\">$added</td></tr>";
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

		echo "<tr><td id=\"name\"><a href=\"$file\">$file</a></td><td id=\"size\" class=\"center\">$size</td><td id=\"type\" class=\"center\">$type</td><td id=\"access\" class=\"center\">$access</td><td id=\"date\" class=\"center\">$added</td></tr>";
	}
}
}


?>
</table>
</div>