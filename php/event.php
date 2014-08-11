<?php

define('NO_PREPAYMENT_YET', 0);
define('CANCELED_PREPAYMENT', 1);
define('NO_PLAYED_YET', 2);
define('NO_RATED_YET', 3);
define('RATED', 4);
define('CANCELED_PLAYER', 5);
define('CANCELED_OWNER', 6);

define('LABEL0', 'No pagó la seña aun');
define('LABEL1', 'Cancelado por falta de pago de seña');
define('LABEL2', 'Esperando para jugar');
define('LABEL3', 'Calificación pendiente');
define('LABEL4', 'Calificado');
define('LABEL5', 'Cancelado por el jugador');
define('LABEL6', 'Cancelado por el establecimiento');

class Event {
	
	public $id;
	public $userId;
	public $entity;
	public $entityName;
	public $start_date;
	public $end_date;
	public $prepayment;
	public $status;
	public $color;
	public $playerId;
	public $text;
	public $details;
	public $readonly;
	public $rtc; 
	 
	public function __get($property) {
		if (property_exists($this, $property)) {
			return $this->$property;
		}
	}

	public function __set($property, $value) {
		if (property_exists($this, $property)) {
			$this->$property = $value;
		}
		return $this;
	}
}
?>