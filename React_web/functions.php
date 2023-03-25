<?php
require_once('config.php');
function validate_date($date){
	
	if( !is_null($date)) {
		
      return $date ->format('Y-m-d H:i:s');
    }	

    return null;
	
	
}

 
?>