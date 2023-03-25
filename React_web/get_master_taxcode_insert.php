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
$tax_mst_type = $data['tax_mst_type'];
$tax_mst_tax_cd = $data['tax_mst_tax_cd'];
$tax_mst_desc = $data['tax_mst_desc'];
$tax_mst_tax_rate = $data['tax_mst_tax_rate'];
$tax_mst_disable_flag = $data['tax_mst_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_tax_mst = "INSERT INTO tax_mst
						( 		site_cd, 				tax_mst_type,				tax_mst_tax_cd, 		tax_mst_desc, 			 
								tax_mst_tax_rate,		tax_mst_disable_flag,		audit_user, 			audit_date,    					
								column1,				column2,					column3,				column4, 				
								column5 ) 
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						GetDate(),									
								NULL,					NULL,				NULL,					NULL,  					
								NULL) ";
												
							
								
								
$params_tax_mst = array(		$site_cd,				$tax_mst_type,			$tax_mst_tax_cd,			$tax_mst_desc,			
								$tax_mst_tax_rate,		$tax_mst_disable_flag,	$audit_user,	);	
								
$stmt_tax_mst = sqlsrv_query( $conn, $sql_insert_tax_mst,$params_tax_mst);	
if( !$stmt_tax_mst ) {
	$error_message = "Error insert table (INSERT Table tax_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_tax_mst);	



	
	
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