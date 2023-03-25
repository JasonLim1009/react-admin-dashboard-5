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
$sup_sts_cat_cd = $data['sup_sts_cat_cd'];
$sup_sts_typ_cd = $data['sup_sts_typ_cd'];
$sup_sts_status = $data['sup_sts_status'];
$sup_sts_desc = $data['sup_sts_desc'];
$sup_sts_disable_flag = $data['sup_sts_disable_flag'];
$audit_user = $data['audit_user'];
$RowID = $data['RowID'];


$sql = "UPDATE sup_sts 
		SET sup_sts_cat_cd = '".$sup_sts_cat_cd."',
			sup_sts_typ_cd  = '".$sup_sts_typ_cd ."',
			sup_sts_status = '".$sup_sts_status."',
			sup_sts_desc = '".$sup_sts_desc."',
			sup_sts_disable_flag = '".$sup_sts_disable_flag."',
			audit_date= GETDATE()			
		WHERE site_cd ='".$site_cd."' 		
		AND RowID = '".$RowID."'";
		
	//echo $sql;
	
	$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "Error update table (UPDATE sup_sts)";
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