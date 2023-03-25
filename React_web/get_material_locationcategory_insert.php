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
$loc_cat_loc_cat = $data['loc_cat_loc_cat'];
$loc_cat_desc = $data['loc_cat_desc'];
$loc_cat_inc_ttloh = $data['loc_cat_inc_ttloh'];
$loc_cat_mtl_usage = $data['loc_cat_mtl_usage'];
$loc_cat_inc_ttl_val = $data['loc_cat_inc_ttl_val'];
$loc_cat_inc_rcv = $data['loc_cat_inc_rcv'];
$loc_cat_consigned = $data['loc_cat_consigned'];
$loc_cat_disable_flag = $data['loc_cat_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_loc_cat = "INSERT INTO loc_cat
						( 		site_cd, 				loc_cat_loc_cat, 			loc_cat_desc, 				loc_cat_inc_ttloh, 
								loc_cat_mtl_usage, 		loc_cat_inc_ttl_val, 		loc_cat_inc_rcv,			loc_cat_consigned,	
								loc_cat_disable_flag,	audit_user, 				audit_date,					column1,
								column2,				column3,					column4, 					column5 ) 
							
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					GetDate(),				NULL,
								NULL,					NULL,				NULL,					NULL) ";
								
												
							
								
								
$params_loc_cat = array(		$site_cd,				$loc_cat_loc_cat,			$loc_cat_desc,			$loc_cat_inc_ttloh,
								$loc_cat_mtl_usage,		$loc_cat_inc_ttl_val,		$loc_cat_inc_rcv,		$loc_cat_consigned,	
								$loc_cat_disable_flag,	$audit_user,	);	
								
$stmt_loc_cat= sqlsrv_query( $conn, $sql_insert_loc_cat,$params_loc_cat);	
if( !$stmt_loc_cat ) {
	$error_message = "Error insert table (INSERT Table cus_sts)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_loc_cat);	



	
	
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