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
$sup_shi_shipto = $data['sup_shi_shipto'];
$sup_shi_address1 = $data['sup_shi_address1'];
$sup_shi_address2 = $data['sup_shi_address2'];
$sup_shi_city = $data['sup_shi_city'];
$sup_shi_state = $data['sup_shi_state'];
$sup_shi_postal_code = $data['sup_shi_postal_code'];
$sup_shi_country = $data['sup_shi_country'];
$sup_shi_phone = $data['sup_shi_phone'];
$sup_shi_contact = $data['sup_shi_contact'];
$sup_shi_province = $data['sup_shi_province'];
$sup_shi_note = $data['sup_shi_note'];
$sup_shi_disable_flag = $data['sup_shi_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_sup_shi = "INSERT INTO sup_shi
						( 		site_cd, 				sup_shi_shipto, 			sup_shi_address1, 			sup_shi_address2, 
								sup_shi_city,			sup_shi_state,				sup_shi_postal_code,   		sup_shi_country,
								sup_shi_phone,			sup_shi_contact,			sup_shi_province,			sup_shi_note,
								sup_shi_disable_flag,	audit_user, 				audit_date,     			column1,
								column2,					column3,					column4, 		
								column5 ) 
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					GetDate(),				NULL,
								NULL,					NULL,				NULL,  					NULL) ";
								
												
							
								
								
		$params_sup_shi = array($site_cd,				$sup_shi_shipto,			$sup_shi_address1,			$sup_shi_address2,
								$sup_shi_city,			$sup_shi_state,				$sup_shi_postal_code,		$sup_shi_country,	
								$sup_shi_phone,			$sup_shi_contact,			$sup_shi_province,			$sup_shi_note,
								$sup_shi_disable_flag,	$audit_user,	);	
								
$stmt_sup_shi = sqlsrv_query( $conn, $sql_insert_sup_shi,$params_sup_shi);	
if( !$stmt_sup_shi ) {
	$error_message = "Error insert table (INSERT Table sup_bil)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_sup_shi);	



	
	
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