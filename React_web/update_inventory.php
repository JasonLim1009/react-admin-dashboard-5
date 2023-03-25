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
$itm_mst_type = $data['itm_mst_type'];
$itm_mst_com_code = $data['itm_mst_com_code'];
$itm_mst_stockno = $data['itm_mst_stockno'];
$itm_mst_itm_grp = $data['itm_mst_itm_grp'];
$itm_mst_mstr_locn = $data['itm_mst_mstr_locn'];
$itm_mst_partno = $data['itm_mst_partno'];
$itm_mst_order_rule = $data['itm_mst_order_rule'];
$itm_mst_costcenter = $data['itm_mst_costcenter'];
$itm_mst_account = $data['itm_mst_account'];
$itm_mst_desc = $data['itm_mst_desc'];
$itm_mst_ext_desc = $data['itm_mst_ext_desc'];

$itm_det_part_deac_status = $data['itm_det_part_deac_status'];
$itm_det_auto_spare = $data['itm_det_auto_spare'];
$itm_det_issue_uom = $data['itm_det_issue_uom'];
$itm_det_critical_spare = $data['itm_det_critical_spare'];
$itm_det_rcv_uom = $data['itm_det_rcv_uom'];
$itm_det_hzd_mtl = $data['itm_det_hzd_mtl'];
$itm_det_abc_class = $data['itm_det_abc_class'];
$itm_det_storage_type = $data['itm_det_storage_type'];
$itm_det_order_pt = $data['itm_det_order_pt'];
$itm_det_cube = $data['itm_det_cube'];
$itm_det_maximum = $data['itm_det_maximum'];
$itm_det_shelf_life = $data['itm_det_shelf_life'];
$itm_det_lastactdate = $data['itm_det_lastactdate'];
$itm_det_lastcntdate = $data['itm_det_lastcntdate'];
$itm_det_next_cnt_date = $data['itm_det_next_cnt_date'];

$itm_det_note1 = $data['itm_det_note1'];
$itm_det_varchar1 = $data['itm_det_varchar1'];
$itm_det_varchar2 = $data['itm_det_varchar2'];
$itm_det_varchar3 = $data['itm_det_varchar3'];
$itm_det_varchar4 = $data['itm_det_varchar4'];
$itm_det_varchar5 = $data['itm_det_varchar5'];
$itm_det_varchar6 = $data['itm_det_varchar6'];
$itm_det_varchar7 = $data['itm_det_varchar7'];
$itm_det_varchar8 = $data['itm_det_varchar8'];
$itm_det_varchar9 = $data['itm_det_varchar9'];
$itm_det_varchar10 = $data['itm_det_varchar10'];

$itm_det_numeric1 = $data['itm_det_numeric1'];
$itm_det_numeric2 = $data['itm_det_numeric2'];
$itm_det_numeric3 = $data['itm_det_numeric3'];
$itm_det_numeric4 = $data['itm_det_numeric4'];
$itm_det_numeric5 = $data['itm_det_numeric5'];

$itm_det_datetime1 = $data['itm_det_datetime1'];
$itm_det_datetime2 = $data['itm_det_datetime2'];
$itm_det_datetime3 = $data['itm_det_datetime3'];
$itm_det_datetime4 = $data['itm_det_datetime4'];
$itm_det_datetime5 = $data['itm_det_datetime5'];

$itm_det_acct_type = $data['itm_det_acct_type'];
$itm_det_tax_cd = $data['itm_det_tax_cd'];
$itm_det_cr_code = $data['itm_det_cr_code'];
$itm_det_avg_cost = $data['itm_det_avg_cost'];
$itm_det_std_cost = $data['itm_det_std_cost'];
$itm_det_last_cost = $data['itm_det_last_cost'];



$itm_mst_create_by = $data['itm_mst_create_by'];
$itm_mst_create_date = $data['itm_mst_create_date'];



$audit_user = $data['audit_user'];

$ast_aud_originator = $data['ast_aud_originator'];

$RowID = $data['RowID'];
 

		

//step-01
$sql_itm_mst = "UPDATE	itm_mst 
		SET		itm_mst_type = '".$itm_mst_type."',	
				itm_mst_com_code = '".$itm_mst_com_code."',	
				itm_mst_stockno = '".$itm_mst_stockno."',	
				itm_mst_itm_grp = '".$itm_mst_itm_grp."',	
				itm_mst_mstr_locn = '".$itm_mst_mstr_locn."',	
				itm_mst_partno = '".$itm_mst_partno."',	
				itm_mst_order_rule = '".$itm_mst_order_rule."',	
				itm_mst_costcenter = '".$itm_mst_costcenter."',	
				itm_mst_account = '".$itm_mst_account."',	
				itm_mst_desc = '".$itm_mst_desc."',	
				itm_mst_ext_desc = '".$itm_mst_ext_desc."',	

				audit_user = '".$audit_user."', 
				audit_date = GETDATE()	
		WHERE	site_cd = '".$site_cd."'
		AND 	RowID = '".$RowID."'";
	
	
	$stmt_itm_mst = sqlsrv_query( $conn, $sql_itm_mst);	
		
if( !$stmt_itm_mst ) {
	$error_message = "Error update table (UPDATE itm_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_itm_mst);




//step-02
$sql_itm_det = "UPDATE	itm_det 
		SET		itm_det_part_deac_status = '".$itm_det_part_deac_status."',
				itm_det_auto_spare = '".$itm_det_auto_spare."',
				itm_det_issue_uom = '".$itm_det_issue_uom."',
				itm_det_critical_spare = '".$itm_det_critical_spare."',
				itm_det_rcv_uom = '".$itm_det_rcv_uom."',
				itm_det_hzd_mtl = '".$itm_det_hzd_mtl."',
				itm_det_abc_class = '".$itm_det_abc_class."',
				itm_det_storage_type = '".$itm_det_storage_type."',
				itm_det_order_pt = '".$itm_det_order_pt."',
				itm_det_cube = '".$itm_det_cube."',
				itm_det_maximum = '".$itm_det_maximum."',
				itm_det_shelf_life = '".$itm_det_shelf_life."',
				itm_det_lastactdate = '".$itm_det_lastactdate."',
				itm_det_lastcntdate = '".$itm_det_lastcntdate."',
				itm_det_next_cnt_date = '".$itm_det_next_cnt_date."',

				itm_det_note1 = '".$itm_det_note1."',
				itm_det_varchar1 = '".$itm_det_varchar1."',
				itm_det_varchar2 = '".$itm_det_varchar2."',
				itm_det_varchar3 = '".$itm_det_varchar3."',
				itm_det_varchar4 = '".$itm_det_varchar4."',
				itm_det_varchar5 = '".$itm_det_varchar5."',
				itm_det_varchar6 = '".$itm_det_varchar6."',
				itm_det_varchar7 = '".$itm_det_varchar7."',
				itm_det_varchar8 = '".$itm_det_varchar8."',
				itm_det_varchar9 = '".$itm_det_varchar9."',
				itm_det_varchar10 = '".$itm_det_varchar10."',

				itm_det_numeric1 = '".$itm_det_numeric1."',
				itm_det_numeric2 = '".$itm_det_numeric2."',
				itm_det_numeric3 = '".$itm_det_numeric3."',
				itm_det_numeric4 = '".$itm_det_numeric4."',
				itm_det_numeric5 = '".$itm_det_numeric5."',
				
				itm_det_datetime1 = '".$itm_det_datetime1."',
				itm_det_datetime2 = '".$itm_det_datetime2."',
				itm_det_datetime3 = '".$itm_det_datetime3."',
				itm_det_datetime4 = '".$itm_det_datetime4."',
				itm_det_datetime5 = '".$itm_det_datetime5."',

				itm_det_acct_type = '".$itm_det_acct_type."',
				itm_det_tax_cd = '".$itm_det_tax_cd."',
				itm_det_cr_code = '".$itm_det_cr_code."',
				itm_det_avg_cost = '".$itm_det_avg_cost."',
				itm_det_std_cost = '".$itm_det_std_cost."',
				itm_det_last_cost = '".$itm_det_last_cost."',
				
				audit_user = '".$audit_user."', 
				audit_date = GETDATE()	
		WHERE 	site_cd = '".$site_cd."'
		AND	 	mst_RowID = '".$RowID."'";

	
	$stmt_itm_det = sqlsrv_query( $conn, $sql_itm_det);	
		
if( !$stmt_itm_det ) {
	$error_message = "Error update table (UPDATE itm_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_itm_det);





 
if ($valid && $stmt_itm_mst && $stmt_itm_det ) {
	
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