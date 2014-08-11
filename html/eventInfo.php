<?php
include '../php/player.php';
include '../php/event.php';
include '../php/restRequest.php';
include '../php/myFunctions.php';

$prepayment = $_REQUEST['prepayment'];
$status = $_REQUEST['status'];
$id = $_REQUEST['id'];
$eventId = $_REQUEST['eventId'];
$fieldId = $_REQUEST['fieldId'];
$stablishment = getRequest($urlServices.'stablishments/owner/'.$id.'?lazy=true');
$player = getUser();

?>
<div id="map-dialog" style="display:none"></div>
<div>
	<ul class="popular-posts" style="float:left">
		<li>
			<a href=""><img style="max-width: 275px;" src="http://127.0.0.1:8080<?php echo $stablishment->{"album"}->{"cover"}->{"dir"}?>" alt="" /></a>
			<a onclick="$.loadMapDialog(<?php echo $stablishment->{"mapMarker"}->{"lat"}.', '.$stablishment->{"mapMarker"}->{"lng"}.', \''.$stablishment->{"address"}.'\'' ?>)" style="float: right; position: relative; top: -45px; border-radius: 3px;" class="button blue">Ver Mapa</a>
			<h5><?php echo $stablishment->{"name"}; ?></h5>
			<span><?php echo $stablishment->{"address"} . " - " . $stablishment->{"district"}->{"name"} . " - " . $stablishment->{"district"}->{"state"}->{"name"} ?> | $$$</span>
		</li>
	</ul>
	<ul class="popular-posts" style="float:right">
		<li>
			<?php
			switch($status) {
			
				case NO_PREPAYMENT_YET:
				case NO_PLAYED_YET:
			?>
			<a  onclick="$.loadCancelEventDialog('<?php echo $eventId ?>')" class="button red" style="border-radius: 3px;">Cancelar</a>
			<?php
				break;
				case NO_RATED_YET:
			?>
			<a onclick="$.rateField('<?php echo $fieldId ?>', '<?php echo $stablishment->{"userId"} ?>', '<?php echo $player->{"id"} ?>', '<?php echo $eventId ?>')" class="button green" style="border-radius: 3px;">Calificar</a>
			<?php break;
			}
			?>
			<?php
			switch($status) {
			
				case NO_PREPAYMENT_YET:
			?>
			<h5><a href="#">Seña</a></h5>
			<span>Vencimiento: <?php echo $prepayment ?></span>
			
			<?php
				break;
				case NO_PLAYED_YET:
			?>
			<h5><a href="#">Seña</a></h5>
			<span>Pagada</span>
			<?php break;
			}
			?>
			
		</li>
	</ul>
	
</div>