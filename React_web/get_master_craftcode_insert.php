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
$crf_mst_crf_cd = $data['crf_mst_crf_cd'];
$crf_mst_desc = $data['crf_mst_desc'];
$crf_mst_crf_est_rate = $data['crf_mst_crf_est_rate'];
$crf_mst_change_date = $data['crf_mst_change_date'];
$crf_mst_disable_flag = $data['crf_mst_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_crf_mst = "INSERT INTO crf_mst
						( 		site_cd, 				crf_mst_crf_cd, 			crf_mst_desc, 			crf_mst_crf_est_rate, 
								crf_mst_change_date,	 	crf_mst_disable_flag,	audit_user, 			audit_date,             											
			 					column1,				column2,					column3,				column4, 					
								column5 ) 
									
									
				VALUES (		?,						?,						?,							?,
								?,						?,						?,							GetDate(),				
								NULL,					NULL,					NULL,						NULL,  					
								NULL) ";
												
							
								
								
$params_crf_mst = array(		$site_cd,				$crf_mst_crf_cd,			$crf_mst_desc,			$crf_mst_crf_est_rate,
								$crf_mst_change_date,	$crf_mst_disable_flag,		$audit_user,	);	
								
$stmt_crf_mst = sqlsrv_query( $conn, $sql_insert_crf_mst,$params_crf_mst);	
if( !$stmt_crf_mst ) {
	$error_message = "Error insert table (INSERT Table crf_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_crf_mst);	



	
	
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