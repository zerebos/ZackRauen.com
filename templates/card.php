<div class="card<?= isset($data["minimizable"]) ? " minimizable" : ""; ?><?= isset($data['class']) ? " " . $data['class'] : "" ?>">
	<div class="card-header">
		<h1><?= $data["title"]; ?></h1>
		<?= isset($data["minimizable"]) ? '<span class="fa fa-minus button-minimize"></span>' : ""; ?>
	</div>
	<div class="card-body content-container">
		<?= $data["content"] ?>
	</div>
	<?= isset($data["footer"]) ? '<div class="card-footer content-container">' . $data["footer"] . '</div>': ""; ?>
</div>