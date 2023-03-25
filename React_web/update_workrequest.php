<?php

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



$json = file_get_contents('php://input');
// Converts it into a PHP object
$data = json_decode($json, true);

$site_cd = $data['site_cd'];
//$wkr_mst_temp_asset = $data['wkr_mst_temp_asset'];
//$wkr_mst_email_notification = $data['wkr_mst_email_notification'];
$wkr_mst_assetno = $data['wkr_mst_assetno'];
$wkr_mst_work_area = $data['wkr_mst_work_area'];
$wkr_mst_chg_costcenter = $data['wkr_mst_chg_costcenter'];
$wkr_mst_assetlocn = $data['wkr_mst_assetlocn'];
$wkr_mst_orig_priority = $data['wkr_mst_orig_priority'];
$wkr_mst_location = $data['wkr_mst_location'];
$wkr_mst_org_date = $data['wkr_mst_org_date'];
$wkr_mst_work_type = $data['wkr_mst_work_type'];
$wkr_mst_due_date = $data['wkr_mst_due_date'];
$wkr_mst_work_class = $data['wkr_mst_work_class'];
$wkr_mst_originator = $data['wkr_mst_originator'];
$wkr_mst_work_group = $data['wkr_mst_work_group'];
$wkr_mst_phone = $data['wkr_mst_phone'];
$wkr_mst_projectid = $data['wkr_mst_projectid'];
$wkr_mst_fault_code = $data['wkr_mst_fault_code'];
$wkr_mst_wr_descs = $data['wkr_mst_wr_descs'];

$wkr_det_note1 = $data['wkr_det_note1'];
$wkr_det_note2 = $data['wkr_det_note2'];

$wkr_det_varchar1 = $data['wkr_det_varchar1'];
$wkr_det_varchar2 = $data['wkr_det_varchar2'];
$wkr_det_varchar3 = $data['wkr_det_varchar3'];
$wkr_det_varchar4 = $data['wkr_det_varchar4'];
$wkr_det_varchar5 = $data['wkr_det_varchar5'];
$wkr_det_varchar6 = $data['wkr_det_varchar6'];
$wkr_det_varchar7 = $data['wkr_det_varchar7'];
$wkr_det_varchar8 = $data['wkr_det_varchar8'];
$wkr_det_varchar9 = $data['wkr_det_varchar9'];
$wkr_det_varchar10 = $data['wkr_det_varchar10'];
$wkr_det_varchar11 = $data['wkr_det_varchar11'];
$wkr_det_varchar12 = $data['wkr_det_varchar12'];
$wkr_det_varchar13 = $data['wkr_det_varchar13'];
$wkr_det_varchar14 = $data['wkr_det_varchar14'];
$wkr_det_varchar15 = $data['wkr_det_varchar15'];
$wkr_det_varchar16 = $data['wkr_det_varchar16'];
$wkr_det_varchar17 = $data['wkr_det_varchar17'];
$wkr_det_varchar18 = $data['wkr_det_varchar18'];
$wkr_det_varchar19 = $data['wkr_det_varchar19'];
$wkr_det_varchar20 = $data['wkr_det_varchar20'];

$wkr_det_numeric1 = $data['wkr_det_numeric1'];
$wkr_det_numeric2 = $data['wkr_det_numeric2'];
$wkr_det_numeric3 = $data['wkr_det_numeric3'];
$wkr_det_numeric4 = $data['wkr_det_numeric4'];
$wkr_det_numeric5 = $data['wkr_det_numeric5'];
$wkr_det_numeric6 = $data['wkr_det_numeric6'];
$wkr_det_numeric7 = $data['wkr_det_numeric7'];
$wkr_det_numeric8 = $data['wkr_det_numeric8'];
$wkr_det_numeric9 = $data['wkr_det_numeric9'];
$wkr_det_numeric10 = $data['wkr_det_numeric10'];

$wkr_det_datetime1 = $data['wkr_det_datetime1'];
$wkr_det_datetime2 = $data['wkr_det_datetime2'];
$wkr_det_datetime3 = $data['wkr_det_datetime3'];
$wkr_det_datetime4 = $data['wkr_det_datetime4'];
$wkr_det_datetime5 = $data['wkr_det_datetime5'];
$wkr_det_datetime6 = $data['wkr_det_datetime6'];
$wkr_det_datetime7 = $data['wkr_det_datetime7'];
$wkr_det_datetime8 = $data['wkr_det_datetime8'];
$wkr_det_datetime9 = $data['wkr_det_datetime9'];
$wkr_det_datetime10 = $data['wkr_det_datetime10'];



$audit_user = $data['audit_user'];
$wkr_mst_create_by = $data['wkr_mst_create_by'];
$wkr_mst_create_date = $data['wkr_mst_create_date'];

$ast_aud_originator = $data['ast_aud_originator'];

$RowID = $data['RowID'];
 

		

//step-01
$sql_wkr_mst = "UPDATE	wkr_mst 
				SET		wkr_mst_assetno = '".$wkr_mst_assetno."',	
						wkr_mst_work_area = '".$wkr_mst_work_area."',	
						wkr_mst_chg_costcenter = '".$wkr_mst_chg_costcenter."',	
						wkr_mst_assetlocn = '".$wkr_mst_assetlocn."',	
						wkr_mst_orig_priority = '".$wkr_mst_orig_priority."',	
						wkr_mst_location = '".$wkr_mst_location."',	
						wkr_mst_org_date = '".$wkr_mst_org_date."',	
						wkr_mst_work_type = '".$wkr_mst_work_type."',	
						wkr_mst_due_date = '".$wkr_mst_due_date."',	
						wkr_mst_work_class = '".$wkr_mst_work_class."',	
						wkr_mst_originator = '".$wkr_mst_originator."',	
						wkr_mst_work_group = '".$wkr_mst_work_group."',	
						wkr_mst_phone = '".$wkr_mst_phone."',	
						wkr_mst_projectid = '".$wkr_mst_projectid."',	
						wkr_mst_fault_code = '".$wkr_mst_fault_code."',	
						wkr_mst_wr_descs = '".$wkr_mst_wr_descs."',	
						
						audit_user = '".$audit_user."', 
						audit_date = GETDATE()	
				WHERE	site_cd = '".$site_cd."'
				AND 	RowID = '".$RowID."'";
	
	
	$stmt_wkr_mst = sqlsrv_query( $conn, $sql_wkr_mst);	
		
if( !$stmt_wkr_mst ) {
	$error_message = "Error update table (UPDATE wkr_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_wkr_mst);




//step-02
$sql_wkr_det = "UPDATE	wkr_det 
				SET		
						wkr_det_note1 = '".$wkr_det_note1."',
						wkr_det_note2 = '".$wkr_det_note2."',
						wkr_det_varchar1 = '".$wkr_det_varchar1."',
						wkr_det_varchar2 = '".$wkr_det_varchar2."',
						wkr_det_varchar3 = '".$wkr_det_varchar3."',
						wkr_det_varchar4 = '".$wkr_det_varchar4."',
						wkr_det_varchar5 = '".$wkr_det_varchar5."',
						wkr_det_varchar6 = '".$wkr_det_varchar6."',
						wkr_det_varchar7 = '".$wkr_det_varchar7."',
						wkr_det_varchar8 = '".$wkr_det_varchar8."',
						wkr_det_varchar9 = '".$wkr_det_varchar9."',
						wkr_det_varchar10 = '".$wkr_det_varchar10."',
						wkr_det_varchar11 = '".$wkr_det_varchar11."',
						wkr_det_varchar12 = '".$wkr_det_varchar12."',
						wkr_det_varchar13 = '".$wkr_det_varchar13."',
						wkr_det_varchar14 = '".$wkr_det_varchar14."',
						wkr_det_varchar15 = '".$wkr_det_varchar15."',
						wkr_det_varchar16 = '".$wkr_det_varchar16."',
						wkr_det_varchar17 = '".$wkr_det_varchar17."',
						wkr_det_varchar18 = '".$wkr_det_varchar18."',
						wkr_det_varchar19 = '".$wkr_det_varchar19."',
						wkr_det_varchar20 = '".$wkr_det_varchar20."',
						wkr_det_numeric1 = '".$wkr_det_numeric1."',
						wkr_det_numeric2 = '".$wkr_det_numeric2."',
						wkr_det_numeric3 = '".$wkr_det_numeric3."',
						wkr_det_numeric4 = '".$wkr_det_numeric4."',
						wkr_det_numeric5 = '".$wkr_det_numeric5."',
						wkr_det_numeric6 = '".$wkr_det_numeric6."',
						wkr_det_numeric7 = '".$wkr_det_numeric7."',
						wkr_det_numeric8 = '".$wkr_det_numeric8."',
						wkr_det_numeric9 = '".$wkr_det_numeric9."',
						wkr_det_numeric10 = '".$wkr_det_numeric10."',
						wkr_det_datetime1 = '".$wkr_det_datetime1."',
						wkr_det_datetime2 = '".$wkr_det_datetime2."',
						wkr_det_datetime3 = '".$wkr_det_datetime3."',
						wkr_det_datetime4 = '".$wkr_det_datetime4."',
						wkr_det_datetime5 = '".$wkr_det_datetime5."',
						wkr_det_datetime6 = '".$wkr_det_datetime6."',
						wkr_det_datetime7 = '".$wkr_det_datetime7."',
						wkr_det_datetime8 = '".$wkr_det_datetime8."',
						wkr_det_datetime9 = '".$wkr_det_datetime9."',
						wkr_det_datetime10 = '".$wkr_det_datetime10."',	
						
						audit_user = '".$audit_user."', 
						audit_date = GETDATE()	
				WHERE 	site_cd = '".$site_cd."'
				AND	 	mst_RowID = '".$RowID."'";

	
	$stmt_wkr_det = sqlsrv_query( $conn, $sql_wkr_det);	
		
if( !$stmt_wkr_det ) {
	$error_message = "Error update table (UPDATE wkr_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_wkr_det);





 
if ($valid && $stmt_wkr_mst && $stmt_wkr_det ) {
	
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