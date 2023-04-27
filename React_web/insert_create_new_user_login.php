<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once ('config.php');


/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}

$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json, true);

//echo json_encode($data);;


$empl_id = $data['empl_id'];
$default_site = $data['default_site'];
$name = $data['name'];
$default_language = $data['default_language'];
$status = $data['status'];
$sys_admin = $data['sys_admin'];
$last_pwd_changed = $data['last_pwd_changed'];

$cf_user_failed_attempt = $data['cf_user_failed_attempt'];
$cf_user_locked = $data['cf_user_locked'];
$cf_user_disable_auto_logout = $data['cf_user_disable_auto_logout'];


$audit_user = $data['audit_user'];
$emp_mst_create_by = $data['ast_mst_create_by'];
$ast_aud_originator = $data['ast_aud_originator'];
$emp_mst_create_date = $data['emp_mst_create_date'];

//STEP-01
$sql_insert_cf_user = "	INSERT INTO cf_user ( 
										empl_id,						supv_empl_id,		default_site,				name, 
										default_language,				status,				work_grp,					shift,
										work_area,						sys_admin,			last_login_site,			last_login,
										last_pwd_changed,				expired_date,		cf_user_failed_attempt,		cf_user_locked, 
										cf_user_disable_auto_logout,	audit_user,			audit_date,					column1, 
										column2,						column3,			column4,					column5 ) 
							
							VALUES (	?,								NULL,				?,							?, 
										?,								?,					NULL,						NULL, 
										NULL,							?,					NULL,						NULL, 
										?,								NULL,				?,							?,
										?,								?,					GetDate(),					NULL, 
										NULL,							NULL,				NULL,						NULL )";
								
								
$params_cf_user = array(				$empl_id,											$default_site,				$name,	
										$default_language,				$status,				 
																		$sys_admin,						
										$last_pwd_changed,									$cf_user_failed_attempt,	$cf_user_locked, 
										$cf_user_disable_auto_logout,	$audit_user			);
								
				
$stmt_cf_user = sqlsrv_query( $conn,	$sql_insert_cf_user,	$params_cf_user);	

if( !$stmt_cf_user ) {
	$error_message = "Error insert table (INSERT Table cf_user)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
sqlsrv_free_stmt($stmt_cf_user);








	
if($stmt_cf_user ){
	 
	 sqlsrv_commit( $conn );
	 sqlsrv_close( $conn);	
	 returnData($ROW_ID,$empl_id);
	 
 }else{
	sqlsrv_rollback( $conn );
	$error_message = "Transaction rolled back.<br />";
	returnError($error_message);
 }
 
 
	
function returnData($ROW_ID,$empl_id){
	
	$returnData = array(
	'status' => 'SUCCESS',
	'ROW_ID'=>	$ROW_ID,
	'message' => 'Employee Number : ' .$empl_id . ' created successfully');
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