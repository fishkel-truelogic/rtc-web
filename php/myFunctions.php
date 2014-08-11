<?php 



function startsWith($haystack, $needle)
{
    return $needle === "" || strpos($haystack, $needle) === 0;
}

function getUser () {
	
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}	
	
	if(isset($_SESSION['player'])) { 
		return unserialize($_SESSION['player']);
	} else {
		return null;
	}
}

function formatDateStrFromTo($patternFrom, $patternTo, $str) {
	$date = date_create_from_format($patternFrom, $str);
	return date_format($date, $patternTo);
}

function addIntervalToStrTime($str, $pattern, $interval) {
	$date = date_create_from_format($pattern, $str);
	date_add($date, date_interval_create_from_date_string($interval));
	return date_format($date, $pattern);
}
?>