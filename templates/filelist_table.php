<?php 
$pagearray = trim($data["directory"], '/');
$pagearray = explode('/', $pagearray);
$tree = array();
for ($i = 0; $i < count($pagearray); $i++) {
	$link = '/';
	for ($j = 0; $j <= $i; $j++) {
		$link = $link.$pagearray[$j]."/";
	}
	$tree[] = "<a href=\"$link\">$pagearray[$i]</a>";
}

$tree = implode(" / ", $tree);
?>

<span class="directoryTree"><?= $tree; ?></span>
<table><tr><th class="filename">Filename</th><th>Size</th><th>Updated</th></tr>
<?php
foreach ($data['files'] as $file):
$class = $file['isDir'] ? "folder" : "file";
$download = $file['isDir'] ? "" : " download";
$updated = $file['name'] == '..' ? "" : $file['last_updated'];
?>

<tr>
	<td class="filename <?= $class ?>"><a href="<?= $file['name'] ?>"<?= $download ?>><?= $file['name'] ?></a></td>
	<td><?= $file['size'] ?></td>
	<td><?= $updated ?></td>
</tr>

<?php
endforeach;
?>
</table>
