<?php
// get these values from your DB.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once('config.php');
$error_message;
$valid = true;


$site_cd = $_REQUEST['site_cd'];
$RowID = $_REQUEST['RowID'];




$sql= "	DELETE 	  
		FROM 	wrk_dcd
		WHERE 	wrk_dcd.site_cd = '".$site_cd."'
		and 	wrk_dcd.RowID='".$RowID."'";

	$stmt_wrk_dcd = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_dcd ) {
		 $error_message = "Error selecting table (wrk_dcd Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

sqlsrv_free_stmt( $stmt_wrk_dcd);
	
	

if ($valid) {
	
	sqlsrv_close( $conn);	
	returnData();	
}
 
function returnData(){
	$returnData = array(
	'status' => 'SUCCESS',	
	'message' => 'Deleted Successfully');

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