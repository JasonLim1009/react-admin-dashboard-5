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


$json = file_get_contents('php://input');
//to debug the json values;
//file_put_contents("data.json", $json)
// Converts it into a PHP object


$data = json_decode($json, true);


$site_cd = $data['site_cd'];
$ast_mst_asset_no=$data['ast_mst_asset_no'];
$asset_shortdesc= $data['asset_shortdesc'];
$cost_center= $data['cost_center'];
$asset_status= $data['asset_status'];
$asset_type= $data['asset_type'];
$asset_grpcode= $data['asset_grpcode'];
$work_area= $data['work_area'];
$asset_locn= $data['asset_locn'];
$asset_code=$data['asset_code'];
$ast_lvl= $data['ast_lvl'];
$ast_sts_typ_cd =$data['ast_sts_typ_cd'];
$createby=$data['createby'];

$Active =0;
$Deactivate=0;
$Disposed=0;


if (!empty($ast_mst_asset_no)){	
	$where_ast_mst_asset_no = " AND ast_mst.ast_mst_asset_no LIKE '%".$ast_mst_asset_no. "%' ";	
}else{	
	$where_ast_mst_asset_no = "";	
}


if (!empty($asset_shortdesc)){	
	$where_asset_shortdesc = " AND ast_mst.ast_mst_asset_shortdesc like '%".$asset_shortdesc."%' ";	
}else{	
	$where_asset_shortdesc = "";	
}

if (!empty($cost_center)){	
	$where_cost_center = " AND ast_mst.ast_mst_cost_center like '%".$cost_center."%' ";	
}else{	
	$where_cost_center = "";	
}

if (!empty($asset_status)){	
	$where_asset_status = " AND ast_mst.ast_mst_asset_status like '%".$asset_status."%' ";	
}else{	
	$where_asset_status = "";	
}

if (!empty($asset_type)){	
	$where_asset_type = " AND ast_mst.ast_mst_asset_type like '%".$asset_type."%' ";	
}else{	
	$where_asset_type = "";	
}

if (!empty($asset_grpcode)){	
	$where_asset_grpcode = " AND ast_mst.ast_mst_asset_grpcode like '%".$asset_grpcode."%' ";	
}else{	
	$where_asset_grpcode = "";	
}

if (!empty($work_area)){	
	$where_work_area = " AND mst_war_work_area like '%".$work_area."%' ";	
}else{	
	$where_work_area = "";	
}

if (!empty($asset_locn)){	
	$where_asset_locn = " AND ast_mst_asset_locn like '%".$asset_locn."%' ";	
}else{	
	$where_asset_locn = "";	
}

if (!empty($asset_code)){	
	$where_asset_code = " AND ast_mst.ast_mst_asset_code like '%".$asset_code."%' ";	
}else{	
	$where_asset_code = "";	
}

if (!empty($ast_lvl)){	
	$where_ast_lvl = " AND ast_mst.ast_mst_ast_lvl = '".$ast_lvl."' ";	
}else{	
	$where_ast_lvl = "";	
}


if($ast_sts_typ_cd == "Active"){
	
	$where_ast_sts_typ_cd ="AND ast_sts.ast_sts_typ_cd IN ('IN-SERVICE')";
	
}else if($ast_sts_typ_cd == "Deactivate"){
	
	$where_ast_sts_typ_cd ="AND ast_sts.ast_sts_typ_cd IN ('OUT-OF-SERVICE')";
	
}else if($ast_sts_typ_cd == "Disposed"){
	
	$where_ast_sts_typ_cd ="AND ast_sts.ast_sts_typ_cd IN ('AWA-DISPOSED' ,  'DISPOSED')";
	
}else{
	$where_ast_sts_typ_cd ="";
}


if (!empty($createby)){	
	$where_createby = " AND (ast_mst.ast_mst_create_by like '%".$createby."%') ";	
}else{	
	$where_createby = "";	
}

$sql="Select  	ast_mst.site_cd,
				ast_mst.RowID,
				ast_mst_asset_no,
				ast_mst_asset_status,
				ast_sts_desc,
				ast_mst_asset_shortdesc,
				ast_mst_cri_factor,
				ast_cri_desc,
				ast_mst_asset_longdesc,
				ast_mst_perm_id,
				ast_mst_asset_type,
				ast_type_descs,
				ast_mst_work_area,
				mst_war_desc,
				ast_mst_asset_code,
				ast_cod_desc,
				ast_mst_asset_locn,
				ast_loc_desc,
				ast_mst_asset_grpcode,
				ast_grp_desc,
				ast_mst_ast_lvl,
				ast_lvl_desc,
				ast_mst_cost_center,
				descs,
				ast_mst_wrk_grp,
				wrk_grp_desc,
				ast_mst_parent_flag,
				ast_mst_parent_id,
				ast_mst_safety_rqmts,
				ast_mst_print_count,
				ast_det_mfg_cd,
				ast_det_modelno,
				
				ast_mst_asset_code,
				ast_det_purchase_date,
				ast_det_repl_cost,
				ast_det_warranty_date,
				ast_det_depr_term,
				ast_det_cus_code,
				cus_mst_desc,				
				ast_det_depr_method,
				
				ast_det_depr_date,
				ast_det_depr_by,
				ast_det_acc_depr_cost,
				ast_det_net_book_value,
				ast_det_dispose_date,
				ast_det_dispose_by,
				ast_det_dispose_type,
				ast_det_dispose_value,
				
				ast_det_varchar1,
				ast_det_varchar2,
				ast_det_varchar3,
				ast_det_varchar4,
				ast_det_varchar5,
				ast_det_varchar6,
				ast_det_varchar7,
				ast_det_varchar8,
				ast_det_varchar9,
				ast_det_varchar10,
				ast_det_varchar11,
				ast_det_varchar12,
				ast_det_varchar13,
				ast_det_varchar14,
				ast_det_varchar15,
				ast_det_varchar16,
				ast_det_varchar17,
				ast_det_varchar18,
				ast_det_varchar19,
				ast_det_varchar20,
				ast_det_varchar21,
				ast_det_varchar22,
				ast_det_varchar23,
				ast_det_varchar24,
				ast_det_varchar25,
				ast_det_varchar26,
				ast_det_varchar27,
				ast_det_varchar28,
				ast_det_varchar29,
				ast_det_varchar30,
				ast_det_numeric1,
				ast_det_numeric2,
				ast_det_numeric3,
				ast_det_numeric4,
				ast_det_numeric5,
				ast_det_numeric6,
				ast_det_numeric7,
				ast_det_numeric8,
				ast_det_numeric9,
				ast_det_numeric10,
				ast_det_numeric11,
				ast_det_numeric12,
				ast_det_numeric13,
				ast_det_numeric14,
				ast_det_numeric15,
				ast_det_numeric16,
				ast_det_numeric17,
				ast_det_numeric18,
				ast_det_numeric19,
				ast_det_numeric20,
				ast_det_datetime1,
				ast_det_datetime2,
				ast_det_datetime3,
				ast_det_datetime4,
				ast_det_datetime5,
				ast_det_datetime6,
				ast_det_datetime7,
				ast_det_datetime8,
				ast_det_datetime9,
				ast_det_datetime10,
				ast_det_datetime11,
				ast_det_datetime12,
				ast_det_datetime13,
				ast_det_datetime14,
				ast_det_datetime15,
				ast_det_datetime16,
				ast_det_datetime17,
				ast_det_datetime18,
				ast_det_datetime19,
				ast_det_datetime20
				
								
				FROM 	ast_mst (NOLOCK) 

							INNER JOIN		ast_det (NOLOCK)
							ON				ast_mst.site_cd = ast_det.site_cd
							AND				ast_mst.rowid = ast_det.mst_rowid
					
							INNER JOIN		ast_sts (NOLOCK)
							ON				ast_mst.site_cd = ast_sts.site_cd
							AND				ast_mst.ast_mst_asset_status = ast_sts.ast_sts_status

							LEFT 
							OUTER 
							JOIN			ast_grp (NOLOCK)
							ON				ast_mst.site_cd = ast_grp.site_cd
							AND				ast_mst.ast_mst_asset_grpcode = ast_grp.ast_grp_grp_cd


							LEFT 
							OUTER 
							JOIN			ast_type (NOLOCK)
							ON				ast_mst.site_cd = ast_type.site_cd
							AND				ast_mst.ast_mst_asset_type = ast_type.ast_type_cd

							LEFT 
							OUTER 
							JOIN			ast_cod (NOLOCK)
							ON				ast_mst.site_cd = ast_cod.site_cd
							AND				ast_mst.ast_mst_asset_code = ast_cod.ast_cod_ast_cd


							LEFT 
							OUTER 
							JOIN			mst_war (NOLOCK)
							ON				ast_mst.site_cd = mst_war.site_cd
							AND				ast_mst.ast_mst_work_area = mst_war.mst_war_work_area


							LEFT 
							OUTER 
							JOIN			ast_loc (NOLOCK)
							ON				ast_mst.site_cd = ast_loc.site_cd
							AND				ast_mst.ast_mst_asset_locn = ast_loc.ast_loc_ast_loc


							LEFT 
							OUTER 
							JOIN			ast_lvl (NOLOCK)
							ON				ast_mst.site_cd = ast_lvl.site_cd
							AND				ast_mst.ast_mst_ast_lvl = ast_lvl.ast_lvl_ast_lvl


							LEFT 
							OUTER 
							JOIN			ast_cri (NOLOCK)
							ON				ast_mst.site_cd = ast_cri.site_cd
							AND				ast_mst.ast_mst_cri_factor = ast_cri.ast_cri_cri_factor


							LEFT 
							OUTER 
							JOIN			cf_cost_center (NOLOCK)
							ON				ast_mst.site_cd = cf_cost_center.site_cd
							AND				ast_mst.ast_mst_cost_center = cf_cost_center.costcenter
							
							
							
							LEFT 
							OUTER 
							JOIN		wrk_grp (NOLOCK)
							ON			ast_mst.site_cd = wrk_grp.site_cd
							AND			ast_mst.ast_mst_wrk_grp = wrk_grp.wrk_grp_grp_cd
							
							LEFT 
							OUTER 
							JOIN		cus_mst (NOLOCK)
							ON			ast_det.site_cd = cus_mst.site_cd
							AND			ast_det.ast_det_cus_code = cus_mst.cus_mst_customer_cd
							
							
						

				

			WHERE  			(ast_mst.site_cd = '".$site_cd."' )".
							$where_ast_mst_asset_no.
							$where_asset_shortdesc.
							$where_cost_center.
							$where_asset_status.
							$where_asset_type.
							$where_asset_grpcode.
							$where_work_area.
							$where_asset_locn.
							$where_asset_code.
							$where_ast_lvl.
							$where_ast_sts_typ_cd.
							$where_createby."  ORDER BY ast_mst_asset_no , ast_mst_asset_shortdesc ";


				$stmt_asset_list = sqlsrv_query( $conn, $sql);

				if( !$stmt_asset_list ) {
					 $error_message = "Error selecting table (emp_mst)";
					 returnError($error_message);
					 die( print_r( sqlsrv_errors(), true));
					 
				}

				$json = array();

				do {
					 while ($row = sqlsrv_fetch_array($stmt_asset_list, SQLSRV_FETCH_ASSOC)) {		
						$json[] = $row;	
					
					 }
				} while ( sqlsrv_next_result($stmt_asset_list) );


				
$sql="SELECT	Active = COALESCE(SUM(Active),'' ), Deactivate = COALESCE(SUM(Deactivate),'' ), Disposed = COALESCE(SUM(Disposed),'' )
	  From (	SELECT 		Active 		= SUM(CASE ast_sts.ast_sts_typ_cd WHEN 'IN-SERVICE' THEN 1 ELSE 0 END),
							Deactivate	= SUM(CASE ast_sts.ast_sts_typ_cd WHEN 'OUT-OF-SERVICE' THEN 1 ELSE 0 END),
							Disposed 	= SUM(CASE ast_sts.ast_sts_typ_cd WHEN 'AWA-DISPOSED' THEN 1 WHEN 'DISPOSED' THEN 1 ELSE 0 END)
		FROM 		ast_mst (NOLOCK)

						INNER JOIN		ast_sts (NOLOCK)
						ON				ast_mst.site_cd = ast_sts.site_cd
						AND				ast_mst.ast_mst_asset_status = ast_sts.ast_sts_status

						INNER JOIN		ast_det (NOLOCK)
						ON				ast_mst.site_cd = ast_det.site_cd
						AND				ast_mst.rowid = ast_det.mst_rowid

						LEFT 
						OUTER 
						JOIN			mst_war (NOLOCK)
						ON				ast_mst.site_cd = mst_war.site_cd
						AND				ast_mst.ast_mst_work_area = mst_war.mst_war_work_area
			
			WHERE  			(ast_mst.site_cd = '".$site_cd."')".
							$where_ast_mst_asset_no.
							$where_asset_shortdesc.
							$where_cost_center.
							$where_asset_status.
							$where_asset_type.
							$where_asset_grpcode.
							$where_work_area.
							$where_asset_locn.
							$where_asset_code.
							$where_ast_lvl.
							//$where_ast_sts_typ_cd.
							$where_createby. ") as x" ;




$stmt_count = sqlsrv_query( $conn, $sql);

if( !$stmt_count ) {
     $error_message = "Error selecting table (ast_mst)";
	 returnError($error_message);
     die( print_r( sqlsrv_errors(), true));
	 
}
do {
     while ($row = sqlsrv_fetch_array($stmt_count, SQLSRV_FETCH_ASSOC)) {		
		$Active = $row['Active'];
		$Deactivate = $row['Deactivate'];
		$Disposed = $row['Disposed'];
	
     }
} while ( sqlsrv_next_result($stmt_count) );


if( $stmt_asset_list && $stmt_count) {
		 sqlsrv_commit( $conn );
		 sqlsrv_close( $conn);	
		 returnData($json,$Active,$Deactivate,$Disposed);	
	} else {
		 sqlsrv_rollback( $conn );
		 $error_message = "Transaction rolled back.<br />";
		 returnError($error_message);
	} 



function returnData($json,$Active,$Deactivate,$Disposed){
	 $json1 = json_encode($json);
	 //echo$json;
	 
	 if(empty(json_decode($json1,1))) {
     $returnData = array(
	 'Active'=>$Active,
	'Deactivate'=>$Deactivate,
	'Disposed'=>$Disposed,
	'status' => 'SUCCESS',
	'message' => 'No Records found ',	
	'data' => $json);
}else{
	$returnData = array(
	'status' => 'SUCCESS',
	'message' => 'Successfully',
	'Active'=>$Active,
	'Deactivate'=>$Deactivate,
	'Disposed'=>$Disposed,
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