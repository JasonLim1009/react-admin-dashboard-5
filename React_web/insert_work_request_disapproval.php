<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);
require_once('config.php');
//require_once('send_notification.php');
//require_once('f_insert_notification_log.php');
//require_once('find_online_tablet.php');

/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}

$insert_ntf = false;
$error_message;
$valid = true;

$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json, true);

$site_cd = $data['site_cd'];
$EmpID = $data['EmpID'];
$EmpName = $data['EmpName'];
$RowID = $data['RowID'];
$dis_Dec = $data['wkr_det_reject_desc'];
$LOGINID = $data['LOGINID'];


$sql = " update wkr_mst 
			SET wkr_mst_wr_status ='D' ,
				audit_user =?, 
				audit_date =getDate() 
		WHERE 	RowID =?";
		
$params_wkr_mst = array($LOGINID,$RowID);		
$stmt_wkr_mst = sqlsrv_query( $conn, $sql,$params_wkr_mst);	
		
if( !$stmt_wkr_mst ) {
	$error_message = "Error update table (wkr_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt_wkr_mst, SQLSRV_FETCH_ASSOC)) {
	 
	 $emp_det_wo_approval_limit = $row['emp_det_wo_approval_limit'];
	
	 	 
   }
} while ( sqlsrv_next_result($stmt_wkr_mst));
sqlsrv_free_stmt($stmt_wkr_mst);



$sql = " update wkr_det 
		SET 	wkr_det_reject_by =? ,
				wkr_det_reject_date = getDate() , 
				wkr_det_reject_desc =?, 
				audit_user =?, 
				audit_date =getDate() 
				WHERE mst_RowID =?";	
$params_wkr_det = array($LOGINID,$dis_Dec, $LOGINID,$RowID);		
$stmt_wkr_det = sqlsrv_query( $conn, $sql,$params_wkr_det );	
		
if( !$stmt_wkr_det ) {
	$error_message = "Error update table (wkr_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt_wkr_det, SQLSRV_FETCH_ASSOC)) {
	 
	 $emp_det_wo_approval_limit = $row['emp_det_wo_approval_limit'];
	
	 	 
   }
} while ( sqlsrv_next_result($stmt_wkr_det));
sqlsrv_free_stmt($stmt_wkr_det);



if($stmt_wkr_mst && $stmt_wkr_det){
	
	 sqlsrv_commit( $conn );
	 sqlsrv_close( $conn);	
	 returnData();
}else{
	 sqlsrv_rollback( $conn );
	 $error_message = "Transaction rolled back.<br />";
	 returnError($error_message);
}
		
 
 
function returnData(){
	$returnData = array(
	'status' => 'SUCCESS',
	'message' => 'Work Request Disapproved');
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