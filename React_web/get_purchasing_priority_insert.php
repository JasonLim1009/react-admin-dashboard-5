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
$puo_pri_pri_cd = $data['puo_pri_pri_cd'];
$puo_pri_desc = $data['puo_pri_desc'];
$puo_pri_disable_flag = $data['puo_pri_disable_flag'];
$puo_pri_req_date_count = $data['puo_pri_req_date_count'];
$audit_user = $data['audit_user'];


$sql_insert_puo_pri = "INSERT INTO puo_pri
						( 		site_cd, 				puo_pri_pri_cd, 		puo_pri_desc, 			puo_pri_disable_flag, 
								puo_pri_req_date_count,	audit_user, 			audit_date,     		column1,		
								column2,				column3,				column4, 				column5 ) 
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					GetDate(),				NULL,					
								NULL,					NULL,				NULL,  					NULL) ";
												
							
								
								
$params_puo_pri = array(		$site_cd,				  $puo_pri_pri_cd,			$puo_pri_desc,			$puo_pri_disable_flag,
								$puo_pri_req_date_count,  $audit_user,	);	
								
$stmt_puo_pri= sqlsrv_query( $conn, $sql_insert_puo_pri,$params_puo_pri);	
if( !$stmt_puo_pri ) {
	$error_message = "Error insert table (INSERT Table puo_pri)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_puo_pri);	



	
	
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