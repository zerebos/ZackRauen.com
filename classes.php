<?php

class User {
	private $username;
	private $email;
	private $firstName;
	private $lastName;
	
	
	function __construct($user, $pass) {
		$this->username=$user;
		$this->email=$pass;
	}
	
	public function getUsername() {
		return $this->username;
	}
	
	public function getEmail() {
		return $this->email;
	}
	
}
?>