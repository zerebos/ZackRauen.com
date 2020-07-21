<!doctype html>
<html lang="en">
<head>
	<link rel="shortcut icon" href="/images/favicon.ico">
	<link rel="canonical" href="https://ZackRauen.com"/>
	<link rel="stylesheet" href="/font-awesome.min.css" media="all">
	<link rel="stylesheet" href="/style.min.css" type="text/css" media="all">
	<script async src="/SwipeDetection.js"></script>
	<script async src="/carousel.js"></script>
	<title>Home for the one and only Zack Rauen</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="title" content="Zack Rauen">
	<meta name="keywords" content="zach,zack,rauen,business,design,blog,poetry,life,literature">
	<meta name="description" content="Half of this site is dedicated to Zack Rauen's work including web and hardware design. The other half is his blog where he discusses anything from poetry to the very meaning of life itself.">
	<!-- Google Search -->
	<!--<script async src="//cse.google.com/cse.js?cx=001705907668380068410:d4otzeyhs0e"></script>-->
	<script async src="/main.js"></script>
</head>

<body>
	<header class="disappear">
		<div class="center-block">
			<a class="slow-expand-text accent-font logo-text" style="line-height:59px;" href="/">&lt;ZackRauen&gt;</a>
			<div id="search">
				<gcse:search></gcse:search>
			</div>
		</div>
	</header>
	<nav id="navigation" class="collapse accent-font">
		<a class="shadow-text accent-font logo-text expand right" href="/">&lt;ZackRauen&gt;</a>
		<button id="menuButton" class="expand left" aria-label="Menu">
			<span class="rectangle"></span>
			<span class="rectangle"></span>
			<span class="rectangle"></span>
		</button>

		<ul class="mainNav">
			<li>
				<a href="/About">
					<span class="fa fa-question-circle fa-margin-right"></span>About Me
				</a>
			</li>
			<li>
				<a href="/Projects">
					<span class="fa fa-code fa-margin-right"></span>Projects
					<ul>
						<?php foreach($repos as $repo): ?>
						<li><a href="<?= $githubBaseUrl . $repo ?>" target="_blank" rel="noopener" class="no-text-transform"><?= $repo ?></a></li>
						<?php endforeach; ?>
					</ul>
				</a>
				
			</li>
			<li>
				<a href="https://soundcloud.com/ZackRauen" target="_blank" rel="noopener">
					<span class="fa fa-music fa-margin-right"></span>Music
				</a>
			</li>
			<li>
				<a href="/blog">
					<span class="fa fa-edit fa-margin-right"></span>Writing
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
					<span class="fa fa-download fa-margin-right"></span>Downloads
				</a>
			</li>
			<li>
				<a href="/Contact">
					<span class="fa fa-envelope fa-margin-right"></span>Contact
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
						<img src="/images/resume/readericon_small.png" class="icon" alt="Adobe Reader" />
					</a>
					<a href="/files/Resume.docx" download>
						<img src="/images/resume/wordicon_small.png" class="icon" alt="Microsoft Word" />
					</a>
				</figure>
			</aside>

			<aside class="card minimizable">
				<div class="card-header">
					<h1>Social</h1>
					<span class="fa fa-minus button-minimize"></span>
				</div>
				<figure class="card-body content-container icons">
					<a href="http://facebook.com/ZackRauen" target="_blank" rel="noopener">
						<img src="/images/social/facebook_small.png" class="icon" alt="Facebook" />
					</a>
					<a href="http://twitter.com/ZackRauen" target="_blank" rel="noopener">
						<img src="/images/social/twitter_small.png" class="icon" alt="Twitter" />
					</a>
					<a href="http://instagram.com/ZackRauen" target="_blank" rel="noopener">
						<img src="/images/social/instagram_small.png" class="icon" alt="Instagram" />
					</a>
					<a href="http://github.com/rauenzi" target="_blank" rel="noopener">
						<img src="/images/social/github_small.png" class="icon" alt="Github" />
					</a>
					<a href="http://linkedin.com/in/rauenzi" target="_blank" rel="noopener">
						<img src="/images/social/linkedin_small.png" class="icon" alt="LinkedIn" />
					</a>
				</figure>
			</aside>

			<aside class="profile card minimizable">
				<div class="card-header image-header">
					<picture>
						<source srcset="/images/self_small.webp" type="image/webp">
						<img src="/images/self_small.png" alt="Myself from 2012" />
					</picture>
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
						<a href="http://facebook.com/ZackRauen" target="_blank" class="footer-link" rel="noopener">
							<img src="/images/svg/brands/facebook.svg" class="footer-icon" width="14" height="16" alt="Facebook" />
							Facebook
						</a>
					</li>
					<li>
						<a href="http://twitter.com/ZackRauen" target="_blank" class="footer-link" rel="noopener">
							<img src="/images/svg/brands/twitter.svg" class="footer-icon" width="14" height="16" alt="Twitter" />
							Twitter
						</a>
					</li>
					<li>
						<a href="http://instagram.com/ZackRauen" target="_blank" class="footer-link" rel="noopener">
							<img src="/images/svg/brands/instagram.svg" class="footer-icon" width="14" height="16" alt="Instagram" />
							Instagram
						</a>
					</li>
					<li>
						<a href="http://github.com/rauenzi" target="_blank" class="footer-link" rel="noopener">
							<img src="/images/svg/brands/github.svg" class="footer-icon" width="14" height="16" alt="GitHub" />
							GitHub
						</a>
					</li>
					<li>
						<a href="http://linkedin.com/in/rauenzi" target="_blank" class="footer-link" rel="noopener">
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
	<!--<script src="/ads.js"></script>-->
</body>

</html>