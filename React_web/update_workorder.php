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
$wko_mst_wo_no = $data['wko_mst_wo_no'];
$wko_mst_assetno = $data['wko_mst_assetno'];
$wko_mst_status = $data['wko_mst_status'];
$wko_mst_asset_status = $data['wko_mst_asset_status'];
$wko_mst_plan_priority = $data['wko_mst_plan_priority'];
$wko_mst_asset_group_code = $data['wko_mst_asset_group_code'];
$wko_mst_org_date = $data['wko_mst_org_date'];
$wko_mst_chg_costcenter = $data['wko_mst_chg_costcenter'];
$wko_mst_due_date = $data['wko_mst_due_date'];
$wko_mst_work_area = $data['wko_mst_work_area'];
$wko_mst_originator = $data['wko_mst_originator'];
$wko_mst_asset_level = $data['wko_mst_asset_level'];
$wko_mst_phone = $data['wko_mst_phone'];
$wko_mst_asset_location = $data['wko_mst_asset_location'];
$wko_mst_flt_code = $data['wko_mst_flt_code'];
$wko_mst_descs = $data['wko_mst_descs'];

$wko_det_corr_action = $data['wko_det_corr_action'];
$wko_mst_project_id = $data['wko_mst_project_id'];
$wko_mst_orig_priority = $data['wko_mst_orig_priority'];
$wko_det_cause_code = $data['wko_det_cause_code'];
$wko_det_sched_date = $data['wko_det_sched_date'];
$wko_det_act_code = $data['wko_det_act_code'];
$wko_det_exc_date = $data['wko_det_exc_date'];
$wko_det_delay_cd = $data['wko_det_delay_cd'];
$wko_det_sc_date = $data['wko_det_sc_date'];
$wko_det_work_type = $data['wko_det_work_type'];
$wko_det_cmpl_date = $data['wko_det_cmpl_date'];
$wko_det_work_class = $data['wko_det_work_class'];
$wko_det_clo_date = $data['wko_det_clo_date'];
$wko_det_work_grp = $data['wko_det_work_grp'];
$wko_det_supv_id = $data['wko_det_supv_id'];
$wko_det_temp_asset = $data['wko_det_temp_asset'];
$wko_det_planner = $data['wko_det_planner'];
$wko_det_approved = $data['wko_det_approved'];
$wko_det_approver = $data['wko_det_approver'];
$wko_det_assign_to = $data['wko_det_assign_to'];
$wko_det_safety = $data['wko_det_safety'];
$wko_det_perm_id = $data['wko_det_perm_id'];

$wko_det_customer_cd = $data['wko_det_customer_cd'];
$wko_det_laccount = $data['wko_det_laccount'];
$wko_det_maccount = $data['wko_det_maccount'];
$wko_det_crd_costcenter = $data['wko_det_crd_costcenter'];
$wko_det_caccount = $data['wko_det_caccount'];
$wko_det_saccount = $data['wko_det_saccount'];
$wko_det_note1 = $data['wko_det_note1'];

$wko_det_varchar1 = $data['wko_det_varchar1'];
$wko_det_varchar2 = $data['wko_det_varchar2'];
$wko_det_varchar3 = $data['wko_det_varchar3'];
$wko_det_varchar4 = $data['wko_det_varchar4'];
$wko_det_varchar5 = $data['wko_det_varchar5'];
$wko_det_varchar6 = $data['wko_det_varchar6'];
$wko_det_varchar7 = $data['wko_det_varchar7'];
$wko_det_varchar8 = $data['wko_det_varchar8'];
$wko_det_varchar9 = $data['wko_det_varchar9'];
$wko_det_varchar10 = $data['wko_det_varchar10'];

$wko_det_numeric1 = $data['wko_det_numeric1'];
$wko_det_numeric2 = $data['wko_det_numeric2'];
$wko_det_numeric3 = $data['wko_det_numeric3'];
$wko_det_numeric4 = $data['wko_det_numeric4'];
$wko_det_numeric5 = $data['wko_det_numeric5'];

$wko_det_datetime1 = $data['wko_det_datetime1'];
$wko_det_datetime2 = $data['wko_det_datetime2'];
$wko_det_datetime3 = $data['wko_det_datetime3'];
$wko_det_datetime4 = $data['wko_det_datetime4'];
$wko_det_datetime5 = $data['wko_det_datetime5'];



$audit_user = $data['audit_user'];
$wko_mst_create_by = $data['wko_mst_create_by'];
$wko_mst_create_date = $data['wko_mst_create_date'];

$ast_aud_originator = $data['ast_aud_originator'];

$RowID = $data['RowID'];
 

		

//step-01
$sql_wko_mst = "UPDATE	wko_mst 
		SET		wko_mst_wo_no = '".$wko_mst_wo_no."',	
				wko_mst_assetno = '".$wko_mst_assetno."',
				
				wko_mst_status = '".$wko_mst_status."',
				wko_mst_asset_status = '".$wko_mst_asset_status."',
				wko_mst_descs = '".$wko_mst_descs."',
				wko_mst_chg_costcenter = '".$wko_mst_chg_costcenter."',
				wko_mst_org_date = '".$wko_mst_org_date."',
				wko_mst_due_date = '".$wko_mst_due_date."',
				wko_mst_originator = '".$wko_mst_originator."',
				wko_mst_flt_code = '".$wko_mst_flt_code."',

				wko_mst_phone = '".$wko_mst_phone."',
				wko_mst_project_id = '".$wko_mst_project_id."',
				wko_mst_work_area = '".$wko_mst_work_area."',
				wko_mst_asset_location = '".$wko_mst_asset_location."',
				wko_mst_asset_level = '".$wko_mst_asset_level."',
				wko_mst_asset_group_code = '".$wko_mst_asset_group_code."',
				wko_mst_orig_priority = '".$wko_mst_orig_priority."',
				wko_mst_plan_priority = '".$wko_mst_plan_priority."',	
				
				audit_user = '".$audit_user."', 
				audit_date = GETDATE()	
		WHERE	site_cd = '".$site_cd."'
		AND 	RowID = '".$RowID."'";
	
	
	$stmt_wko_mst = sqlsrv_query( $conn, $sql_wko_mst);	
		
if( !$stmt_wko_mst ) {
	$error_message = "Error update table (UPDATE wko_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_wko_mst);




//step-02
$sql_wko_det = "UPDATE	wko_det 
		SET		wko_det_cmpl_date = '".$wko_det_cmpl_date."',	
				wko_det_sc_date = '".$wko_det_sc_date."',
				wko_det_clo_date = '".$wko_det_clo_date."',	
				wko_det_approved = '".$wko_det_approved."',
				wko_det_safety	= '".$wko_det_safety."',			
				wko_det_approver = '".$wko_det_approver."',	
				wko_det_assign_to = '".$wko_det_assign_to."',	
				wko_det_planner = '".$wko_det_planner."',	
				wko_det_cause_code = '".$wko_det_cause_code."',	
				wko_det_act_code = '".$wko_det_act_code."',	
				wko_det_corr_action = '".$wko_det_corr_action."',	
				wko_det_temp_asset = '".$wko_det_temp_asset."',	
				

				wko_det_perm_id = '".$wko_det_perm_id."',	
				wko_det_work_type = '".$wko_det_work_type."',	
				wko_det_work_class = '".$wko_det_work_class."',	
				wko_det_work_grp = '".$wko_det_work_grp."',	
				wko_det_sched_date = '".$wko_det_sched_date."',	
				wko_det_exc_date = '".$wko_det_exc_date."',	
					
				wko_det_delay_cd = '".$wko_det_delay_cd."',	
				wko_det_customer_cd = '".$wko_det_customer_cd."',	
				wko_det_supv_id = '".$wko_det_supv_id."',
				wko_det_laccount = '".$wko_det_laccount."',
				wko_det_maccount = '".$wko_det_maccount."',
				wko_det_crd_costcenter = '".$wko_det_crd_costcenter."',
				wko_det_caccount = '".$wko_det_caccount."',
				wko_det_saccount = '".$wko_det_saccount."',
				wko_det_note1 = '".$wko_det_note1."',					

				wko_det_varchar1 = '".$wko_det_varchar1."',	
				wko_det_varchar2 = '".$wko_det_varchar2."',	
				wko_det_varchar3 = '".$wko_det_varchar3."',	
				wko_det_varchar4 = '".$wko_det_varchar4."',	
				wko_det_varchar5 = '".$wko_det_varchar5."',	

				wko_det_varchar6 = '".$wko_det_varchar6."',	
				wko_det_varchar7 = '".$wko_det_varchar7."',	
				wko_det_varchar8 = '".$wko_det_varchar8."',	
				wko_det_varchar9 = '".$wko_det_varchar9."',	
				wko_det_varchar10 = '".$wko_det_varchar10."',	

				wko_det_numeric1 = '".$wko_det_numeric1."',	
				wko_det_numeric2 = '".$wko_det_numeric2."',
				wko_det_numeric3 = '".$wko_det_numeric3."',
				wko_det_numeric4 = '".$wko_det_numeric4."',
				wko_det_numeric5 = '".$wko_det_numeric5."',
				
				wko_det_datetime1 = '".$wko_det_datetime1."',	
				wko_det_datetime2 = '".$wko_det_datetime2."',	
				wko_det_datetime3 = '".$wko_det_datetime3."',	
				wko_det_datetime4 = '".$wko_det_datetime4."',	
				wko_det_datetime5 = '".$wko_det_datetime5."',	
				
				audit_user = '".$audit_user."', 
				audit_date = GETDATE()	
		WHERE 	site_cd = '".$site_cd."'
		AND	 	mst_RowID = '".$RowID."'";

	
	$stmt_wko_det = sqlsrv_query( $conn, $sql_wko_det);	
		
if( !$stmt_wko_det ) {
	$error_message = "Error update table (UPDATE wko_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_wko_det);





 
if ($valid && $stmt_wko_mst && $stmt_wko_det ) {
	
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