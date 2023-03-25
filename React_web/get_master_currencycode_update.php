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
$cur_mst_cur_code = $data['cur_mst_cur_code'];
$cur_mst_desc = $data['cur_mst_desc'];
$cur_mst_exchange_rate = $data['cur_mst_exchange_rate'];
$cur_mst_label = $data['cur_mst_label'];
$cur_mst_format_string = $data['cur_mst_format_string'];
$cur_mst_exchange_rate_date = $data['cur_mst_exchange_rate_date'];
$audit_user = $data['audit_user'];
$RowID = $data['RowID'];


$sql = "UPDATE cur_mst 
		SET cur_mst_cur_code = '".$cur_mst_cur_code."',
			cur_mst_desc  = '".$cur_mst_desc ."',
			cur_mst_exchange_rate = '".$cur_mst_exchange_rate."',
			cur_mst_label = '".$cur_mst_label."',
			cur_mst_format_string = '".$cur_mst_format_string."',
			cur_mst_exchange_rate_date = '".$cur_mst_exchange_rate_date."',
			audit_date= GETDATE()			
		WHERE site_cd ='".$site_cd."' 		
		AND RowID = '".$RowID."'";
		
	//echo $sql;
	
	$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "Error update table (UPDATE cur_mst)";
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