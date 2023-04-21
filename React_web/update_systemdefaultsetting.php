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
$dft_mst_lab_act = $data['dft_mst_lab_act'];
$dft_mst_mtr_sts = $data['dft_mst_mtr_sts'];
$dft_mst_mat_act = $data['dft_mst_mat_act'];
$dft_mst_pur_sts = $data['dft_mst_pur_sts'];
$dft_mst_con_act = $data['dft_mst_con_act'];
$dft_mst_puo_sts = $data['dft_mst_puo_sts'];
$dft_mst_wkr_pri = $data['dft_mst_wkr_pri'];

$dft_mst_wkr_asset_no = $data['dft_mst_wkr_asset_no'];
$dft_mst_wko_pri = $data['dft_mst_wko_pri'];
$dft_mst_wkr_originator = $data['dft_mst_wkr_originator'];
$dft_mst_prm_pri = $data['dft_mst_prm_pri'];
$dft_mst_wko_asset_no = $data['dft_mst_wko_asset_no'];
$dft_mst_ast_sts = $data['dft_mst_ast_sts'];
$dft_mst_pur_approval = $data['dft_mst_pur_approval'];
$dft_mst_wko_sts = $data['dft_mst_wko_sts'];
$dft_mst_mtr_approval_type = $data['dft_mst_mtr_approval_type'];
$dft_mst_time_card_by = $data['dft_mst_time_card_by'];

$dft_mst_po_curr_code = $data['dft_mst_po_curr_code'];
$dft_mst_grace_period = $data['dft_mst_grace_period'];
$dft_mst_dsh_refresh = $data['dft_mst_dsh_refresh'];
$dft_mst_eoq_carry_cost_rate = $data['dft_mst_eoq_carry_cost_rate'];
$dft_mst_prm_led = $data['dft_mst_prm_led'];
$dft_mst_eoq_po_process_cost = $data['dft_mst_eoq_po_process_cost'];

$dft_mst_show_dashboard = $data['dft_mst_show_dashboard'];
$dft_mst_asset_selection = $data['dft_mst_asset_selection'];	
$dft_mst_itm_resv = $data['dft_mst_itm_resv'];
$dft_mst_print_trx = $data['dft_mst_print_trx'];
$dft_mst_mtr_email = $data['dft_mst_mtr_email'];
$dft_mst_mr_approval = $data['dft_mst_mr_approval'];

$dft_mst_mr_release_for_app = $data['dft_mst_mr_release_for_app'];
$dft_mst_mtr_closed_loop = $data['dft_mst_mtr_closed_loop'];
$dft_mst_mtr_email_approver = $data['dft_mst_mtr_email_approver'];
$dft_mst_mtr_approval_auto_send = $data['dft_mst_mtr_approval_auto_send'];
$dft_mst_mtr_email_requestor = $data['dft_mst_mtr_email_requestor'];
$dft_mst_wkr_email = $data['dft_mst_wkr_email'];
$dft_mst_wo_default_cc = $data['dft_mst_wo_default_cc'];

$dft_mst_wr_auto_plan_wo = $data['dft_mst_wr_auto_plan_wo'];
$dft_mst_gen_inv = $data['dft_mst_gen_inv'];
$dft_mst_temp_ast = $data['dft_mst_temp_ast'];
$dft_mst_pm_closed_loop = $data['dft_mst_pm_closed_loop'];
$dft_mst_pm_schedule_date = $data['dft_mst_pm_schedule_date'];
$dft_mst_pr_release_for_app = $data['dft_mst_pr_release_for_app'];
$dft_mst_pur_closed_loop = $data['dft_mst_pur_closed_loop'];
$dft_mst_pur_email_approver = $data['dft_mst_pur_email_approver'];
$dft_mst_pur_approval_auto_send = $data['dft_mst_pur_approval_auto_send'];
	
$dft_mst_pur_email_requestor = $data['dft_mst_pur_email_requestor'];
$dft_mst_order_point_pr = $data['dft_mst_order_point_pr'];
$dft_mst_generate_po = $data['dft_mst_generate_po'];
$dft_mst_po_auto_close = $data['dft_mst_po_auto_close'];



$audit_user = $data['audit_user'];
// $emp_mst_create_by = $data['ast_mst_create_by'];
// $ast_aud_originator = $data['ast_aud_originator'];
// $emp_mst_create_date = $data['emp_mst_create_date'];

$RowID = $data['RowID'];
 

		

//step-01
$sql_dft_mst = "UPDATE	dft_mst 
		SET		dft_mst_lab_act = '".$dft_mst_lab_act."',	
				dft_mst_mtr_sts = '".$dft_mst_mtr_sts."',	
				dft_mst_mat_act = '".$dft_mst_mat_act."',	
				dft_mst_pur_sts = '".$dft_mst_pur_sts."',	
				dft_mst_con_act = '".$dft_mst_con_act."',	
				dft_mst_puo_sts = '".$dft_mst_puo_sts."',	
				dft_mst_wkr_pri = '".$dft_mst_wkr_pri."',	

				dft_mst_wkr_asset_no = '".$dft_mst_wkr_asset_no."',	
				dft_mst_wko_pri = '".$dft_mst_wko_pri."',	
				dft_mst_wkr_originator = '".$dft_mst_wkr_originator."',	
				dft_mst_prm_pri = '".$dft_mst_prm_pri."',	
				dft_mst_wko_asset_no = '".$dft_mst_wko_asset_no."',	
				dft_mst_ast_sts = '".$dft_mst_ast_sts."',	
				dft_mst_pur_approval = '".$dft_mst_pur_approval."',	
				dft_mst_wko_sts = '".$dft_mst_wko_sts."',	
				dft_mst_mtr_approval_type = '".$dft_mst_mtr_approval_type."',	
				dft_mst_time_card_by = '".$dft_mst_time_card_by."',	

				dft_mst_po_curr_code = '".$dft_mst_po_curr_code."',	
				dft_mst_grace_period = '".$dft_mst_grace_period."',	
				dft_mst_dsh_refresh = '".$dft_mst_dsh_refresh."',	
				dft_mst_eoq_carry_cost_rate = '".$dft_mst_eoq_carry_cost_rate."',	
				dft_mst_prm_led = '".$dft_mst_prm_led."',	
				dft_mst_eoq_po_process_cost = '".$dft_mst_eoq_po_process_cost."',	

				dft_mst_show_dashboard = '".$dft_mst_show_dashboard."',	
				dft_mst_asset_selection = '".$dft_mst_asset_selection."',	
				dft_mst_itm_resv = '".$dft_mst_itm_resv."',	
				dft_mst_print_trx = '".$dft_mst_print_trx."',	
				dft_mst_mtr_email = '".$dft_mst_mtr_email."',	
				dft_mst_mr_approval = '".$dft_mst_mr_approval."',	

				dft_mst_mr_release_for_app = '".$dft_mst_mr_release_for_app."',	
				dft_mst_mtr_closed_loop = '".$dft_mst_mtr_closed_loop."',	
				dft_mst_mtr_email_approver ='".$dft_mst_mtr_email_approver."',	
				dft_mst_mtr_approval_auto_send = '".$dft_mst_mtr_approval_auto_send."',	
				dft_mst_mtr_email_requestor = '".$dft_mst_mtr_email_requestor."',	
				dft_mst_wkr_email = '".$dft_mst_wkr_email."',	
				dft_mst_wo_default_cc = '".$dft_mst_wo_default_cc."',	

				dft_mst_wr_auto_plan_wo = '".$dft_mst_wr_auto_plan_wo."',	
				dft_mst_gen_inv = '".$dft_mst_gen_inv."',	
				dft_mst_temp_ast ='".$dft_mst_temp_ast."',	
				dft_mst_pm_closed_loop = '".$dft_mst_pm_closed_loop."',	
				dft_mst_pm_schedule_date = '".$dft_mst_pm_schedule_date."',	
				dft_mst_pr_release_for_app = '".$dft_mst_pr_release_for_app."',	
				dft_mst_pur_closed_loop = '".$dft_mst_pur_closed_loop."',	
				dft_mst_pur_email_approver = '".$dft_mst_pur_email_approver."',	
				dft_mst_pur_approval_auto_send = '".$dft_mst_pur_approval_auto_send."',	
					
				dft_mst_pur_email_requestor = '".$dft_mst_pur_email_requestor."',	
				dft_mst_order_point_pr = '".$dft_mst_order_point_pr."',	
				dft_mst_generate_po = '".$dft_mst_generate_po."',	
				dft_mst_po_auto_close = '".$dft_mst_po_auto_close."',	
				
				audit_user = '".$audit_user."', 
				audit_date = GETDATE()	
		WHERE	site_cd = '".$site_cd."'
		AND 	RowID = '".$RowID."'";
	
	
	$stmt_dft_mst = sqlsrv_query( $conn, $sql_dft_mst);	
		
if( !$stmt_dft_mst ) {
	$error_message = "Error update table (UPDATE dft_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_dft_mst);



 
if ($valid && $stmt_dft_mst) {
	
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