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
	<meta name="description" content="Half of this site is dedicated to Zack Rauen's work including web and hardware design. The other half is his blog where he discusses anything from poetry to the very meaning of life itself." />
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
					<span class="fa fa-question-circle fa-margin-right"></span> About Me
				</a>
			</li>
			<li>
				<a href="/Projects">
					<span class="fa fa-code fa-margin-right"></span> Projects
					<ul>
						<?php foreach($repos as $repo): ?>
						<li><a href="<?= $githubBaseUrl . $repo ?>" target="_blank" class="no-text-transform"><?= $repo ?></a></li>
						<?php endforeach; ?>
					</ul>
				</a>
				
			</li>
			<li>
				<a href="https://soundcloud.com/ZackRauen" target="_blank">
					<span class="fa fa-music fa-margin-right"></span> Music
				</a>
			</li>
			<li>
				<a href="/blog">
					<span class="fa fa-edit fa-margin-right"></span> Writing
				</a>
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
					<span class="fa fa-download fa-margin-right"></span> Downloads
				</a>
			</li>
			<li>
				<a href="/Contact">
					<span class="fa fa-envelope fa-margin-right"></span> Contact
				</a>
			</li>
		</ul>

	</nav>
	<div class="container">
		<section class="width-3-of-4">
		<?php include_once($home . "/pages/" . $page . ".php"); ?>
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