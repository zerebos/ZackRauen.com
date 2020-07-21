<?php
$timeAgo = function($timestamp, $full = false) {
	$previous = new DateTime($timestamp);
	$now = new DateTime();
	$diff = $now->diff($previous);
	$diff->w = floor($diff->d / 7);
	$diff->d -= $diff->w * 7;

	$string = array(
	'y' => 'year',
	'm' => 'month',
	'w' => 'week',
	'd' => 'day',
	'h' => 'hour',
	'i' => 'minute',
	's' => 'second',
	);

	foreach ($string as $k => &$v) {
		if ($diff->$k) {
			$v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
		}
		else {
			unset($string[$k]);
		}
	}

	if (!$full) $string = array_slice($string, 0, 1);
	return $string ? implode(', ', $string) . ' ago' : 'just now';
};

$humanDate = function($timestamp) {
	return (new DateTime($timestamp))->format('M j, Y, g:i A T');
};
?>

<a href="https://github.com/rauenzi?utf8=✓&amp;tab=datasitories&amp;q=&amp;type=&amp;language=<?= strtolower($data["language"]) ?>" target="_blank" rel="noopener" class="footer-link">
	<img src="/images/svg/code.svg" class="footer-icon" width="14" height="16" alt="Programming Language" />
	<?= $data["language"] ?>
</a>

<a href="<?= $data["html_url"] ?>/stargazers" target="_blank" rel="noopener" class="footer-link">
	<img src="/images/svg/star.svg" class="footer-icon" width="14" height="16" alt="Stars" />
	<?= $data["stargazers_count"] ?>
</a>

<a href="<?= $data["html_url"] ?>/network" target="_blank" rel="noopener" class="footer-link">
	<img src="/images/svg/fork.svg" class="footer-icon" width="10" height="16" alt="Forks" />
	<?= $data["forks_count"] ?>
</a>

<a href="<?= $data["html_url"] ?>/issues" target="_blank" rel="noopener" class="footer-link">
	<img src="/images/svg/issue.svg" class="footer-icon" width="14" height="16" alt="Issues" />
	<?= $data["open_issues"] ?>
</a>

<a href="<?= $data["html_url"] ?>/commits/master" target="_blank" rel="noopener" class="footer-link">
	<img src="/images/svg/clock.svg" class="footer-icon" width="14" height="16" alt="Last Updated" />
	Updated <relative-time datetime="<?= $data["pushed_at"] ?>" title="<?= $humanDate($data["pushed_at"]) ?>"><?= $timeAgo($data["pushed_at"]) ?></relative-time>
</a>

<a href="<?= $data["html_url"] ?>" target="_blank" rel="noopener" class="footer-link pull-right">
	<img src="/images/svg/brands/github.svg" class="footer-icon" width="14" height="16" alt="GitHub" />
	View on GitHub
</a>