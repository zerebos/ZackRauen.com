<?php
$infoMessage = "";
if (!empty($_REQUEST['rva']) && $_REQUEST['rvb']) {
	if ($_REQUEST['name'] && $_REQUEST['subject'] && $_REQUEST['message'] && $_REQUEST['filter'] && $_REQUEST['email']) {
		if (($_REQUEST['filter'] == $_REQUEST['rva'] + $_REQUEST['rvb'])) {
		$subject = $_REQUEST['subject'];
		$name = $_REQUEST['name'];
		$email = $_REQUEST['email'];
		$headers   = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=iso-8859-1";
		$headers[] = "From: ZackRauen.com <form@zackrauen.com>";
		$headers[] = "Subject: {$subject}";
		$headers[] = "X-Mailer: PHP/".phpversion();

		$message = "Email from: $name ($email)\r\n";
		$message .= $_REQUEST['message'];

		mail("rauenzi@outlook.com", $subject, $message, implode("\r\n", $headers));
		$infoMessage = "<span class=\"important\">Message Sent!</span><br /><br />";
		} 
		else {
		$infoMessage = "<span class=\"important\">You messed up the spam filter.</span><br /><br />";
		}
	}
	else {
		$infoMessage = "<span class=\"important\">Please fill out all fields.</span><br /><br />";
	}
}
$val1=mt_rand(1,9);
$val2=mt_rand(1,9);

render_template($home . "/templates/card.php", [
"title" => "Contact",
"content" => $infoMessage . '
		<form method="post" action="">
		<table id="contact">
		<tr><td>Your name:</td><td><input type="text" name="name" /></td></tr>
		<tr><td>Reason for contact:</td><td><input type="text" name="subject" /></td></tr>
		<tr><td>Email:</td><td><input type="email" name="email" /></td></tr>
		<tr><td>Spam filter <img src="/modules/captcha.php?op1=' . $val1 . '&op2=' . $val2 . '&op=plus" /></td><td><input type="text" name="filter" /></td></tr>
		<tr><td class="textarea-label">Message:</td><td><textarea rows="10" cols="40" name="message" placeholder="Type here..."></textarea></td></tr>
		<tr><td> </td><td><input type="hidden" name="rva" value="' . $val1 . '" /><input type="hidden" name="rvb" value="' . $val2 . '" /><input type="submit" value="Submit" /></td></tr>
		</table>
		</form>
'
]);
?>