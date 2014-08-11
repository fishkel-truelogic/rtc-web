<?php
include '../php/player.php';
include '../php/restRequest.php';
include '../php/myFunctions.php';

$fieldId = $_REQUEST['fieldId'];
$userId = $_REQUEST['userId'];
$playerId = $_REQUEST['playerId'];
$eventId = $_REQUEST['eventId'];
$player = getUser();
if ($playerId == $player->{"id"}){
	if (isset($fieldId)){
		$field = getRequest($urlServices.'fields/'.$fieldId.'?lazy=false');
	}
	if (isset($userId)){
		$stablishment = getRequest($urlServices.'stablishments/owner/'.$userId);
	}	
}

?>

<script type="text/javascript" src="js/player/jquery-1.6.4.min.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script type="text/javascript" src="js/player/ddsmoothmenu.js"></script>
<script type="text/javascript" src="js/player/jquery.jcarousel.js"></script>
<script type="text/javascript" src="js/player/jquery.prettyPhoto.js"></script>
<script type="text/javascript" src="js/player/carousel.js"></script>
<script type="text/javascript" src="js/player/jquery.flexslider-min.js"></script>
<script type="text/javascript" src="js/player/jquery.masonry.min.js"></script>
<script type="text/javascript" src="js/player/jquery.slickforms.js"></script>
<script type="text/javascript">
	$(".rate").click(function(){
		var row = $(this).parent();
		var selected = $(this).find("span");
		if (selected.hasClass("cross")) {
			$(row).find("span").each(function() {
				var cell = $(this);
				if (cell.hasClass("check-icon")) {
					cell.removeClass("check-icon");
					cell.addClass("cross");
				}
			});
			selected.removeClass("cross");
			selected.addClass("check-icon");
		}
		
		
	});
	
	$("#submitRate").click(function(){
		var vote = 0;
		$("table").find(".check-icon").each(function(){
			vote += parseFloat($(this).attr('id'));
		});
		vote = vote / 3;
		$.ajax({
			url: 'php/rateField.php?vote=' + vote +'&rateId=' + '<?php echo $field->{"rate"}->{"id"} ?>'  +'&eventId=' + '<?php echo $eventId ?>',
			type: 'html',
			success: (function(data){ 
				location.reload();	
			})
		});
	});
</script>

	<h1 class="title">Calificación de cancha</h1>
	<div class="line"></div>
	<div class="intro">Califica la canacha de <?php echo $stablishment->{"name"}.': "'.$field->{"name"}.'"'  ?> y suma 10 puntos los cuales te daran beneficios como descuentos y VIPlayer.</div>
	<div class="line"></div>
        <h3><?php echo $stablishment->{"name"} ?> - <?php echo $field->{"name"}; ?></h3>
	<ul class="popular-posts" style="float:left;width:33%;margin-top:10px">
		<li>
			<a href=""><img style="max-width: 275px;" src="http://127.0.0.1:8080<?php echo $field->{"album"}->{"cover"}->{"dir"}?>" alt="" /></a>
		</li>
	</ul>
	<ul class="popular-posts" style="float:right;width:66%;margin-top:10px">
	  <li>
	   <table style="width: 105%;">
		<tr>
		 <th><h4></th>
		  <th><h4>Regular</h4></th>
		  <th><h4>Bueno</h4></th>
		  <th class="center"><h4>Excelente</h4></th>
		</tr>
		<tr>
		  <td>Estado de la cancha</td>
		  <td class="rate"><span id="1.0" class="cross"></span></td>
		  <td class="rate"><span id="2.5" class="check-icon"></span></td>
		  <td class="rate"><span id="5.0" class="cross"></span></td>
		</tr>
		<tr class="even">
		  <td>Precio respecto del lugar</td>
		  <td class="rate"><span id="1.0" class="cross"></span></td>
		  <td class="rate"><span id="2.5" class="check-icon"></span></td>
		  <td class="rate"><span id="5.0" class="cross"></span><td>
		</tr>
		<tr>
		  <td>Atencion y servicios</td>
		   <td class="rate"><span id="1.0" class="cross"></span></td>
		   <td class="rate"><span id="2.5" class="check-icon"></span></td>
		   <td class="rate"><span id="5.0" class="cross"></span></td>
		</tr>
	      </table>
	      <a id="submitRate" class="button green" style="border-radius: 3px; float:right">Aceptar</a>
		</li>
	</ul>
	<div class="line"></div>
	<h2>Fotos</h2>
	<div class="carousel">
	     <ul>
	      <li> <a href="#"> <span class="overlay details"></span><img src="http://127.0.0.1:8080<?php echo $field->{"album"}->{"cover"}->{"dir"}?>" alt="" /> </a> </li>
	      <?php foreach($field->{"album"}->{"images"} as $image){ ?>
		<li> <a href="#"> <span class="overlay details"></span><img src="http://127.0.0.1:8080<?php echo $image->{"dir"}?>" alt="" /> </a> </li>
	      <?php } ?>
	      </ul>
	    </div>
</div>
         
	
	<!-- End Content -->
	
<!-- End Wrapper -->
<div class="clear"></div>
<script type="text/javascript" src="js/player/scripts.js"></script>
<!--[if !IE]> -->
<script type="text/javascript" src="js/player/jquery.corner.js"></script>
<!-- <![endif]-->
