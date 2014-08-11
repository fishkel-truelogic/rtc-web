<?php
	include '../php/restRequest.php';
	include '../php/jqueryAjax.php';
	
	$state = "";
	$sport = "";
	
	$serchParameter = "?";
	
	if (isset($_REQUEST['state'])) {
		$state = $_REQUEST['state'];
		$serchParameter = $serchParameter.'state='.$state;
	}
	
	if (isset($_REQUEST['sport'])) {
		$sport = $_REQUEST['sport'];
		if ($sport != 'DEPORTE') {
			if ($serchParameter != '?') {
				$serchParameter = $serchParameter.'&sport='.$sport;
			} else {
				$serchParameter = $serchParameter.'sport='.$sport;
			}
		}
	} 
	
	if ($serchParameter == '?') {
		$serchParameter = '';
	}
	
	$stablishments = getRequest($urlServices.'fields/featured'.replace($serchParameter));

?>

<div id="features-wrapper">
			
	<!-- Features -->
	<section id="features" class="container">
		<header>
			<h2>canchas destacadas</h2>
		</header>
		<div class="row">
			<?php foreach ($stablishments as $stablishment) { 
				$field = $stablishment->{"fields"}[0];
			?>
			<div class="4u">

				<!-- Feature -->
				<section>
					<a href="stablishment.php?id=<?php echo $stablishment->{"id"} ?>" class="image image-full"><img src="http://127.0.0.1:8080<?php echo $field->{"album"}->{"cover"}->{"dir"}?>" style="min-height: 268px;"/></a>
					<header>
						<h3><?php echo $stablishment->{"name"} . " " ?>(<?php echo $field->{"name"}; ?>) </h3>
						<div style="left: -85px;" id="r1" class="rate_widget">
						<?php for ($i = 1; $i <= 5; $i++) { ?>
							<div class="star_<?php echo $i ?> ratings_stars <?php echo ($i <= round($field->{"rate"}->{"average"})) ? 'ratings_vote' : ''; ?>"></div>
						<?php } ?>
						</div>
					</header><br>
				</section>

			</div>
			<?php } ?>
		</div>
		<ul class="actions">
			<li><a href="#" class="button button-icon icon icon-file">Ver Más</a></li>
		</ul>
	</section>

</div>