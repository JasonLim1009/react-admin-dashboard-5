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
$uom_mst_type = $data['uom_mst_type'];
$uom_mst_uom = $data['uom_mst_uom'];
$uom_mst_desc = $data['uom_mst_desc'];
$uom_mst_disable_flag = $data['uom_mst_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_uom_mst = "INSERT INTO uom_mst
						( 		site_cd, 				uom_mst_type, 			uom_mst_uom, 			uom_mst_desc, 
								uom_mst_disable_flag,	audit_user, 			audit_date,     		column1,		
								column2,				column3,				column4, 				column5 ) 
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					GetDate(),				NULL,					
								NULL,					NULL,				NULL,  					NULL) ";
												
							
								
								
$params_uom_mst = array(		$site_cd,				$uom_mst_type,			$uom_mst_uom,			$uom_mst_desc,
									$uom_mst_disable_flag,  $audit_user,	);	
								
$stmt_uom_mst = sqlsrv_query( $conn, $sql_insert_uom_mst,$params_uom_mst);	
if( !$stmt_uom_mst ) {
	$error_message = "Error insert table (INSERT Table uom_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_uom_mst);	



	
	
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