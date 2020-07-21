<?php
render_template($home."/templates/carousel.php");

function commentDisplay($num) {
	if ($num == 0) return '(0) Comments »';
	if ($num == 1) return '(1) Comment »';
	return '(%) Comments »';
}

$posts = get_posts(array ( 'category_name' => 'SiteNews', 'posts_per_page' => -1 ));
foreach($posts as $post) {
	setup_postdata($post);

	$date = get_the_time('m/d/Y');
	$author = get_the_author_posts_link();
	$comments = '<a href="' . get_comments_link() . '">' . commentDisplay(get_comments_number()) . "</a>";

	render_template($home . "/templates/card.php", [
		"minimizable" => true,
		"title" => get_the_title($post),
		"content" => get_the_excerpt($post),
		"footer" => "Posted: $date by: $author | $comments"
	]);
}
wp_reset_postdata();

?>