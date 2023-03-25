<?php
// get these values from your DB.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once('config.php');
$error_message;
$valid = true;


$json = file_get_contents('php://input');
// Converts it into a PHP object
$data = json_decode($json, true);



$site_cd = $data['site_cd'];
$hours_type_cd = $data['hours_type_cd'];
$hours_type_p_np_indicator = $data['hours_type_p_np_indicator'];
$hours_type_desc = $data['hours_type_desc'];
$hours_type_account = $data['hours_type_account'];
$hours_type_multiplier = $data['hours_type_multiplier'];
$hours_type_adder = $data['hours_type_adder'];
$ytd_hours = $data['2'];
$audit_user = $data['audit_user'];


$sql_insert_hours_type = "INSERT INTO hours_type
						( 		site_cd, 				hours_type_cd, 				hours_type_p_np_indicator, 		hours_type_desc, 
								hours_type_account, 	hours_type_multiplier, 		hours_type_adder, 				ytd_hours,			
								audit_user, 			audit_date,             	column1,						column2,										
								column3,				column4, 					column5 ) 
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						?,
								GetDate(),				NULL,				NULL,					NULL,					
								NULL,  					NULL) ";
												
							
								
								
$params_hours_type = array(		$site_cd,				$hours_type_cd,			$hours_type_p_np_indicator,				$hours_type_desc,
								$hours_type_account,	$hours_type_multiplier,	$hours_type_adder,						$ytd_hours,
								$audit_user,	);	
								
$stmt_hours_type = sqlsrv_query( $conn, $sql_insert_hours_type,$params_hours_type);	
if( !$stmt_hours_type ) {
	$error_message = "Error insert table (INSERT Table hours_type)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_hours_type);	



	
	
if ($valid) {
	
	sqlsrv_close( $conn);	
	returnData();	
}
 
function returnData(){
	$returnData = array(
	'status' => 'SUCCESS',	
	'message' => 'Insert Successfully');

	echo json_encode($returnData);
}

function returnError($error_message){	
	
	$returnData = array(
	'status' => 'ERROR',
	'message' => $error_message);	
	echo json_encode($returnData);
	exit();
}
 
?>