<?php

include 'myFunctions.php';
include 'restRequest.php';
include 'event.php';
include 'player.php';

$action = $_REQUEST["action"];

switch ($action) {
    case "booking":
		$event = new Event();
		$entity = $_REQUEST["entity"];
		$entityName = $_REQUEST["entityName"];
		$bookDate = $_REQUEST["bookDate"];
		$userId = $_REQUEST["userId"];
		if (!empty($_REQUEST["prepayment"])) {
			$prepayment = $_REQUEST["prepayment"];
			$event->__set('prepayment', $prepayment);
			$event->__set('status', constant('NO_PREPAYMENT_YET'));
		} else {
			$event->__set('status', constant('NO_PLAYED_YET'));
		}
		$start_date = $_REQUEST["bookDate"];
		$end_date = addIntervalToStrTime($start_date, "d/m/Y G:i", "1 hour"); 
		$player = getUser();
		$event->__set('playerId', $player->__get('id'));
		$event->__set('entity', $entity);
		$event->__set('rtc', true);
		$event->__set('entityName', $entityName);
		$event->__set('userId', $userId);
		$event->__set('start_date', $start_date);
		$event->__set('end_date', $end_date);
		$resp = postRequest($urlServices . 'events/', $event);
        break;
	case "cancel":
        $id = $_REQUEST["id"];
		$event = new Event();
		$event->__set('id', $id);
		$resp = postRequest($urlServices . 'events/cancel/' . $id, $event);
?>
			<script type="text/javascript">
				location.reload();
			</script>
<?php
		break;
}



?>