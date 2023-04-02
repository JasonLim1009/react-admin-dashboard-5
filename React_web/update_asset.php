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
$ast_mst_asset_no = $data['ast_mst_asset_no'];
$ast_mst_asset_status = $data['ast_mst_asset_status'];
$ast_mst_asset_shortdesc = $data['ast_mst_asset_shortdesc'];
$ast_mst_cri_factor = $data['ast_mst_cri_factor'];
$ast_mst_asset_longdesc = $data['ast_mst_asset_longdesc'];
$ast_mst_perm_id = $data['ast_mst_perm_id'];

$ast_mst_asset_type = $data['ast_mst_asset_type'];
$ast_mst_work_area = $data['ast_mst_work_area'];
$ast_mst_asset_code = $data['ast_mst_asset_code'];
$ast_mst_asset_locn = $data['ast_mst_asset_locn'];
$ast_mst_asset_grpcode = $data['ast_mst_asset_grpcode'];
$ast_mst_ast_lvl = $data['ast_mst_ast_lvl'];
$ast_mst_cost_center = $data['ast_mst_cost_center'];
$ast_mst_wrk_grp = $data['ast_mst_wrk_grp'];
$ast_mst_parent_flag = $data['ast_mst_parent_flag'];
$ast_mst_parent_id = $data['ast_mst_parent_id'];
$ast_mst_safety_rqmts = $data['ast_mst_safety_rqmts'];
$ast_mst_print_count = $data['ast_mst_print_count'];
$ast_det_mfg_cd = $data['ast_det_mfg_cd'];
$ast_det_modelno = $data['ast_det_modelno'];

$ast_det_purchase_date = $data['ast_det_purchase_date'];
$ast_det_repl_cost = $data['ast_det_repl_cost'];
$ast_det_warranty_date = $data['ast_det_warranty_date'];
$ast_det_depr_term = $data['ast_det_depr_term'];
$ast_det_cus_code = $data['ast_det_cus_code'];

$ast_det_depr_method = $data['ast_det_depr_method'];
$ast_det_depr_date = $data['ast_det_depr_date'];
$ast_det_depr_by = $data['ast_det_depr_by'];
$ast_det_acc_depr_cost = $data['ast_det_acc_depr_cost'];
$ast_det_net_book_value = $data['ast_det_net_book_value'];
$ast_det_dispose_date = $data['ast_det_dispose_date'];
$ast_det_dispose_by = $data['ast_det_dispose_by'];
$ast_det_dispose_type = $data['ast_det_dispose_type'];
$ast_det_dispose_value = $data['ast_det_dispose_value'];

$ast_det_varchar1 = $data['ast_det_varchar1'];
$ast_det_varchar2 = $data['ast_det_varchar2'];
$ast_det_varchar3 = $data['ast_det_varchar3'];
$ast_det_varchar4 = $data['ast_det_varchar4'];
$ast_det_varchar5 = $data['ast_det_varchar5'];
$ast_det_varchar6 = $data['ast_det_varchar6'];
$ast_det_varchar7 = $data['ast_det_varchar7'];
$ast_det_varchar8 = $data['ast_det_varchar8'];
$ast_det_varchar9 = $data['ast_det_varchar9'];
$ast_det_varchar10 = $data['ast_det_varchar10'];

$ast_det_varchar11 = $data['ast_det_varchar11'];
$ast_det_varchar12 = $data['ast_det_varchar12'];
$ast_det_varchar13 = $data['ast_det_varchar13'];
$ast_det_varchar14 = $data['ast_det_varchar14'];
$ast_det_varchar15 = $data['ast_det_varchar15'];
$ast_det_varchar16 = $data['ast_det_varchar16'];
$ast_det_varchar17 = $data['ast_det_varchar17'];
$ast_det_varchar18 = $data['ast_det_varchar18'];
$ast_det_varchar19 = $data['ast_det_varchar19'];
$ast_det_varchar20 = $data['ast_det_varchar20'];


$ast_det_varchar21 = $data['ast_det_varchar21'];
$ast_det_varchar22 = $data['ast_det_varchar22'];
$ast_det_varchar23 = $data['ast_det_varchar23'];
$ast_det_varchar24 = $data['ast_det_varchar24'];
$ast_det_varchar25 = $data['ast_det_varchar25'];
$ast_det_varchar26 = $data['ast_det_varchar26'];
$ast_det_varchar27 = $data['ast_det_varchar27'];
$ast_det_varchar28 = $data['ast_det_varchar28'];
$ast_det_varchar29 = $data['ast_det_varchar29'];
$ast_det_varchar30 = $data['ast_det_varchar30'];

$ast_det_numeric1 = $data['ast_det_numeric1'];
$ast_det_numeric2 = $data['ast_det_numeric2'];
$ast_det_numeric3 = $data['ast_det_numeric3'];
$ast_det_numeric4 = $data['ast_det_numeric4'];
$ast_det_numeric5 = $data['ast_det_numeric5'];
$ast_det_numeric6 = $data['ast_det_numeric6'];
$ast_det_numeric7 = $data['ast_det_numeric7'];
$ast_det_numeric8 = $data['ast_det_numeric8'];
$ast_det_numeric9 = $data['ast_det_numeric9'];
$ast_det_numeric10 = $data['ast_det_numeric10'];

$ast_det_numeric11 = $data['ast_det_numeric11'];
$ast_det_numeric12 = $data['ast_det_numeric12'];
$ast_det_numeric13 = $data['ast_det_numeric13'];
$ast_det_numeric14 = $data['ast_det_numeric14'];
$ast_det_numeric15 = $data['ast_det_numeric15'];
$ast_det_numeric16 = $data['ast_det_numeric16'];
$ast_det_numeric17 = $data['ast_det_numeric17'];
$ast_det_numeric18 = $data['ast_det_numeric18'];
$ast_det_numeric19 = $data['ast_det_numeric19'];
$ast_det_numeric20 = $data['ast_det_numeric20'];

//$ast_det_numeric21 = $data['ast_det_numeric21'];
//$ast_det_numeric22 = $data['ast_det_numeric22'];
//$ast_det_numeric23 = $data['ast_det_numeric23'];
//$ast_det_numeric24 = $data['ast_det_numeric24'];
//$ast_det_numeric25 = $data['ast_det_numeric25'];
//$ast_det_numeric26 = $data['ast_det_numeric26'];
//$ast_det_numeric27 = $data['ast_det_numeric27'];
//$ast_det_numeric28 = $data['ast_det_numeric28'];
//$ast_det_numeric29 = $data['ast_det_numeric29'];
//$ast_det_numeric30 = $data['ast_det_numeric30'];

$ast_det_datetime1 = $data['ast_det_datetime1'];



$asset_type_ID = $data['asset_type_ID'];
$audit_user = $data['audit_user'];
$ast_mst_create_by = $data['ast_mst_create_by'];
$ast_aud_originator = $data['ast_aud_originator'];

$RowID = $data['RowID'];
 




$sql = "UPDATE ast_mst 
		SET ast_mst_asset_shortdesc ='".$ast_mst_asset_shortdesc."',
			ast_mst_asset_longdesc='".$ast_mst_asset_longdesc."',
			ast_mst_asset_type = '".$ast_mst_asset_type."',
			ast_mst_asset_grpcode= '".$ast_mst_asset_grpcode."',
			ast_mst_work_area= '".$ast_mst_work_area."',
			ast_mst_asset_locn= '".$ast_mst_asset_locn."',
			ast_mst_parent_id= '".$ast_mst_parent_id."',
			ast_mst_ast_lvl= '".$ast_mst_ast_lvl."',
			ast_mst_perm_id= '".$ast_mst_perm_id."',
			ast_mst_safety_rqmts= '".$ast_mst_safety_rqmts."',
			
			ast_mst_asset_status= '".$ast_mst_asset_status."',
			ast_mst_cri_factor= '".$ast_mst_cri_factor."',
			ast_mst_cost_center= '".$ast_mst_cost_center."',
			ast_mst.audit_user = '".$audit_user."',
			ast_mst.audit_date = GETDATE()	
		WHERE site_cd ='".$site_cd."' 
		AND ast_mst_asset_no ='".$ast_mst_asset_no."' 
		AND RowID = '".$RowID."'";
		
	//echo $sql;
	
	$stmt_ast_mst = sqlsrv_query( $conn, $sql);	
		
if( !$stmt_ast_mst ) {
	$error_message = "Error update table (UPDATE ast_aud)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_ast_mst);




//step-02
$sql_ast_det = "UPDATE	ast_det 
		SET		ast_det_modelno = '".$ast_det_modelno."',
				ast_det_mfg_cd = '".$ast_det_mfg_cd."',
				ast_det_repl_cost = '".$ast_det_repl_cost."',
				ast_det_warranty_date = '".$ast_det_warranty_date."',
				ast_det_varchar1 = '".$ast_det_varchar1."',
				ast_det_varchar2 = '".$ast_det_varchar2."',
				ast_det_varchar3 = '".$ast_det_varchar3."',
				ast_det_varchar4 = '".$ast_det_varchar4."',
				ast_det_varchar5 = '".$ast_det_varchar5."',
				ast_det_varchar6 = '".$ast_det_varchar6."',
				ast_det_varchar7 = '".$ast_det_varchar7."',
				ast_det_varchar8 = '".$ast_det_varchar8."',
				ast_det_varchar9 = '".$ast_det_varchar9."',
				ast_det_varchar10 = '".$ast_det_varchar10."',
				ast_det_varchar11 = '".$ast_det_varchar11."',
				ast_det_varchar12 = '".$ast_det_varchar12."',
				ast_det_varchar13 = '".$ast_det_varchar13."',
				ast_det_varchar14 = '".$ast_det_varchar14."',
				ast_det_varchar15 = '".$ast_det_varchar15."',
				ast_det_varchar16 = '".$ast_det_varchar16."',
				ast_det_varchar17 = '".$ast_det_varchar17."',
				ast_det_varchar18 = '".$ast_det_varchar18."',
				ast_det_varchar19 = '".$ast_det_varchar19."',
				ast_det_varchar20 = '".$ast_det_varchar20."',
				ast_det_varchar21 = '".$ast_det_varchar21."',
				ast_det_varchar22 = '".$ast_det_varchar22."',
				ast_det_varchar23 = '".$ast_det_varchar23."',
				ast_det_varchar24 = '".$ast_det_varchar24."',
				ast_det_varchar25 = '".$ast_det_varchar25."',
				ast_det_varchar26 = '".$ast_det_varchar26."',
				ast_det_varchar27 = '".$ast_det_varchar27."',
				ast_det_varchar28 = '".$ast_det_varchar28."',
				ast_det_varchar29 = '".$ast_det_varchar29."',
				ast_det_varchar30 = '".$ast_det_varchar30."',
				ast_det_numeric1 = '".$ast_det_numeric1."',
				ast_det_numeric2 = '".$ast_det_numeric2."',
				ast_det_numeric3 = '".$ast_det_numeric3."',
				ast_det_numeric4 = '".$ast_det_numeric4."',
				ast_det_numeric5 = '".$ast_det_numeric5."',
				ast_det_numeric6 = '".$ast_det_numeric6."',
				ast_det_numeric7 = '".$ast_det_numeric7."',
				ast_det_numeric8 = '".$ast_det_numeric8."',
				ast_det_numeric9 = '".$ast_det_numeric9."',
				ast_det_numeric10 = '".$ast_det_numeric10."',
				ast_det_numeric11 = '".$ast_det_numeric11."',
				ast_det_numeric12 = '".$ast_det_numeric12."',
				ast_det_numeric13 = '".$ast_det_numeric13."',
				ast_det_numeric14 = '".$ast_det_numeric14."',
				ast_det_numeric15 = '".$ast_det_numeric15."',
				ast_det_numeric16 = '".$ast_det_numeric16."',
				ast_det_numeric17 = '".$ast_det_numeric17."',
				ast_det_numeric18 = '".$ast_det_numeric18."',
				ast_det_numeric19 = '".$ast_det_numeric19."',
				ast_det_numeric20 = '".$ast_det_numeric20."',
				ast_det_datetime1 = '".$ast_det_datetime1."',
			
				
				audit_user = '".$audit_user."', 
				audit_date = GETDATE()	
		WHERE 	site_cd = '".$site_cd."'
		AND	 	mst_RowID = '".$RowID."'";

	
	$stmt_ast_det = sqlsrv_query( $conn, $sql_ast_det);	
		
if( !$stmt_ast_det ) {
	$error_message = "Error update table (UPDATE ast_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}sqlsrv_free_stmt( $stmt_ast_det);


				/* ast_det_numeric21 = '".$ast_det_numeric21."',
				ast_det_numeric22 = '".$ast_det_numeric22."',
				ast_det_numeric23 = '".$ast_det_numeric23."',
				ast_det_numeric24 = '".$ast_det_numeric24."',
				ast_det_numeric25 = '".$ast_det_numeric25."',
				ast_det_numeric26 = '".$ast_det_numeric26."',
				ast_det_numeric27 = '".$ast_det_numeric27."',
				ast_det_numeric28 = '".$ast_det_numeric28."',
				ast_det_numeric29 = '".$ast_det_numeric29."',
				ast_det_numeric30 = '".$ast_det_numeric30."', */



 
if ($valid && $stmt_ast_mst && $stmt_ast_det ) {
	
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