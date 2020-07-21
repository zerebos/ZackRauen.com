<?php
define("WP_USE_THEMES", false);
include_once($home."/resources/carousel.php");
// The Query
query_posts( array ( 'category_name' => 'SiteNews', 'posts_per_page' => -1 ) );

// The Loop
while ( have_posts() ) : the_post();
?>
<div class="card minimizable">
	<div class="card-header">
		<h1>
			<?php echo the_title(); ?>
		</h1>
		<span class="fa fa-minus button-minimize"></span>
	</div>
	<div class="card-body content-container">
		<?php echo the_excerpt();?>
	</div>
	<div class="card-footer content-container">
	Posted:
	<?php the_time('m/d/Y'); ?> by:
	<?php the_author_posts_link(); ?> |
	<?php comments_popup_link('(0) Comments »', '(0) Comment »', '(%) Comments »'); ?>
	</div>
</div>
<?php
endwhile;

// Reset Query
wp_reset_query();

?>