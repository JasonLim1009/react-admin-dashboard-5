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
$ast_cri_cri_factor = $data['ast_cri_cri_factor'];
$ast_cri_min_delay = $data['ast_cri_min_delay'];
$ast_cri_emergency = $data['ast_cri_emergency'];
$ast_cri_disable_flag=$data['ast_cri_disable_flag'];
$ast_cri_desc = $data['ast_cri_desc'];
$audit_user = $data['audit_user'];


$sql_insert_ast_cri = "INSERT INTO ast_cri
							( 	 site_cd, 				ast_cri_cri_factor, 		ast_cri_min_delay,			ast_cri_emergency, 	
								 ast_cri_desc,			ast_cri_disable_flag,		audit_user, 				audit_date,  				
								 column1, 				column2,               		column3, 					column4, 					
								 column5 ) 
														
				VALUES (		?,						?,						    ?,					    	?,
								?,	                    ?,						    ?,							GetDate(),
								NULL,					NULL,						NULL,					    NULL,						
								NULL) ";
								
								
$params_ast_cri = array(		$site_cd, 				$ast_cri_cri_factor, 		$ast_cri_min_delay,			$ast_cri_emergency, 	
								$ast_cri_desc,			$ast_cri_disable_flag,		$audit_user);
								
$stmt_ast_cri = sqlsrv_query( $conn, $sql_insert_ast_cri,$params_ast_cri);		
if( !$stmt_ast_cri ) {
	$error_message = "Error insert table (INSERT Table ast_cri)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_ast_cri);	



	
	
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