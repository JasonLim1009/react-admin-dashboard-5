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

wkr_mst_wr_no,
wkr_mst_wr_descs,
wkr_mst_wr_status,
wkr_mst_assetno,
wkr_mst_chg_costcenter,
wkr_mst_work_area,
wkr_mst_assetlocn,
wkr_mst_location,
wkr_mst_temp_asset,
wkr_mst_email_notification,
wkr_mst_work_type,
wkr_mst_work_class,
wkr_mst_work_group,
wkr_mst_wo_status,
wkr_mst_projectid,
wkr_mst_originator,
wkr_mst_phone,

wkr_det_note1,
wkr_det_note2,
wkr_det_varchar1,
wkr_det_varchar2,
wkr_det_varchar3,
wkr_det_varchar4,
wkr_det_varchar5,
wkr_det_varchar6,
wkr_det_varchar7,
wkr_det_varchar8,
wkr_det_varchar9,
wkr_det_varchar10,
wkr_det_varchar11,
wkr_det_varchar12,
wkr_det_varchar13,
wkr_det_varchar14,
wkr_det_varchar15,
wkr_det_varchar16,
wkr_det_varchar17,
wkr_det_varchar18,
wkr_det_varchar19,
wkr_det_varchar20,

wkr_det_numeric1,
wkr_det_numeric2,
wkr_det_numeric3,
wkr_det_numeric4,
wkr_det_numeric5,
wkr_det_numeric6,
wkr_det_numeric7,
wkr_det_numeric8,
wkr_det_numeric9,
wkr_det_numeric10,

wkr_det_datetime1,
wkr_det_datetime2,
wkr_det_datetime3,
wkr_det_datetime4,
wkr_det_datetime5,
wkr_det_datetime6,
wkr_det_datetime7,
wkr_det_datetime8,
wkr_det_datetime9,
wkr_det_datetime10,

wkr_det_approver,
wkr_det_appr_date,
wkr_det_reject_desc,
wkr_det_reject_by,
wkr_det_reject_date,
wkr_mst_orig_priority,
wkr_det_wo,
wko_mst_status,

wkr_mst_org_date,
wkr_mst_due_date,
wkr_mst_fault_code,
wkr_mst_create_by,
wkr_mst_create_date


								
					FROM 	wkr_mst  (NOLOCK)

							INNER JOIN		wkr_det (NOLOCK)
							ON				wkr_mst.site_cd = wkr_det.site_cd
							AND				wkr_mst.RowID = wkr_det.mst_RowID

							LEFT 
							OUTER 
							JOIN			wkr_ls1 (NOLOCK)
							ON				wkr_mst.site_cd = wkr_ls1.site_cd
							AND				wkr_mst.RowID = wkr_ls1.mst_RowID

							LEFT 
							OUTER 
							JOIN			wkr_ls2 (NOLOCK)
							ON				wkr_mst.site_cd = wkr_ls2.site_cd
							AND				wkr_mst.RowID = wkr_ls2.mst_RowID
							
							LEFT 
							OUTER 
							JOIN			wkr_ref (NOLOCK)
							ON				wkr_mst.site_cd = wkr_ref.site_cd
							AND				wkr_mst.RowID = wkr_ref.mst_RowID
							
							
							LEFT 
							OUTER 
							JOIN			wko_mst (NOLOCK)
							ON				wkr_det.site_cd = wko_mst.site_cd
							AND				wkr_det.wkr_det_wo = wko_mst.wko_mst_wo_no
								
							
							
			WHERE  			wkr_mst.RowID = '".$RowID."'";


				$stmt_wkr_mst = sqlsrv_query( $conn, $sql);

				if( !$stmt_wkr_mst ) {
					 $error_message = "Error selecting table (wkr_mst)";
					 returnError($error_message);
					 die( print_r( sqlsrv_errors(), true));
					 
				}

				$json = array();

				do {
					 while ($row = sqlsrv_fetch_array($stmt_wkr_mst, SQLSRV_FETCH_ASSOC)) {		
						$json[] = $row;	
					
					
					 }
				} while ( sqlsrv_next_result($stmt_wkr_mst) );


				



if( $stmt_wkr_mst) {
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