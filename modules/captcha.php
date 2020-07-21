<?php
header ('Content-Type: image/png');
$im = @imagecreatetruecolor(120, 20)
      or die('Cannot Initialize new GD image stream');
$black = imagecolorallocate($im, 0, 0, 0);
$white = imagecolorallocate($im, 255, 255, 255);
imagefill($im, 0, 0, $white);
$op1 = $_GET['op1'];
$op2 = $_GET['op2'];
$op = $_GET['op'];
imagestring($im, 2, 5, 5,  "$op1 $op $op2 = ?", $black);
imagepng($im);
imagedestroy($im);
?>