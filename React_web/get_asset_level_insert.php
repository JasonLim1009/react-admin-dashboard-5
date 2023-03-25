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
$ast_lvl_ast_lvl = $data['ast_lvl_ast_lvl'];
$ast_lvl_desc = $data['ast_lvl_desc'];
$ast_lvl_disable_flag = $data['ast_lvl_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_ast_lvl = "INSERT INTO ast_lvl
							( 	 site_cd, 				ast_lvl_ast_lvl, 		ast_lvl_desc,			ast_lvl_disable_flag, 	
					 			 audit_user, 			audit_date,  			column1, 				column2,               
								 column3, 				column4, 				column5 ) 
														
				VALUES (		?,						?,						?,					    ?,
								?,	                    GetDate(),			    NULL,					NULL,					
								NULL,					NULL,					NULL) ";
								
								
$params_ast_lvl = array(		$site_cd, 				$ast_lvl_ast_lvl, 		$ast_lvl_desc,			$ast_lvl_disable_flag, 	
								$audit_user);
								
$stmt_ast_lvl = sqlsrv_query( $conn, $sql_insert_ast_lvl,$params_ast_lvl);		
if( !$stmt_ast_lvl ) {
	$error_message = "Error insert table (INSERT Table ast_lvl)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_ast_lvl);	



	
	
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