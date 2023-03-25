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
$emp_mst_empl_id = $data['emp_mst_empl_id'];
$emp_mst_name = $data['emp_mst_name'];
$emp_mst_status = $data['emp_mst_status'];
$emp_mst_title = $data['emp_mst_title'];
$emp_mst_usr_grp = $data['emp_mst_usr_grp'];
$emp_mst_login_id = $data['emp_mst_login_id'];
$emp_mst_dash_access = $data['emp_mst_dash_access'];

$emp_mst_homephone = $data['emp_mst_homephone'];
$emp_mst_date_of_birth = $data['emp_mst_date_of_birth'];
$emp_mst_emg_name = $data['emp_mst_emg_name'];
$emp_mst_dateofhire = $data['emp_mst_dateofhire'];
$emp_mst_emg_phone = $data['emp_mst_emg_phone'];
$emp_mst_payrate = $data['emp_mst_payrate'];
$emp_mst_sex = $data['emp_mst_sex'];
$emp_mst_pay_period = $data['emp_mst_pay_period'];
$emp_mst_marital_status = $data['emp_mst_marital_status'];
$emp_mst_remarks = $data['emp_mst_remarks'];

$emp_det_shift = $data['emp_det_shift'];
$emp_det_email_id = $data['emp_det_email_id'];
$emp_det_supervisor_id = $data['emp_det_supervisor_id'];
$emp_det_craft = $data['emp_det_craft'];
$emp_det_work_area = $data['emp_det_work_area'];
$emp_det_work_grp = $data['emp_det_work_grp'];

$emp_det_mr_limit = $data['emp_det_mr_limit'];
$emp_det_wo_approval_limit = $data['emp_det_wo_approval_limit'];	
$emp_det_pr_approval_limit = $data['emp_det_pr_approval_limit'];
$emp_det_mr_approver = $data['emp_det_mr_approver'];
$emp_det_wo_budget_approver = $data['emp_det_wo_budget_approver'];
$emp_det_pr_approver = $data['emp_det_pr_approver'];

$emp_det_wr_approver = $data['emp_det_wr_approver'];
$emp_det_planner = $data['emp_det_planner'];
$emp_det_wo_gen_mr_pr = $data['emp_det_wo_gen_mr_pr'];
$emp_det_pm_generator = $data['emp_det_pm_generator'];
$emp_det_time_card_enter = $data['emp_det_time_card_enter'];
$emp_det_time_card_void = $data['emp_det_time_card_void'];
$emp_det_core = $data['emp_det_core'];

$emp_det_wo_sched = $data['emp_det_wo_sched'];
$emp_det_po_buyer = $data['emp_det_po_buyer'];
$emp_det_supervisor = $data['emp_det_supervisor'];
$emp_det_foreman = $data['emp_det_foreman'];
$emp_det_asset_tag_flag = $data['emp_det_asset_tag_flag'];
$emp_det_msetup_mobile_user = $data['emp_det_msetup_mobile_user'];
$emp_det_checklist = $data['emp_det_checklist'];
$emp_det_mobile = $data['emp_det_mobile'];
$emp_det_webwork = $data['emp_det_webwork'];
	
$emp_det_note1 = $data['emp_det_note1'];
$emp_det_varchar1 = $data['emp_det_varchar1'];
$emp_det_varchar2 = $data['emp_det_varchar2'];
$emp_det_varchar3 = $data['emp_det_varchar3'];
$emp_det_varchar4 = $data['emp_det_varchar4'];
$emp_det_varchar5 = $data['emp_det_varchar5'];
$emp_det_varchar6 = $data['emp_det_varchar6'];
$emp_det_varchar7 = $data['emp_det_varchar7'];
$emp_det_varchar8 = $data['emp_det_varchar8'];
$emp_det_varchar9 = $data['emp_det_varchar9'];
$emp_det_varchar10 = $data['emp_det_varchar10'];

$emp_det_note2 = $data['emp_det_note2'];
$emp_det_varchar11 = $data['emp_det_varchar11'];
$emp_det_varchar12 = $data['emp_det_varchar12'];
$emp_det_varchar13 = $data['emp_det_varchar13'];
$emp_det_varchar14 = $data['emp_det_varchar14'];
$emp_det_varchar15 = $data['emp_det_varchar15'];
$emp_det_varchar16 = $data['emp_det_varchar16'];
$emp_det_varchar17 = $data['emp_det_varchar17'];
$emp_det_varchar18 = $data['emp_det_varchar18'];
$emp_det_varchar19 = $data['emp_det_varchar19'];
$emp_det_varchar20 = $data['emp_det_varchar20'];

//$emp_det_numeric1 = $data['$emp_det_numeric1'];
//$emp_det_numeric2 = $data['$emp_det_numeric2'];
//$emp_det_numeric3 = $data['$emp_det_numeric3'];
//$emp_det_numeric4 = $data['$emp_det_numeric4'];
//$emp_det_numeric5 = $data['$emp_det_numeric5'];
//$emp_det_numeric6 = $data['$emp_det_numeric6'];
//$emp_det_numeric7 = $data['$emp_det_numeric7'];
//$emp_det_numeric8 = $data['$emp_det_numeric8'];
//$emp_det_numeric9 = $data['$emp_det_numeric9'];
//$emp_det_numeric10 = $data['$emp_det_numeric10'];

$emp_det_datetime1 = $data['emp_det_datetime1'];
$emp_det_datetime2 = $data['emp_det_datetime2'];
$emp_det_datetime3 = $data['emp_det_datetime3'];
$emp_det_datetime4 = $data['emp_det_datetime4'];
$emp_det_datetime5 = $data['emp_det_datetime5'];
$emp_det_datetime6 = $data['emp_det_datetime6'];
$emp_det_datetime7 = $data['emp_det_datetime7'];
$emp_det_datetime8 = $data['emp_det_datetime8'];
$emp_det_datetime9 = $data['emp_det_datetime9'];
$emp_det_datetime10 = $data['emp_det_datetime10'];


$audit_user = $data['audit_user'];
$emp_mst_create_by = $data['ast_mst_create_by'];
$ast_aud_originator = $data['ast_aud_originator'];
$emp_mst_create_date = $data['emp_mst_create_date'];

$RowID = $data['RowID'];
 

		

//step-01
$sql_emp_mst = "UPDATE	emp_mst 
		SET		emp_mst_empl_id = '".$emp_mst_empl_id."',	
				emp_mst_name = '".$emp_mst_name."',	
				emp_mst_status = '".$emp_mst_status."', 
				emp_mst_title = '".$emp_mst_title."',	
				emp_mst_usr_grp = '".$emp_mst_usr_grp."',	
				emp_mst_login_id = '".$emp_mst_login_id."',
				emp_mst_dash_access = '".$emp_mst_dash_access."',
				emp_mst_homephone = '".$emp_mst_homephone."',
				emp_mst_date_of_birth = '".$emp_mst_date_of_birth."',
				emp_mst_emg_name = '".$emp_mst_emg_name."',
				emp_mst_dateofhire = '".$emp_mst_dateofhire."',
				emp_mst_emg_phone = '".$emp_mst_emg_phone."', 
				emp_mst_payrate = '".$emp_mst_payrate."', 
				emp_mst_sex = '".$emp_mst_sex."',
				emp_mst_pay_period = '".$emp_mst_pay_period."', 
				emp_mst_marital_status = '".$emp_mst_marital_status."',
				emp_mst_remarks = '".$emp_mst_remarks."',		
				audit_user = '".$audit_user."', 
				audit_date = GETDATE()	
		WHERE	site_cd = '".$site_cd."'
		AND		emp_mst_empl_id = '".$emp_mst_empl_id."'
		AND 	RowID = '".$RowID."'";
	
	
	$stmt_emp_mst = sqlsrv_query( $conn, $sql_emp_mst);	
		
if( !$stmt_emp_mst ) {
	$error_message = "Error update table (UPDATE emp_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_emp_mst);




//step-02
$sql_emp_det = "UPDATE	emp_det 
		SET		emp_det_shift = '".$emp_det_shift."',	
				emp_det_email_id = '".$emp_det_email_id."',	
				emp_det_supervisor_id = '".$emp_det_supervisor_id."',	
				emp_det_craft = '".$emp_det_craft."',
				emp_det_work_area = '".$emp_det_work_area."',
				emp_det_work_grp = '".$emp_det_work_grp."',
				emp_det_mr_limit = '".$emp_det_mr_limit."',
				emp_det_wo_approval_limit = '".$emp_det_wo_approval_limit."',
				emp_det_pr_approval_limit = '".$emp_det_pr_approval_limit."',
				emp_det_mr_approver = '".$emp_det_mr_approver."',
				emp_det_wo_budget_approver = '".$emp_det_wo_budget_approver."',
				emp_det_pr_approver = '".$emp_det_pr_approver."',
				emp_det_wr_approver = '".$emp_det_wr_approver."',
				emp_det_planner = '".$emp_det_planner."',
				emp_det_wo_gen_mr_pr = '".$emp_det_wo_gen_mr_pr."',
				emp_det_pm_generator = '".$emp_det_pm_generator."',
				emp_det_time_card_enter = '".$emp_det_time_card_enter."',
				emp_det_time_card_void = '".$emp_det_time_card_void."',
				emp_det_core = '".$emp_det_core."',
				emp_det_wo_sched = '".$emp_det_wo_sched."',
				emp_det_po_buyer = '".$emp_det_po_buyer."',
				emp_det_supervisor = '".$emp_det_supervisor."',
				emp_det_foreman = '".$emp_det_foreman."',
				emp_det_asset_tag_flag = '".$emp_det_asset_tag_flag."',
				emp_det_msetup_mobile_user = '".$emp_det_msetup_mobile_user."',
				emp_det_checklist = '".$emp_det_checklist."',
				emp_det_mobile = '".$emp_det_mobile."',
				emp_det_webwork = '".$emp_det_webwork."',
				emp_det_note1 = '".$emp_det_note1."',
				emp_det_varchar1 = '".$emp_det_varchar1."',
				emp_det_varchar2 = '".$emp_det_varchar2."',
				emp_det_varchar3 = '".$emp_det_varchar3."',
				emp_det_varchar4 = '".$emp_det_varchar4."',
				emp_det_varchar5 = '".$emp_det_varchar5."',
				emp_det_varchar6 = '".$emp_det_varchar6."',
				emp_det_varchar7 = '".$emp_det_varchar7."',
				emp_det_varchar8 = '".$emp_det_varchar8."',
				emp_det_varchar9 = '".$emp_det_varchar9."',
				emp_det_varchar10 = '".$emp_det_varchar10."',
				emp_det_note2 = '".$emp_det_note2."',
				emp_det_varchar11 = '".$emp_det_varchar11."',
				emp_det_varchar12 = '".$emp_det_varchar12."',
				emp_det_varchar13 = '".$emp_det_varchar13."',
				emp_det_varchar14 = '".$emp_det_varchar14."',
				emp_det_varchar15 = '".$emp_det_varchar15."',
				emp_det_varchar16 = '".$emp_det_varchar16."',
				emp_det_varchar17 = '".$emp_det_varchar17."',
				emp_det_varchar18 = '".$emp_det_varchar18."',
				emp_det_varchar19 = '".$emp_det_varchar19."',
				emp_det_varchar20 = '".$emp_det_varchar20."',
				
				emp_det_datetime1 = '".$emp_det_datetime1."',
				emp_det_datetime2 = '".$emp_det_datetime2."',
				emp_det_datetime3 = '".$emp_det_datetime3."',
				emp_det_datetime4 = '".$emp_det_datetime4."',
				emp_det_datetime5 = '".$emp_det_datetime5."',
				emp_det_datetime6 = '".$emp_det_datetime6."',
				emp_det_datetime7 = '".$emp_det_datetime7."',
				emp_det_datetime8 = '".$emp_det_datetime8."',
				emp_det_datetime9 = '".$emp_det_datetime9."',
				emp_det_datetime10 = '".$emp_det_datetime10."',
				audit_user = '".$audit_user."', 
				audit_date = GETDATE()	
		WHERE 	site_cd = '".$site_cd."'
		AND	 	mst_RowID = '".$RowID."'";

	
	$stmt_emp_det = sqlsrv_query( $conn, $sql_emp_det);	
		
if( !$stmt_emp_det ) {
	$error_message = "Error update table (UPDATE emp_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_emp_det);





 
if ($valid && $stmt_emp_mst && $stmt_emp_det ) {
	
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