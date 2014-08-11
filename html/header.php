<?php
		include '../php/myFunctions.php';
		include '../php/restRequest.php';
		include '../php/jqueryAjax.php';
		include '../php/player.php';
		
		$states = getRequest($urlServices . 'states');
		$sports = getRequest($urlServices . 'sports/');
		
		if (isset($_REQUEST['sport'])) {
			$sport = empty($_REQUEST['sport']) ? "DEPORTE" : $_REQUEST['sport'];
		} else {
			$sport = "DEPORTE";
		}
		
		if (isset($_REQUEST['state'])) {
			$state = empty($_REQUEST['state']) ? $states[0]->{'name'} : $_REQUEST['state'];
		} else {
			$state = $states[0]->{'name'};
		}
?>
<ul>
	<li>
		<a href="" class="icon icon-map-marker"><span><?php echo $state ?></span></a>
		<ul>
		<?php foreach ($states as $stateIT) { ?>
			<li>
				<a href="" onclick=" <?php	echo loadHeaderSentence($stateIT->{'name'}, $sport); ?> ">
					<?php echo $stateIT->{"name"} ?> 
				</a>
			</li>
			<?php } ?>
		</ul>
	</li>
	<li>
		<a href="" class="icon icon-caret-down"><span><?php echo $sport ?></span></a>
		<ul>
		<?php foreach ($sports as $sportIT) { ?>
			<li>
				<a href="" onclick=" <?php echo loadHeaderSentence($state, $sportIT->{'name'}); ?> ">
					<?php echo  $sportIT->{"name"} ?> 
				</a>
			</li>
			<?php } ?>
		</ul>
	</li>
	
	<script type="text/javascript">
		<?php 
			echo loadMainFilterSentence($state, '', $sport, '', '', '');	
			echo loadFeaturedFieldsSentence($state, $sport);
		?>
	</script>
	<?php 
	$player = getUser();
	
	if(isset($player)) { 
	?>
		<li><a id="login-fb-icon" class="icon icon-user" href="" onclick="$.loadPlayerProfile();"><span><?php echo $player->__get('username');?></span></a></li>
	<?php } else { ?>
		<li><a id="login-fb-icon" class="icon icon-facebook-sign" href="" onclick="$.loadLoginDialog();"><span>ingresar</span></a></li>
	<?php } ?>
	
</ul>