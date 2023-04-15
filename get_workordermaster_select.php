<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);
// get these values from your DB.
require_once('config.php');
$error_message;
$valid = true;

/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}

$RowID = $_REQUEST['RowID'];



$sql="Select  	

wko_mst_wo_no,
wko_mst_assetno,
wko_det_parent_wo,
wko_mst_pm_grp,
wko_mst_status,
wko_mst_asset_status,
wko_mst_descs,
wko_mst_chg_costcenter,
wko_mst_org_date,
wko_mst_due_date,
wko_det_cmpl_date,

wko_det_sc_date,
wko_det_clo_date,
wko_mst_originator,

wko_det_approved,
wko_det_safety,
wko_det_approver,
wko_det_assign_to,

wko_det_planner,
wko_mst_flt_code,
wko_det_cause_code,
wko_det_act_code,
wko_det_corr_action,

wko_mst_phone,
wko_mst_project_id,
wko_mst_work_area,
wko_mst_asset_location,
wko_mst_asset_level,
wko_mst_asset_group_code,
wko_mst_orig_priority,
wko_mst_plan_priority,
wko_det_temp_asset,
wko_det_wr_no,

wko_det_perm_id,
wko_det_work_type,
wko_det_work_class,
wko_det_work_grp,
wko_det_sched_date,
wko_det_exc_date,
wko_det_contract_no,
wko_det_delay_cd,
wko_det_customer_cd,
wko_det_supv_id,

wko_det_laccount,
wko_det_maccount,
wko_det_crd_costcenter,
wko_det_caccount,
wko_det_saccount,

wko_det_est_con_cost,
wko_det_con_cost,
wko_det_est_mtl_cost,
wko_det_mtl_cost,
wko_det_est_lab_cost,
wko_det_note1,
wko_det_varchar1,
wko_det_varchar2,
wko_det_varchar3,
wko_det_varchar4,
wko_det_varchar5,

wko_det_varchar6,
wko_det_varchar7,
wko_det_varchar8,
wko_det_varchar9,
wko_det_varchar10,
wko_det_numeric1,
wko_det_numeric2,
wko_det_numeric3,
wko_det_numeric4,
wko_det_numeric5,

wko_det_datetime1,
wko_det_datetime2,
wko_det_datetime3,
wko_det_datetime4,
wko_det_datetime5,

wko_ls2_assetno,
wko_ls2_stockno,
wko_ls2_stk_locn,
wko_ls2_desc,
wko_ls2_chg_costcenter,
wko_ls2_chg_account,
wko_ls2_qty_needed,
wko_ls2_mtl_uom,
wko_ls2_item_cost,
wko_ls2_mr_no,
wko_ls2_mr_lineno,
mtr_mst_status,
mtr_ls1_rcv_qty,
wko_ls2_po_no,
wko_ls2_po_lineno,

wko_ls3_assetno,
wko_ls3_rec_supplier,
wko_ls3_descr,
wko_ls3_tax_cd,
wko_ls3_mtl_uom,
wko_ls3_qty_needed,
wko_ls3_item_cost,
wko_ls3_chg_costcenter,
wko_ls3_chg_account,
wko_ls3_pr_no,
wko_ls3_pr_lineno,
pur_mst_purq_approve,
pur_ls1_po_no,
pur_ls1_po_lineno,
wko_ls3_po_no,
wko_ls3_po_lineno,

wko_ls4_assetno,
wko_ls4_supplier,
wko_ls4_descr,
wko_ls4_tax_cd,
wko_ls4_svc_uom,
wko_ls4_qty_needed,
wko_ls4_est_cost,
wko_ls4_chg_costcenter,
wko_ls4_chg_account,
wko_ls4_pr_no,
wko_ls4_pr_lineno,
pur_mst_purq_approve,
pur_ls1_po_no,
pur_ls1_po_lineno,
wko_ls4_po_no,
wko_ls4_po_lineno,

wko_ls5_assetno,
wko_ls5_desc,
wko_ls5_uom,
wko_ls5_qty,
wko_ls5_item_cost,
wko_ls5_est_amt,
wko_ls5_costcenter,
wko_ls5_account,

wko_ls8_assetno,
wko_ls8_empl_id,
wko_ls8_craft,
wko_ls8_hours_type,
wko_ls8_hrs,
wko_ls8_rate,
wko_ls8_multiplier,
wko_ls8_adder,
wko_ls8_act_cost,
wko_ls8_chg_costcenter,
wko_ls8_chg_account,
wko_ls8_crd_costcenter,
wko_ls8_crd_account,
wko_ls8_time_card_no,

wko_mst_create_by,
wko_mst_create_date


								
				FROM 	wko_mst (NOLOCK) 

							INNER JOIN		wko_det (NOLOCK)
							ON				wko_mst.site_cd = wko_det.site_cd
							AND				wko_mst.RowID = wko_det.mst_RowID
					
							LEFT 
							OUTER 
							JOIN			wko_ls1 (NOLOCK)
							ON				wko_mst.site_cd = wko_ls1.site_cd
							AND				wko_mst.RowID = wko_ls1.mst_RowID

							LEFT 
							OUTER 
							JOIN			wko_ls5 (NOLOCK)
							ON				wko_mst.site_cd = wko_ls5.site_cd
							AND				wko_mst.RowID = wko_ls5.mst_RowID

							LEFT 
							OUTER 
							JOIN			wko_ls6 (NOLOCK)
							ON				wko_mst.site_cd = wko_ls6.site_cd
							AND				wko_mst.RowID = wko_ls6.mst_RowID

							LEFT 
							OUTER 
							JOIN			wko_sts (NOLOCK)
							ON				wko_mst.site_cd = wko_sts.site_cd
							AND				wko_mst.RowID = wko_sts.mst_RowID
							
							LEFT 
							OUTER 
							JOIN			wko_ls7 (NOLOCK)
							ON				wko_mst.site_cd = wko_ls7.site_cd
							AND				wko_mst.RowID = wko_ls7.mst_RowID
						
							LEFT 
							OUTER 
							JOIN			wko_ls8 (NOLOCK)
							ON				wko_mst.site_cd = wko_ls8.site_cd
							AND				wko_mst.RowID = wko_ls8.mst_RowID
								
							LEFT 
							OUTER 
							JOIN			wko_ref (NOLOCK)
							ON				wko_mst.site_cd = wko_ref.site_cd
							AND				wko_mst.RowID = wko_ref.mst_RowID
									
							LEFT 
							OUTER 
							JOIN			wko_ls2 (NOLOCK)
							ON				wko_mst.site_cd = wko_ls2.site_cd
							AND				wko_mst.RowID = wko_ls2.mst_RowID
									
							LEFT 
							OUTER 
							JOIN			wko_ls3 (NOLOCK)
							ON				wko_mst.site_cd = wko_ls3.site_cd
							AND				wko_mst.RowID = wko_ls3.mst_RowID
									
							LEFT 
							OUTER 
							JOIN			wko_ls4 (NOLOCK)
							ON				wko_mst.site_cd = wko_ls4.site_cd
							AND				wko_mst.RowID = wko_ls4.mst_RowID
			
							LEFT 
							OUTER 
							JOIN			wko_isp (NOLOCK)
							ON				wko_mst.site_cd = wko_isp.site_cd
							AND				wko_mst.RowID = wko_isp.mst_RowID
							
							LEFT 
							OUTER 
							JOIN			mtr_mst (NOLOCK)
							ON				wko_mst.site_cd = mtr_mst.site_cd
							AND				wko_mst.wko_mst_wo_no = mtr_mst.mtr_mst_wo_no

							LEFT 
							OUTER 
							JOIN			mtr_ls1 (NOLOCK)
							ON				wko_mst.site_cd = mtr_ls1.site_cd
							AND				wko_mst.wko_mst_chg_costcenter = mtr_ls1.mtr_ls1_chg_costcenter

							LEFT 
							OUTER 
							JOIN			pur_mst (NOLOCK)
							ON				wko_mst.site_cd = pur_mst.site_cd
							AND				wko_mst.wko_mst_chg_costcenter = pur_mst.pur_mst_chg_costcenter

							LEFT 
							OUTER 
							JOIN			pur_ls1 (NOLOCK)
							ON				wko_mst.site_cd = pur_ls1.site_cd
							AND				wko_mst.wko_mst_wo_no = pur_ls1.pur_ls1_wo_no
							
							
			WHERE  			wko_mst.RowID = '".$RowID."'";


				$stmt_wko_mst = sqlsrv_query( $conn, $sql);

				if( !$stmt_wko_mst ) {
					 $error_message = "Error selecting table (wko_mst)";
					 returnError($error_message);
					 die( print_r( sqlsrv_errors(), true));
					 
				}

				$json = array();

				do {
					 while ($row = sqlsrv_fetch_array($stmt_wko_mst, SQLSRV_FETCH_ASSOC)) {		
						$json[] = $row;	
					
					
					 }
				} while ( sqlsrv_next_result($stmt_wko_mst) );


				



if( $stmt_wko_mst) {
		 sqlsrv_commit( $conn );
		 sqlsrv_close( $conn);	
		 returnData($json);
	} else {
		 sqlsrv_rollback( $conn );
		 $error_message = "Transaction rolled back.<br />";
		 returnError($error_message);
	} 



function returnData($json){
	 $json1 = json_encode($json);
	 //echo$json;
	 
	 if(empty(json_decode($json1,1))) {
     $returnData = array(
	'status' => 'SUCCESS',
	'message' => 'No Records found ',	
	'data' => $json);
}else{
	$returnData = array(
	'status' => 'SUCCESS',
	'message' => 'Successfully',
	'data' => $json);
} 	
	
	echo json_encode($returnData);
}

function returnError($error_message){
	$json = array();
	
	$returnData = array(
	'status' => 'ERROR',
	'message' => $error_message,
	'data' => $json);
	
	echo json_encode($returnData);
	exit();
		
}
	

 
?>