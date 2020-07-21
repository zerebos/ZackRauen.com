<?php

$defaultList = [
	["src" => "/images/projects/7segs_small.jpg", "webp" => "/images/projects/7segs_small.webp", "label" => "Demonstrating multiple communications", "link" => "http://github.com/rauenzi/VHDL-Communications/"],
	["src" => "/images/projects/keypad_small.jpg", "webp" => "/images/projects/keypad_small.webp", "label" => "Keypad interfaced with an SRAM", "link" => ""],
	["src" => "/images/projects/wiring_small.jpg", "webp" => "/images/projects/wiring_small.webp", "label" => "The wiring for the keypad.", "link" => ""],
	["src" => "/images/projects/standalone_small.png", "webp" => "/images/projects/standalone_small.webp", "label" => "Standalone Hangman game", "link" => ""],
	["src" => "/images/projects/loss_small.png", "webp" => "/images/projects/loss_small.webp", "label" => "How the game looks upon losing. (Professor's face used with permission)", "link" => ""],
	["src" => "/images/projects/gameover_small.jpg", "webp" => "/images/projects/gameover_small.webp", "label" => "GAME OVER! A message from the hangman game.", "link" => ""]
];

$images = isset($data['images']) ? $data['images'] : $defaultList;

?>

<div id="mainCarousel" class="carousel">
	<ol class="carousel-indicators">
	</ol>

	<div class="slide">
		<?php
			foreach ($images as $image):
		?>

		<?php if (!isset($image['webp'])): ?>
			<img src="<?= $image['src'] ?>" alt="<?= $image['label'] ?>" data-link="<?= $image['link'] ?>">
		<?php else: ?>
			<picture>
				<source srcset="<?= $image['webp'] ?>" type="image/webp">
				<img src="<?= $image['src'] ?>" alt="<?= $image['label'] ?>" data-link="<?= $image['link'] ?>">
			</picture>
		<?php endif; ?>

		<?php
			endforeach;
		?>
	</div>

  <div class="carousel-control left" data-action="previous"><span class="fa fa-chevron-left carousel-previous-arrow"></span></div>
	<span class="carousel-caption"></span>
	<div class="carousel-control right" data-action="next"><span class="fa fa-chevron-right carousel-next-arrow "></span></div>
</div>
