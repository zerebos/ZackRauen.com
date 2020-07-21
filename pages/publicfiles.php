<?php
include_once($home."/modules/filesystem.php");

$listingDir = $currentPage;
if (!file_exists($home.$listingDir)) {
	$listingDir = "/PublicFiles/";
}
$files = getFileList($home.$listingDir);


render_template($home . "/templates/card.php", [
	"class" => "filesContainer",
	"minimizable" => true,
	"title" => "Public Files",
	"content" => render_template($home . "/templates/filelist_table.php", ["directory" => $listingDir, "files" => $files], false)
]);