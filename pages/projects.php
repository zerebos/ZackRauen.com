	$pluralize = function($count, $singlular, $plural) {
		return count > 0 ? "$count $singular" : "$count $plural";
	};

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
	$githubUrl = 'https://api.github.com/users/rauenzi/repos';
	
	// use key 'http' even if you send the request to https://...
	$options = array(
		'http' => array(
			'header'  => array('Accept: application/vnd.github.v3+json', 'User-Agent: rauenzi'),
			'method'  => 'GET'
		)
	);
	$context  = stream_context_create($options);
	$result = json_decode(file_get_contents($githubUrl, false, $context));

	$gitRepos = array_filter($result, function($el) use ($repos) {
		return in_array($el->name, $repos);
	});

	foreach ($gitRepos as &$repo) {
		?>
<div class="card project minimizable">
	<div class="card-header">
		<h1><?= $repo->name ?></h1>
		<span class="fa fa-minus button-minimize"></span>
	</div>
	<div class="card-body content-container">
		<p><?= $repo->description ?></p><br />
	</div>
	<div class="card-footer content-container">
		<a href="https://github.com/rauenzi?utf8=✓&amp;tab=repositories&amp;q=&amp;type=&amp;language=<?= strtolower($repo->language) ?>" target="_blank" class="footer-link">
			<img src="/images/svg/code.svg" class="footer-icon" width="14" height="16" alt="Programming Language" />
			<?= $repo->language ?>
		</a>

		<a href="<?= $repo->html_url ?>/stargazers" target="_blank" class="footer-link">
			<img src="/images/svg/star.svg" class="footer-icon" width="14" height="16" alt="Stars" />
			<?= $repo->stargazers_count ?>
		</a>

		<a href="<?= $repo->html_url ?>/network" target="_blank" class="footer-link">
			<img src="/images/svg/fork.svg" class="footer-icon" width="10" height="16" alt="Forks" />
			<?= $repo->forks_count ?>
		</a>

		<a href="<?= $repo->html_url ?>/issues" target="_blank" class="footer-link">
			<img src="/images/svg/issue.svg" class="footer-icon" width="14" height="16" alt="Issues" />
			<?= $repo->open_issues ?>
		</a>

		<a href="<?= $repo->html_url ?>/commits/master" target="_blank" class="footer-link">
			<img src="/images/svg/clock.svg" class="footer-icon" width="14" height="16" alt="Last Updated" />
			Updated <relative-time datetime="<?= $repo->pushed_at ?>" title="<?= $humanDate($repo->pushed_at) ?>"><?= $timeAgo($repo->pushed_at) ?></relative-time>
		</a>

		<a href="<?= $repo->html_url ?>" target="_blank" class="footer-link pull-right">
			<img src="/images/svg/brands/github.svg" class="footer-icon" width="14" height="16" alt="GitHub" />
			View on GitHub
		</a>
	</div>
</div>
<?php
	}

	unset($repo);