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



$empl_id = $data['empl_id'];
$name = $data['name'];
$sys_admin = $data['sys_admin'];
$cf_user_locked = $data['cf_user_locked'];
$cf_user_failed_attempt = $data['cf_user_failed_attempt'];
$last_login = $data['last_login'];
$last_pwd_changed = $data['last_pwd_changed'];
$expired_date = $data['expired_date'];
$default_site = $data['default_site'];
$default_language = $data['default_language'];
$audit_user = $data['audit_user'];
$RowID = $data['RowID'];


$sql = "UPDATE cf_user 
		SET empl_id = '".$empl_id."',
			name  = '".$name ."',
			sys_admin  = '".$sys_admin ."',
			cf_user_locked  = '".$cf_user_locked ."',
			cf_user_failed_attempt  = '".$cf_user_failed_attempt ."',
			last_login  = '".$last_login ."',
			last_pwd_changed  = '".$last_pwd_changed ."',
			expired_date  = '".$expired_date ."',
			default_site  = '".$default_site ."',
			default_language  = '".$default_language ."',
			audit_date= GETDATE()			
		WHERE  RowID = '".$RowID."'";
		
	//echo $sql;
	
	$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "Error update table (UPDATE cf_user)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt);
	
	
if ($valid) {
	
	sqlsrv_close( $conn);	
	returnData();	
}
 
function returnData(){
	$returnData = array(
	'status' => 'SUCCESS',	
	'message' => 'Update Successfully');

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