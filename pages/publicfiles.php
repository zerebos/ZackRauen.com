	if (!file_exists($home.$currentPage)) {
		$currentPage = "/PublicFiles/";
	}
	include_once($home."/resources/filelist.php");
	listFiles($home, $currentPage, "Public Files");