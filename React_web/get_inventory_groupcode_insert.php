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
$ast_grp_grp_cd  = $data['ast_grp_grp_cd '];
$ast_grp_desc = $data['ast_grp_desc'];
$ast_grp_disable_flag = $data['ast_grp_disable_flag'];
$ast_grp_counter = $data['ast_grp_counter'];
$ast_grp_serial = $data['ast_grp_serial'];
$ast_grp_separator = $data['ast_grp_separator'];
$ast_grp_option = $data['ast_grp_option'];
$audit_user = $data['audit_user'];


$sql_insert_ast_grp = "INSERT INTO ast_grp
						( 		site_cd, 				ast_grp_grp_cd, 			ast_grp_desc, 			ast_grp_disable_flag, 
								ast_grp_counter,        audit_user, 			    audit_date, 			column1, 					
								column2,                column3, 				    column4, 				column5 ) 
												
				VALUES (		?,						?,						?,					    ?,
								?,						?,                      GetDate(),				NULL,						
								NULL,                   NULL,					NULL,					NULL) ";
								
								
$params_ast_grp = array(		$site_cd,				$ast_grp_grp_cd,			$ast_grp_desc,			$ast_grp_disable_flag,   $ast_grp_counter,
								$audit_user);	
								
$stmt_ast_grp = sqlsrv_query( $conn, $sql_insert_ast_grp,$params_ast_grp);	
if( !$stmt_ast_grp ) {
	$error_message = "Error insert table (INSERT Table ast_grp)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_ast_grp);	



	
	
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