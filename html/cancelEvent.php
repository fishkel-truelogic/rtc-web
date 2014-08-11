<?php
$id = $_REQUEST['id'];
?>

<div style="background: #e1c192 url(images/wood_pattern.jpg); width:100%; height:100%;">
	<div class="containerLogin">	
		<section class="main">
			<form class="form-2" method="post" style="top: 50px;">
				<h1><span class="log-in">Estas seguro que deseas cancelar la reserva?</span></h1>
				<p class="clearfix"> 
					<a class="submit" onclick="$.cancelEvent('<?php echo $id ?>');">Si</a> 
					<a class="submit" onclick="$.closeDialog('#cancel-dialog')">No</a> 
				</p>
			</form>​​
		</section>
	</div>
</div>
		
		