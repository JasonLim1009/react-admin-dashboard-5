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
$uom_con_from_uom = $data['uom_con_from_uom'];
$uom_con_to_uom = $data['uom_con_to_uom'];
$uom_con_factor = $data['uom_con_factor'];
$audit_user = $data['audit_user'];


$sql_insert_uom_con = "INSERT INTO uom_con
						( 		site_cd, 				uom_con_from_uom, 			uom_con_to_uom, 			uom_con_factor, 
								audit_user, 			audit_date,             column1,		column2,					
								column3,				column4, 				column5 ) 
									
									
				VALUES (		?,						?,					?,						?,
								?,						GetDate(),			NULL,					NULL,					
								NULL,					NULL,  				NULL) ";
												
							
								
								
$params_uom_con = array(	$site_cd,				$uom_con_from_uom,			$uom_con_to_uom,			$uom_con_factor,
								$audit_user,	);	
								
$stmt_uom_con = sqlsrv_query( $conn, $sql_insert_uom_con,$params_uom_con);	
if( !$stmt_uom_con ) {
	$error_message = "Error insert table (INSERT Table uom_con)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_uom_con);	



	
	
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