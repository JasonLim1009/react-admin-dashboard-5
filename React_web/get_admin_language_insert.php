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
$descs = $data['descs'];
$audit_user = $data['audit_user'];


$sql_insert_cf_language = "INSERT INTO cf_language
						( 		language_cd, 			descs, 					audit_user, 			audit_date,					
								column1,				column2,				column3,				column4, 
								column5 )	
								 
									
									
				VALUES (		?,						?,					?,				GetDate(),
								NULL,					NULL,				NULL,			NULL,
								NULL) ";				
									
							
								
								
$params_cf_language = array(		$language_cd,		$descs,		$audit_user,	);	
							
								
$stmt_cf_language = sqlsrv_query( $conn, $sql_insert_cf_language,$params_cf_language);	
if( !$stmt_cf_language ) {
	$error_message = "Error insert table (INSERT Table cf_language)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_cf_language);	



	
	
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