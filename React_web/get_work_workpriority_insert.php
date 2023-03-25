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
$wrk_pri_pri_cd = $data['wrk_pri_pri_cd'];
$wrk_pri_desc = $data['wrk_pri_desc'];
$wrk_pri_due_date_count = $data['wrk_pri_due_date_count'];
$wrk_pri_disable_flag = $data['wrk_pri_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_wrk_pri = "INSERT INTO wrk_pri
						( 		site_cd, 				wrk_pri_pri_cd, 			wrk_pri_desc, 			wrk_pri_due_date_count, 
								wrk_pri_disable_flag, 	audit_user, 				audit_date,             column1,											
			 					column2,				column3,					column4, 				column5 ) 
									
									
				VALUES (		?,						?,						?,							?,
								?,						?,						GetDate(),					NULL,		
								NULL,					NULL,					NULL,  						NULL) ";
												
							
								
								
$params_wrk_pri = array(		$site_cd,				$wrk_pri_pri_cd,			$wrk_pri_desc,			$wrk_pri_due_date_count,
								$wrk_pri_disable_flag,	$audit_user	);	
								
$stmt_wrk_pri = sqlsrv_query( $conn, $sql_insert_wrk_pri,$params_wrk_pri);	
if( !$stmt_wrk_pri ) {
	$error_message = "Error insert table (INSERT Table wrk_pri)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_wrk_pri);	



	
	
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