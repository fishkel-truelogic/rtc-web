<?php
include 'player.php';
include 'myFunctions.php';
include 'restRequest.php';

$vote = $_REQUEST['vote'];
$rateId = $_REQUEST['rateId'];
$eventId = $_REQUEST['eventId'];

$response = postRequest($urlServices.'rates/'.$rateId.'?vote='.$vote, null);
$response = postRequest($urlServices.'events/rated/'.$eventId, null);

?>
