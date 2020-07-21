<?php
$home = getcwd();
$currentPage = $_SERVER['REQUEST_URI'];
$currentPage = str_replace("%20"," ",$currentPage);
//$project = count(explode('/',"$currentPage/")) > 2 ? explode('/',"$currentPage/")[2] : NULL;
//$project = str_replace("/","",$project);
// $project = count(explode('/',"$currentPage/")) > 3 ? explode('/',"$currentPage/")[3] : NULL;
//echo "Category: $category <br />Project: $project";
include_once($home."/resources/filelist.php");
include_once($home."/blog/wp-blog-header.php");
$githubBaseUrl = "https://github.com/rauenzi/";
$repos = array("discordbot.py",
				"BlockCatcher",
				"Hangman",
				"TableTennisDB",
				"Object3D-Demo",
				"BetterDiscordAddons",
				"BetterDiscordApp",
				"VHDL-Communications",
				"Intelligent-Line-And-Marker-Tracking-Car");
?>

	<!doctype html>
	<html>

	<head>
		<link rel="shortcut icon" href="/images/favicon.ico" />
		<link rel="stylesheet" href="/resources/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="/style.css" type="text/css" />
		<script src="/SwipeDetection.js"></script>
		<script src="/carousel.js"></script>
		<title>Home for the one and only Zack Rauen</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="title" content="Zack Rauen" />
		<meta name="keywords" content="zach,zack,rauen,business,design,blog,poetry,life,literature" />
		<meta name="description" content="Half of this site is dedicated to Zack Rauen's work including web and hardware design. The other half is his blog where he discusses anything from poetry to the very meaning of life itself."
		/>
		<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<![endif]-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<script>
			(adsbygoogle = window.adsbygoogle || []).push({
				google_ad_client: "ca-pub-4528817224828410",
				enable_page_level_ads: true
			});
		</script>
	</head>

	<body>
		<header class="disappear">
			<div class="center-block">
				<a class="slow-expand-text accent-font logo-text" style="line-height:59px;" href="/">&lt;ZackRauen&gt;</a>
				<div id="search">

					<gcse:search></gcse:search>
					<style>
						.gsc-control-cse {
							background: transparent;
							border: none;
							padding: 0;
							box-sizing: content-box;
						}

						.gsc-search-button,
						.gsc-search-button-v2 {
							box-sizing: content-box;
						}
					</style>
				</div>
			</div>
		</header>
		<nav class="collapse accent-font">
			<a class="shadow-text accent-font logo-text expand right" href="/">&lt;ZackRauen&gt;</a>
			<button id="menuButton" class="expand left">
				<span class="rectangle"></span>
				<span class="rectangle"></span>
				<span class="rectangle"></span>
			</button>

			<ul class="mainNav">
				<li>
					<a href="/About">
						<span class="fa fa-question-circle fa-margin-right"></span>About Me</a>
				</li>
				<li>
					<a href="/Projects">
						<span class="fa fa-code fa-margin-right"></span>Projects</a>
					<ul>
						<?php foreach($repos as $repo): ?>
						<li><a href="<?= $githubBaseUrl . $repo ?>" target="_blank" class="no-text-transform"><?= $repo ?></a></li>
						<?php endforeach; ?>
					</ul>
				</li>
				<li>
					<a href="https://soundcloud.com/ZackRauen" target="_blank">
						<span class="fa fa-music fa-margin-right"></span>Music</a>
				</li>
				<li>
					<a href="/blog">
						<span class="fa fa-edit fa-margin-right"></span>Writing</a>
					<ul>
						<li>
							<a href='/blog/poetry'>Poetry</a>
						</li>
						<li>
							<a href='/blog/life'>Life Stories</a>
						</li>
						<li>
							<a href='/blog/fanfiction'>Fiction</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="/PublicFiles">
						<span class="fa fa-download fa-margin-right"></span>Downloads</a>
				</li>
				<li>
					<a href="/Contact">
						<span class="fa fa-envelope fa-margin-right"></span>Contact</a>
				</li>
			</ul>

		</nav>
		<div class="container">



			<section class="width-3-of-4">
				<!-- <img src="images/Projects/keypad.jpg" class="full" alt="Keypad" /> -->

				<?php

if (strpos($currentPage,"/Projects")!==true && strpos($currentPage,"/Projects")===0) {
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
}
elseif (strpos($currentPage,"/PublicFiles")!==true && strpos($currentPage,"/PublicFiles")===0) {
	if (!file_exists($home.$currentPage)) {
		$currentPage = "/PublicFiles/";
	}
	listFiles($home, $currentPage, "Public Files");
}
elseif (strpos($currentPage,"/Contact")!==true && strpos($currentPage,"/Contact")===0) {
	include_once("resources/contact.php");
}
elseif (strpos($currentPage,"/BlockCatcher")!==true && strpos($currentPage,"/BlockCatcher")===0) {
//include_once("Software/Games/BlockCatcher/index.html");
?>
						<iframe class="card" height="950px" src="http://www.ZackRauen.com/Software/Games/BlockCatcher/index.html"></iframe>
						<?php
}
elseif (strpos($currentPage,"/About")!==true && strpos($currentPage,"/About")===0) {
	include_once($home."/resources/carousel.php");
?>
							<div class="card minimizable">
								<div class="card-header">
									<h1>About Me</h1>
									<span class="fa fa-minus button-minimize"></span>
								</div>
								<div class="card-body content-container">
									<p>Zack grew up with a love of computers. He started programming when he was only 10 years old and hasn't stopped since.
										3 years later, when he was 13, he built his first PC. And in that same year, he had his first published website
										with a functional login and profile system. </p>
									<br />
									<p>While he was young, he focused mainly on web programming and learned majority of the popular web languages of the
										time such as (X)HTML, CSS, PHP/MySQL and a familiarity with Javascript. Developing web applications in PHP sparked
										his interest in non-web based programming. From there he started learning C/C++/C# and Java but had mainly focused
										on C++. He made several little console games such as Connect Four or Tic-Tac-Toe. It was also around this time
										that his interest in game development was sparked. He, and a couple of friends, developed a very small Sonic The
										Hedgehog fangame using something Called "Gamemaker" by YoYo Games. While the gamemaker engine did the blunt of
										the work. The game logic and basic graphic (sprite) handling was done by Zack and Andrew, a dynamic duo at the
										time.</p>
									<br />
									<p>Upon entering High School, however, programming went on the back-burner for a short while. During this programming
										hiatus, Zack explored his interest in electronics and computer hardware. Under the guidance of his teacher, Mr.
										Eagle, he learned how to work with basic electronics as basic as a light with a switch up to generic house wiring
										and safety principles. He also went on to digital electronics, adding logic design and basic robotics to his already
										formidable arsenal. He even built a little robot that seemed to wander aimlessly through the room, but anytime
										it came close to running into something, it was programmed to detect it and move away. He also learned a few other
										neat things that would help him later on such as Photoshop and graphic design, Human-Computer Interaction (HCI)
										principles as well as woodworking and product design.</p>
									<br />
									<br /> More info coming soon...
								</div>
							</div>
							<?php
}
elseif (strpos($currentPage,"/Debug")!==true && strpos($currentPage,"/Debug")===0) {

}
else {
include_once($home."/resources/carousel.php");
?>

								<?php

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

										<?php } ?>
			</section>
			<section class="width-1-of-4">
				<aside class="card minimizable">
					<div class="card-header">
						<h1>Resume</h1>
						<span class="fa fa-minus button-minimize"></span>
					</div>
					<figure class="card-body content-container icons">
						<a href="/files/Resume.pdf" download>
							<img src="/images/readericon.png" class="icon" alt="Adobe Reader" />
						</a>
						<a href="/files/Resume.docx" download>
							<img src="/images/wordicon.png" class="icon" alt="Microsoft Word" />
						</a>
					</figure>
				</aside>

				<aside class="card minimizable">
					<div class="card-header">
						<h1>Social</h1>
						<span class="fa fa-minus button-minimize"></span>
					</div>
					<figure class="card-body content-container icons">
						<a href="http://facebook.com/ZackRauen" target="_blank">
							<img src="/images/social/facebook.png" class="icon" alt="Facebook" />
						</a>
						<a href="http://twitter.com/ZackRauen" target="_blank">
							<img src="/images/social/twitter.png" class="icon" alt="Twitter" />
						</a>
						<a href="http://instagram.com/ZackRauen" target="_blank">
							<img src="/images/social/instagram.png" class="icon" alt="Instagram" />
						</a>
						<a href="http://github.com/rauenzi" target="_blank">
							<img src="/images/social/github.png" class="icon" alt="Github" />
						</a>
						<a href="http://linkedin.com/in/rauenzi" target="_blank">
							<img src="/images/social/linkedin.png" class="icon" alt="LinkedIn" />
						</a>
					</figure>
				</aside>

				<aside class="profile card minimizable">
					<div class="card-header image-header">
						<img src="/images/self.png" alt="myself" />
						<span class="fa fa-minus button-minimize"></span>
					</div>
					<div class="card-body content-container">
						<h4>Graduate:</h4>
						Clarkson University 2018<br />
						Electrical &amp; Computer Engineering M.S.
						<h4>Undergraduate:</h4>
						Clarkson University 2016<br />
						Computer Engineering, B.S.
						<h4>Minors:</h4>
						Software Engineering, Computer Science, Mathematics
					</div>
				</aside>



				<aside class="card minimizable">
					<div class="card-header">
						<h1>Ads</h1>
						<span class="fa fa-minus button-minimize"></span>
					</div>
					<div class="card-body content-container">
						<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
						<!-- ZackRauen Sidebar -->
						<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4528817224828410" data-ad-slot="8416058953" data-ad-format="auto"></ins>
						<script>
							(adsbygoogle = window.adsbygoogle || []).push({});
						</script>
					</div>
				</aside>
			</section>

		</div>
		<footer>
			<div class="container">
				<section class="width-full">
					<h4>Contact Me:</h4>
					<ul class="inline-list">
						<li>
							<a href="/Contact" target="_blank" class="footer-link">
								<img src="/images/svg/envelope.svg" class="footer-icon" width="14" height="16" alt="Email" />
								Email
							</a>
						</li>
						<li>
							<a href="http://facebook.com/ZackRauen" target="_blank" class="footer-link">
								<img src="/images/svg/brands/facebook.svg" class="footer-icon" width="14" height="16" alt="Facebook" />
								Facebook
							</a>
						</li>
						<li>
							<a href="http://twitter.com/ZackRauen" target="_blank" class="footer-link">
								<img src="/images/svg/brands/twitter.svg" class="footer-icon" width="14" height="16" alt="Twitter" />
								Twitter
							</a>
						</li>
						<li>
							<a href="http://instagram.com/ZackRauen" target="_blank" class="footer-link">
								<img src="/images/svg/brands/instagram.svg" class="footer-icon" width="14" height="16" alt="Instagram" />
								Instagram
							</a>
						</li>
						<li>
							<a href="http://github.com/rauenzi" target="_blank" class="footer-link">
								<img src="/images/svg/brands/github.svg" class="footer-icon" width="14" height="16" alt="GitHub" />
								GitHub
							</a>
						</li>
						<li>
							<a href="http://linkedin.com/in/rauenzi" target="_blank" class="footer-link">
								<img src="/images/svg/brands/linkedin.svg" class="footer-icon" width="14" height="16" alt="LinkedIn" />
								LinkedIn
							</a>
						</li>
					</ul>
				</section>
				<section class="width-full">
					All content attributed to Zachary Rauen. Icons provided by Font-Awesome.
					<span id="toTop" style="cursor: pointer;">Back To Top</span><br />
				</section>
			</div>
		</footer>

		<script>
			(function () {
				var cx = '001705907668380068410:d4otzeyhs0e';
				var gcse = document.createElement('script');
				gcse.type = 'text/javascript';
				gcse.async = true;
				gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
					'//cse.google.com/cse.js?cx=' + cx;
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(gcse, s);
			})();
		</script>
		<script>
			$(document).ready(function () {
				var stickyNavTop = $('nav').offset().top;

				var stickyNav = function () {
					var scrollTop = $(window).scrollTop();

					if (scrollTop > stickyNavTop) {
						$('body').addClass('stickynav');
					} else {
						$('body').removeClass('stickynav');
					}
				};

				stickyNav();

				$(window).scroll(function () {
					stickyNav();
				});

				$('#menuButton').on('click', function () {
					if ($('nav').hasClass('expanded')) {
						$('nav').removeClass('expanded');
					} else {
						$('nav').addClass('expanded');
					}
				});
			});

			$(function () {
				$(".button-minimize").on("click", function (e) {
					if ($(this).hasClass("fa-plus")) {
						$(this).closest(".minimizable").find(".card-body").slideDown();
					} else {
						$(this).closest(".minimizable").find(".card-body").slideUp();
					}
					$(this).toggleClass('fa-minus');
					$(this).toggleClass('fa-plus');
				});
			});

			$(function () {
				$("body").click(function (e) {
					if (!$(e.target).closest("#menuButton").length) {
						$('nav').removeClass('expanded');
					}
				});
				$("body").on('touchstart', function (e) {
					if (!$(e.target).closest("#menuButton").length && !$(e.target).closest(".mainNav").length) {
						$('nav').removeClass('expanded');
					}
				});
				$("#toTop").click(function (e) {
					$('html, body').animate({
						scrollTop: $('body').offset().top
					}, 500);
				});
			});
		</script>
	</body>

	</html>