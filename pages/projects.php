<?php
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
	render_template($home . "/templates/card.php", [
		"minimizable" => true,
		"title" => $repo->name,
		"content" => "<p>" . $repo->description . "</p>",
		"footer" => render_template($home . "/templates/project_item_footer.php", (array) $repo, false)
	]);
}
unset($repo);