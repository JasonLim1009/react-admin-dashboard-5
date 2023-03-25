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




$language_cd = $data['language_cd'];
$cf_module_module_cd = $data['cf_module_module_cd'];
$cf_module_desc = $data['cf_module_desc'];
$ico_name = $data['ico_name'];
$cf_module_seq = $data['cf_module_seq'];
$audit_user = $data['audit_user'];


$sql_insert_cf_module = "INSERT INTO cf_module
						( 		language_cd, 			cf_module_module_cd, 	cf_module_desc,		ico_name,
								cf_module_seq,			audit_user, 			audit_date	)
									
								 
									
				VALUES (		?,						?,					?,				?,
								?,					?,				GetDate()) ";				
												
									
							
								
								
$params_cf_module = array(		$language_cd,		$cf_module_module_cd,		$cf_module_desc,		$ico_name,
								$cf_module_seq,		$audit_user	);	
							
								
$stmt_cf_module = sqlsrv_query( $conn, $sql_insert_cf_module,$params_cf_module);	
if( !$stmt_cf_module ) {
	$error_message = "Error insert table (INSERT Table cf_module)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_cf_module);	



	
	
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