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
$pur_sts_status = $data['pur_sts_status'];
$pur_sts_description = $data['pur_sts_description'];
$pur_sts_status_type = $data['pur_sts_status_type'];
$pur_sts_email_flag = $data['pur_sts_email_flag'];
$pur_sts_disable_flag = $data['pur_sts_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_pur_sts = "INSERT INTO pur_sts
						( 		site_cd, 				pur_sts_status, 			pur_sts_description, 			pur_sts_status_type,
								pur_sts_email_flag, 	pur_sts_disable_flag,		audit_user, 					audit_date,
								column1,				column2,					column3,						column4,	
				 				column5 ) 
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						GetDate(),	
								NULL,				NULL,				NULL,					NULL,										
								NULL) ";
												
							
								
								
$params_pur_sts = array(		$site_cd,				$pur_sts_st_cat,			$pur_sts_status,			$pur_sts_description,
								$pur_sts_status_type,	$pur_sts_email_flag,		$pur_sts_disable_flag,		$audit_user,	);	
								
$stmt_pur_sts = sqlsrv_query( $conn, $sql_insert_pur_sts,$params_pur_sts);	
if( !$stmt_pur_sts ) {
	$error_message = "Error insert table (INSERT Table pur_sts)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_pur_sts);	



	
	
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