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


$sql= "	SELECT 		wkr_mst.site_cd,     				wkr_mst.wkr_mst_wr_no,     				wkr_mst.wkr_mst_org_date,     				wkr_mst.wkr_mst_org_time,     				
					wkr_mst.wkr_mst_taken_by,     				wkr_mst.wkr_mst_originator,     				wkr_mst.wkr_mst_phone,      				wkr_mst.wkr_mst_orig_priority,     				
					wkr_mst.wkr_mst_due_date,     				wkr_mst.wkr_mst_fault_code,      				wkr_mst.wkr_mst_wr_descs,     				wkr_mst.wkr_mst_assetno,     				
					wkr_mst.wkr_mst_wr_status,      				wkr_mst.wkr_mst_wo_status,     				wkr_mst.wkr_mst_work_type,     				wkr_mst.wkr_mst_work_class,     				
					wkr_mst.wkr_mst_chg_costcenter,     				wkr_mst.wkr_mst_work_group,     				wkr_mst.wkr_mst_approved,     				wkr_mst.wkr_mst_location,     				
					wkr_mst.wkr_mst_assetdesc,     				wkr_mst.wkr_mst_projectid,     				wkr_mst.wkr_mst_work_area,     				wkr_mst.wkr_mst_planner,     				
					wkr_mst.wkr_mst_assetlocn,     				wkr_mst.wkr_mst_requestor,     				wkr_mst.wkr_mst_requestor_phone,     				wkr_mst.wkr_mst_org_locn,     				
					wkr_mst.wkr_mst_dept,     				wkr_mst.wkr_mst_capital_project,     				wkr_mst.wkr_mst_temp_asset,      				wkr_mst.wkr_mst_email_notification,     				
					wkr_det.wkr_det_wo,  				wkr_det.wkr_det_approver,            				wkr_det.wkr_det_appr_date,    				wkr_det.wkr_det_reject_desc,   				
					wkr_det.wkr_det_reject_by,         				                                                                                                                                                                                                                                              				wkr_det.wkr_det_reject_date ,       				wkr_mst.audit_user,     				wkr_mst.audit_date,     				wkr_mst.wkr_mst_create_by,   				wkr_mst.wkr_mst_create_date,   				wkr_mst.column1,     				wkr_mst.column2,     				wkr_mst.column3,     				wkr_mst.column4,     				wkr_mst.column5,     				wkr_mst.RowID  FROM 		wkr_mst,  				wkr_det     WHERE  ( wkr_mst.site_cd = wkr_det.site_cd ) AND  ( wkr_mst.rowid = wkr_det.mst_rowid ) 
		AND  ( wkr_mst.site_cd = '".$site_cd."' )  ";


	$stmt_cf_account = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_account ) {
		 $error_message = "Error selecting table (FromUOM Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Account= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_account, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Account[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_account) );
	
	
returnData($Account);

sqlsrv_free_stmt($stmt_cf_account);
sqlsrv_close($conn);

function returnData($Account)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Account
    ];

   

    echo json_encode($returnData);
}

function returnError($error_message)
{
    $json = [];

    $returnData = [
        "status" => "ERROR",
        "message" => $error_message,
        "data" => $json,
    ];

    echo json_encode($returnData);
    exit();
}

 
?>