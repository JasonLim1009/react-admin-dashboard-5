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

itm_mst_type,
itm_mst_stockno,
itm_mst_mstr_locn,
itm_mst_costcenter,
itm_mst_itm_grp,
itm_mst_itm_use,
itm_mst_com_code,
itm_mst_account,
itm_mst_ttl_oh,
itm_mst_desc,

itm_mst_ext_desc,
itm_mst_issue_price,
itm_mst_order_rule,
itm_mst_partno,
itm_mst_serialize_counter,
itm_det_issue_uom,
itm_det_rcv_uom,
itm_det_hzd_mtl,
itm_det_auto_spare,
itm_det_critical_spare,
itm_det_abc_class,

itm_det_storage_type,
itm_det_acct_type,
itm_det_tax_cd,
itm_det_part_deac_status,
itm_det_order_pt,
itm_det_cube,
itm_det_maximum,
itm_det_shelf_life,
itm_det_lastactdate,
itm_det_lastcntdate,
itm_det_next_cnt_date,

itm_det_ytd_stockouts,
itm_det_std_cost,
itm_det_avg_cost,
itm_det_last_cost,
itm_det_ttl_hard_resrv,

itm_det_ttl_short,
	
itm_det_ttl_repair,
itm_det_note1,
itm_det_varchar1,
itm_det_varchar2,
itm_det_varchar3,
itm_det_varchar4,
itm_det_varchar5,
itm_det_varchar6,

itm_det_varchar7,
itm_det_varchar8,
itm_det_varchar9,
itm_det_varchar10,
itm_det_numeric1,
itm_det_numeric2,
itm_det_numeric3,
itm_det_numeric4,
itm_det_numeric5,
itm_det_datetime1,

itm_det_datetime2,
itm_det_datetime3,
itm_det_datetime4,
itm_det_datetime5,

itm_mst_create_by,
itm_mst_create_date


								
				FROM 	itm_mst (NOLOCK) 

							INNER JOIN		itm_det (NOLOCK)
							ON				itm_mst.site_cd = itm_det.site_cd
							AND				itm_mst.RowID = itm_det.mst_RowID
					
							LEFT 
							OUTER 
							JOIN			itm_loc (NOLOCK)
							ON				itm_mst.site_cd = itm_loc.site_cd
							AND				itm_mst.RowID = itm_loc.mst_RowID

							LEFT 
							OUTER 
							JOIN			itm_sup (NOLOCK)
							ON				itm_mst.site_cd = itm_sup.site_cd
							AND				itm_mst.RowID = itm_sup.mst_RowID

							LEFT 
							OUTER 
							JOIN			itm_trx (NOLOCK)
							ON				itm_mst.site_cd = itm_trx.site_cd
							AND				itm_mst.RowID = itm_trx.RowID

							LEFT 
							OUTER 
							JOIN			itm_rsv (NOLOCK)
							ON				itm_mst.site_cd = itm_rsv.site_cd
							AND				itm_mst.RowID = itm_rsv.RowID
							
							LEFT 
							OUTER 
							JOIN			itm_ser (NOLOCK)
							ON				itm_mst.site_cd = itm_ser.site_cd
							AND				itm_mst.RowID = itm_ser.mst_RowID
						
							LEFT 
							OUTER 
							JOIN			itm_ref (NOLOCK)
							ON				itm_mst.site_cd = itm_ref.site_cd
							AND				itm_mst.RowID = itm_ref.mst_RowID
								
							
							
							
			WHERE  			itm_mst.RowID = '".$RowID."'";


				$stmt_itm_mst = sqlsrv_query( $conn, $sql);

				if( !$stmt_itm_mst ) {
					 $error_message = "Error selecting table (itm_mst)";
					 returnError($error_message);
					 die( print_r( sqlsrv_errors(), true));
					 
				}

				$json = array();

				do {
					 while ($row = sqlsrv_fetch_array($stmt_itm_mst, SQLSRV_FETCH_ASSOC)) {		
						$json[] = $row;	
					
					
					 }
				} while ( sqlsrv_next_result($stmt_itm_mst) );


				



if( $stmt_itm_mst) {
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