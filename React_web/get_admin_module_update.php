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
$RowID = $data['RowID'];


$sql = "UPDATE cf_module 
		SET language_cd = '".$language_cd."',
			cf_module_module_cd  = '".$cf_module_module_cd ."',
			cf_module_desc  = '".$cf_module_desc ."',
			ico_name  = '".$ico_name ."',
			cf_module_seq  = '".$cf_module_seq ."',
			audit_date= GETDATE()			
		WHERE  RowID = '".$RowID."'";
		
	//echo $sql;
	
	$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "Error update table (UPDATE cf_module)";
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