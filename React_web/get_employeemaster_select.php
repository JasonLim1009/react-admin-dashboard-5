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

emp_mst_empl_id,
emp_mst_name ,
emp_mst_status,
emp_mst_title ,
emp_mst_usr_grp, 
emp_mst_login_id,
emp_mst_dash_access,

emp_mst_homephone,
emp_mst_date_of_birth,
emp_mst_emg_name,
emp_mst_dateofhire,
emp_mst_emg_phone,
emp_mst_payrate,
emp_mst_sex,
emp_mst_pay_period,
emp_mst_marital_status,
emp_det_shift,
emp_det_email_id,
emp_det_supervisor_id,
emp_det_craft,
emp_det_work_area,
emp_det_work_grp,
emp_mst_remarks,

emp_det_mr_limit,
emp_det_wo_approval_limit,
emp_det_pr_approval_limit,
emp_det_mr_approver,
emp_det_wo_budget_approver,
emp_det_pr_approver,

emp_det_wr_approver,
emp_det_planner,
emp_det_wo_gen_mr_pr,
emp_det_pm_generator,
emp_det_time_card_enter,
emp_det_time_card_void,
emp_det_core,

emp_det_wo_sched,
emp_det_po_buyer,
emp_det_supervisor,
emp_det_foreman,
emp_det_asset_tag_flag,
emp_det_msetup_mobile_user,
emp_det_checklist,
emp_det_mobile,
emp_det_webwork,

emp_det_note1,
emp_det_varchar1,
emp_det_varchar2,
emp_det_varchar3,
emp_det_varchar4,
emp_det_varchar5,
emp_det_varchar6,
emp_det_varchar7,
emp_det_varchar8,
emp_det_varchar9,
emp_det_varchar10,

emp_det_note2,
emp_det_varchar11,
emp_det_varchar12,
emp_det_varchar13,
emp_det_varchar14,
emp_det_varchar15,
emp_det_varchar16,
emp_det_varchar17,
emp_det_varchar18,
emp_det_varchar19,
emp_det_varchar20,

emp_det_numeric1,
emp_det_numeric2,
emp_det_numeric3,
emp_det_numeric4,
emp_det_numeric5,
emp_det_numeric6,
emp_det_numeric7,
emp_det_numeric8,
emp_det_numeric9,
emp_det_numeric10,

emp_det_datetime1,
emp_det_datetime2,
emp_det_datetime3,
emp_det_datetime4,
emp_det_datetime5,
emp_det_datetime6,
emp_det_datetime7,
emp_det_datetime8,
emp_det_datetime9,
emp_det_datetime10,

emp_mst_create_by,
emp_mst_create_date


								
				FROM 	emp_mst (NOLOCK) 

							INNER JOIN		emp_det (NOLOCK)
							ON				emp_mst.site_cd = emp_det.site_cd
							AND				emp_mst.RowID = emp_det.mst_RowID
					
							LEFT 
							OUTER 
							JOIN			emp_ls1 (NOLOCK)
							ON				emp_mst.site_cd = emp_ls1.site_cd
							AND				emp_mst.RowID = emp_ls1.mst_RowID

							LEFT 
							OUTER 
							JOIN			emp_ls2 (NOLOCK)
							ON				emp_mst.site_cd = emp_ls2.site_cd
							AND				emp_mst.RowID = emp_ls2.mst_RowID

							LEFT 
							OUTER 
							JOIN			emp_ref (NOLOCK)
							ON				emp_mst.site_cd = emp_ref.site_cd
							AND				emp_mst.RowID = emp_ref.mst_RowID

							LEFT 
							OUTER 
							JOIN			emp_ls3 (NOLOCK)
							ON				emp_mst.site_cd = emp_ls3.site_cd
							AND				emp_mst.RowID = emp_ls3.mst_RowID


			WHERE  			emp_mst.RowID = '".$RowID."'";


				$stmt_emp_mst = sqlsrv_query( $conn, $sql);

				if( !$stmt_emp_mst ) {
					 $error_message = "Error selecting table (emp_mst)";
					 returnError($error_message);
					 die( print_r( sqlsrv_errors(), true));
					 
				}

				$json = array();

				do {
					 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
						$json[] = $row;	
					
					
					 }
				} while ( sqlsrv_next_result($stmt_emp_mst) );


				



if( $stmt_emp_mst) {
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