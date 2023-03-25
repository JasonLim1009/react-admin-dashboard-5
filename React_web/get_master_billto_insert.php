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
$sup_bil_billto = $data['sup_bil_billto'];
$sup_bil_address1 = $data['sup_bil_address1'];
$sup_bil_address2 = $data['sup_bil_address2'];
$sup_bil_city = $data['sup_bil_city'];
$sup_bil_state = $data['sup_bil_state'];
$sup_bil_postal_code = $data['sup_bil_postal_code'];
$sup_bil_country = $data['sup_bil_country'];
$sup_bil_phone = $data['sup_bil_phone'];
$sup_bil_contact = $data['sup_bil_contact'];
$sup_bil_province = $data['sup_bil_province'];
$sup_bil_note = $data['sup_bil_note'];
$sup_bil_disable_flag = $data['sup_bil_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_sup_bil = "INSERT INTO sup_bil
						( 		site_cd, 				sup_bil_billto, 			sup_bil_address1, 			sup_bil_address2, 
								sup_bil_city,			sup_bil_state,				sup_bil_postal_code,   		sup_bil_country,
								sup_bil_phone,			sup_bil_contact,			sup_bil_province,			sup_bil_note,
								sup_bil_disable_flag,	audit_user, 				audit_date,     			column1,
								column2,				column3,					column4, 					column5 )
							 
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					GetDate(),				NULL,
								NULL,					NULL,				NULL,  					NULL) ";	
							
												
							
								
								
$params_sup_bil = array(		$site_cd,				$sup_bil_billto,			$sup_bil_address1,			$sup_bil_address2,
								$sup_bil_city,			$sup_bil_state,				$sup_bil_postal_code,		$sup_bil_country,	
								$sup_bil_phone,			$sup_bil_contact,			$sup_bil_province,			$sup_bil_note,
								$sup_bil_disable_flag,	$audit_user,	);	
								
$stmt_sup_bil = sqlsrv_query( $conn, $sql_insert_sup_bil,$params_sup_bil);	
if( !$stmt_sup_bil ) {
	$error_message = "Error insert table (INSERT Table sup_bil)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_sup_bil);	



	
	
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