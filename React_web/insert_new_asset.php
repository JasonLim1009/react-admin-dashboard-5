<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once ('config.php');


/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}
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

$ast_det_numeric21 = $data['ast_det_numeric21'];
$ast_det_numeric22 = $data['ast_det_numeric22'];
$ast_det_numeric23 = $data['ast_det_numeric23'];
$ast_det_numeric24 = $data['ast_det_numeric24'];
$ast_det_numeric25 = $data['ast_det_numeric25'];
$ast_det_numeric26 = $data['ast_det_numeric26'];
$ast_det_numeric27 = $data['ast_det_numeric27'];
$ast_det_numeric28 = $data['ast_det_numeric28'];
$ast_det_numeric29 = $data['ast_det_numeric29'];
$ast_det_numeric30 = $data['ast_det_numeric30'];

$ast_det_datetime1 = $data['ast_det_datetime1'];



$asset_type_ID = $data['asset_type_ID'];
$audit_user = $data['audit_user'];
$ast_mst_create_by = $data['ast_mst_create_by'];
$ast_aud_originator = $data['ast_aud_originator'];



 
switch ($asset_type_ID) {	

	case 'MM':
	$ast_mst_auto_no ='0';
	
	$sql = "Select Count(*) ll_dup_cnt	From ast_mst (NOLOCK)
			Where site_cd = '".$site_cd."'
			And ast_mst_asset_no = '".$ast_mst_asset_no."'";			
			
			$stmt = sqlsrv_query( $conn, $sql);	
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ll_dup_cnt = $row['ll_dup_cnt'];
					 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		if($ll_dup_cnt == 1){	
			$error_message = "Asset number is already exists";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
	 
	break;
	case 'MG':
	
	$ast_mst_auto_no ='0';
	 
	 switch ($asset_group_ID) {
		 case '0':
		 
		 $sql = "Select Count(*) ll_dup_cnt	From ast_mst (NOLOCK)
			Where site_cd = '".$site_cd."'
			And ast_mst_asset_no = '".$ast_mst_asset_no."'";			
			
			$stmt = sqlsrv_query( $conn, $sql);	
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ll_dup_cnt = $row['ll_dup_cnt'];
					 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		if($ll_dup_cnt == 1){	
			$error_message = "Asset number is already exists";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		 
		 break;		 
		 case '1':
		
		 
		 $sql = "Select ast_grp_grp_cd + COALESCE(ast_grp_separator, '') + SUBSTRING(CONVERT(VARCHAR(7), ast_grp_counter + 1000000), 2, 6) ls_doc_no
				From 	ast_grp WITH (UPDLOCK)
				Where 	site_cd = '".$site_cd."'
				And 	ast_grp_grp_cd = '".$asset_group."' ;	
				UPDATE 	ast_grp WITH (UPDLOCK)
				SET 	ast_grp_counter = ast_grp_counter + 1
				WHERE 	site_cd = '".$site_cd."' 
				AND 	ast_grp_grp_cd = '".$asset_group."'";			
			
			$stmt = sqlsrv_query( $conn, $sql);			
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ls_doc_no = $row['ls_doc_no'];
				
				$ast_mst_asset_no = $ls_doc_no;
					 	 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		$sql = "Select Count(*) ll_dup_cnt	From ast_mst (NOLOCK)
			Where site_cd = '".$site_cd."'
			And ast_mst_asset_no = '".$ls_doc_no."'";			
			
			$stmt = sqlsrv_query( $conn, $sql);	
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ll_dup_cnt = $row['ll_dup_cnt'];
				 	 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		if($ll_dup_cnt == 1){	
			$error_message = "Asset number is already exists";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		
		 break;
		 
	 } 
	 
	break;
	case 'AM':	
	
	$ast_mst_auto_no ='1';
	 
	 $sql = "Select cnt_mst_prefix + SUBSTRING(CONVERT(VARCHAR(7), cnt_mst_counter + 1000000), 2, 6)  ls_doc_no
			From 		cnt_mst WITH (UPDLOCK)
			Where 	site_cd ='".$site_cd."'
			And 	cnt_mst_module_cd =  'AST'
			UPDATE 	cnt_mst WITH (UPDLOCK)
			SET 		cnt_mst_counter = cnt_mst_counter + 1
			WHERE 	site_cd ='".$site_cd."' 
			AND 	cnt_mst_module_cd =  'AST'";			
			
			$stmt = sqlsrv_query( $conn, $sql);			
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ls_doc_no = $row['ls_doc_no'];				
				$ast_mst_asset_no = $ls_doc_no;
					 	 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
	
	
	$sql = "Select Count(*) ll_dup_cnt	From ast_mst (NOLOCK)
			Where site_cd = '".$site_cd."'
			And ast_mst_asset_no = '".$ls_doc_no."'";			
			
			$stmt = sqlsrv_query( $conn, $sql);	
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ll_dup_cnt = $row['ll_dup_cnt'];
					 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		if($ll_dup_cnt == 1){	
			$error_message = "Asset number is already exists";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		} 
	 
	break;
	case 'AG':	 
	 
	 switch ($asset_group_ID) {
		 case '0':		 
		 $ast_mst_auto_no ='1';
		 
		 $sql = "Select Count(*) ll_dup_cnt	From ast_mst (NOLOCK)
			Where site_cd = '".$site_cd."'
			And ast_mst_asset_no = '".ast_mst_asset_no."'";			
			
			$stmt = sqlsrv_query( $conn, $sql);	
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ll_dup_cnt = $row['ll_dup_cnt'];
					 	 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		if($ll_dup_cnt == 1){	
			$error_message = "Asset number is already exists";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		
		 break;
		 
		 case '1':
		$ast_mst_auto_no ='1';
		 
		 $sql = "Select ast_grp_grp_cd + COALESCE(ast_grp_separator, '') + SUBSTRING(CONVERT(VARCHAR(7), ast_grp_counter + 1000000), 2, 6) ls_doc_no
				From 	ast_grp WITH (UPDLOCK)
				Where 	site_cd = '".$site_cd."'
				And 	ast_grp_grp_cd = '".$asset_group."' ;	
				UPDATE 	ast_grp WITH (UPDLOCK)
				SET 	ast_grp_counter = ast_grp_counter + 1
				WHERE 	site_cd = '".$site_cd."' 
				AND 	ast_grp_grp_cd = '".$asset_group."'";			
			
			$stmt = sqlsrv_query( $conn, $sql);			
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ls_doc_no = $row['ls_doc_no'];				
				$ast_mst_asset_no = $ls_doc_no;
					 	 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		$sql = "Select Count(*) ll_dup_cnt	From ast_mst (NOLOCK)
			Where site_cd = '".$site_cd."'
			And ast_mst_asset_no = '".$ls_doc_no."'";			
			
			$stmt = sqlsrv_query( $conn, $sql);	
			if( !$stmt ) {
				$error_message = "Error update table (itm_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	 
				$ll_dup_cnt = $row['ll_dup_cnt'];
				 	 
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		
		if($ll_dup_cnt == 1){	
			$error_message = "Asset number is already exists";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		 break;
		 
	 } 
	break;
}



$sql_insert_ast_mst = "INSERT INTO ast_mst
						(		site_cd,				ast_mst_asset_no,		ast_mst_asset_type,			ast_mst_asset_grpcode, 
								ast_mst_asset_status,	ast_mst_work_area,		ast_mst_cri_factor,			ast_mst_cost_center, 
								ast_mst_asset_locn,		ast_mst_safety_rqmts,	ast_mst_asset_shortdesc,	ast_mst_asset_longdesc, 
								ast_mst_ast_lvl,		ast_mst_parent_id,		ast_mst_asset_code,			ast_mst_assigned_to, 
								ast_mst_fda_code,		ast_mst_parent_flag,	ast_mst_auto_no,			audit_user, 
								audit_date,				ast_mst_create_by,		ast_mst_create_date,		ast_mst_wrk_grp, 
								ast_mst_print_count,	ast_mst_perm_id,		column1,					column2, 
								column3,				column4,				column5 )
												
				VALUES (		?,						?,						?,							?,
								?,						?,						?,							?,
								?,						?,						?,							?,
								?,						?,						?,							NULL,
								NULL,					?,						?,							?,
								GetDate(),				?,						GetDate(),					?,
								'0',					?,						NULL,						NULL,
								NULL,					NULL,					NULL) ";
								
								
$params_ast_mst = array(		$site_cd,				$ast_mst_asset_no,		$ast_mst_asset_type,		$ast_mst_asset_grpcode,
								$ast_mst_asset_status,	$ast_mst_work_area,		$ast_mst_cri_factor,		$ast_mst_cost_center,
								$ast_mst_asset_locn,	$ast_mst_safety_rqmts,	$ast_mst_asset_shortdesc,	$ast_mst_asset_longdesc,
								$ast_mst_ast_lvl,		$ast_mst_parent_id,		$ast_mst_asset_code,		$ast_mst_parent_flag,
								$ast_mst_auto_no,		$audit_user,			$ast_mst_create_by,			$ast_mst_wrk_grp,
								$ast_mst_perm_id);	
								
$stmt_ast_mst = sqlsrv_query( $conn, $sql_insert_ast_mst,$params_ast_mst);	
if( !$stmt_ast_mst ) {
	$error_message = "Error insert table (INSERT Table ast_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_ast_mst);	


$sql = "SELECT Rowid 
	From ast_mst 
	WHERE site_cd = '".$site_cd."' 
	AND ast_mst_asset_no = '".$ast_mst_asset_no."'";		
$stmt = sqlsrv_query( $conn, $sql);			
if( !$stmt ) {
	$error_message = "Error update table (itm_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
	 
	 $ROW_ID = $row['Rowid'];		
	 	 
   }
} while ( sqlsrv_next_result($stmt));
sqlsrv_free_stmt( $stmt);


$sql = "SELECT dft_mst_lab_act,dft_mst_mat_act,dft_mst_con_act 
		From dft_mst 
		WHERE site_cd = '".$site_cd."'";		
$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "Error update table (itm_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
	 
	 $dft_mst_lab_act = $row['dft_mst_lab_act'];
	 $dft_mst_mat_act = $row['dft_mst_mat_act'];
	 $dft_mst_con_act = $row['dft_mst_con_act'];

	 	 
   }
} while ( sqlsrv_next_result($stmt));
sqlsrv_free_stmt( $stmt);


$sql_insert_ast_det = "INSERT INTO ast_det
						(	site_cd,					mst_RowID,					ast_det_asset_cost,				ast_det_mtdlabcost,					ast_det_mtdmtlcost, 
							ast_det_mtdconcost,			ast_det_ytdlabcost,			ast_det_ytdmtlcost,				ast_det_ytdconcost,					ast_det_ltdlabcost, 
							ast_det_ltdmtlcost,			ast_det_ltdconcost,			ast_det_warranty_date,			ast_det_depr_term,					ast_det_eqhr_level, 
							ast_det_repl_cost,			ast_det_l_account,			ast_det_m_account,				ast_det_c_account,					ast_det_taxable, 
							ast_det_ent_date,			ast_det_purchase_date,		ast_det_depr_date,				ast_det_acc_depr_cost,				ast_det_net_book_value, 	
							ast_det_depr_by,			ast_det_depr_method,		ast_det_dispose_date,			ast_det_dispose_value,				ast_det_dispose_type, 
							ast_det_dispose_by,			ast_det_varchar1,			ast_det_varchar2,				ast_det_varchar3,					ast_det_varchar4, 
							ast_det_varchar5,			ast_det_varchar6,			ast_det_varchar7,				ast_det_varchar8,					ast_det_varchar9, 
							ast_det_varchar10,			ast_det_varchar11,			ast_det_varchar12,				ast_det_varchar13,					ast_det_varchar14, 
							ast_det_varchar15,			ast_det_varchar16,			ast_det_varchar17,				ast_det_varchar18,					ast_det_varchar19, 
							ast_det_varchar20,			ast_det_varchar21,			ast_det_varchar22,				ast_det_varchar23,					ast_det_varchar24, 
							ast_det_varchar25,			ast_det_varchar26,			ast_det_varchar27,				ast_det_varchar28,					ast_det_varchar29, 
							ast_det_varchar30,			ast_det_numeric1,			ast_det_numeric2,				ast_det_numeric3,					ast_det_numeric4, 
							ast_det_numeric5,			ast_det_numeric6,			ast_det_numeric7,				ast_det_numeric8,					ast_det_numeric9, 
							ast_det_numeric10,			ast_det_numeric11,			ast_det_numeric12,				ast_det_numeric13,					ast_det_numeric14, 
							ast_det_numeric15,			ast_det_numeric16,			ast_det_numeric17,				ast_det_numeric18,					ast_det_numeric19, 
							ast_det_numeric20,			ast_det_datetime1,			ast_det_datetime2,				ast_det_datetime3,					ast_det_datetime4, 
							ast_det_datetime5,			ast_det_datetime6,			ast_det_datetime7,				ast_det_datetime8,					ast_det_datetime9, 
							ast_det_datetime10,			ast_det_datetime11,			ast_det_datetime12,				ast_det_datetime13,					ast_det_datetime14, 
							ast_det_datetime15,			ast_det_datetime16,			ast_det_datetime17,				ast_det_datetime18,					ast_det_datetime19, 
							ast_det_datetime20,			ast_det_note1,				ast_det_note2,					ast_det_note3,						ast_det_cus_code, 
							ast_det_s_account,			ast_det_mtdmisccost,		ast_det_ytdmisccost,			ast_det_ltdmisccost,				ast_det_mfg_cd,
							ast_det_modelno,			audit_user,					audit_date,						column1,							column2, 
							column3,					column4,					column5 ) 
												
		VALUES 
						(	?,							?,							'0.0000',						'0.0000',							'0.0000',
							'0.0000',					'0.0000',					'0.0000',						'0.0000',							'0.0000',
							'0.0000',					'0.0000',					?,								NULL,								NULL,
							'0.0000',					NULL,						NULL,							NULL,								'N',
							NULL,						GetDate(),					NULL,							'0.0000',							'0.0000',
							NULL,						'SL',						NULL,							NULL,								NULL,
							NULL,						?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							?,								?,									?,
							?,							?,							NULL,							NULL,								NULL,
							NULL,						NULL,						NULL,							NULL,								NULL,
							NULL,						NULL,						NULL,							NULL,								NULL,
							NULL,						NULL,						NULL,							NULL,								NULL,
							NULL,						NULL,						NULL,							NULL,								NULL,
							NULL,						NULL,						NULL,							NULL,								?,
							?,							?,							GetDate(),						NULL,								NULL,
							NULL,						NULL,						NULL )";


$params_ast_det = array(	$site_cd,					$ROW_ID,					$ast_det_warranty_date,			$ast_det_repl_cost,					$ast_det_varchar1,
							$ast_det_varchar2,			$ast_det_varchar3,			$ast_det_varchar4,				$ast_det_varchar5,					$ast_det_varchar6,
							$ast_det_varchar7,			$ast_det_varchar8,			$ast_det_varchar9,				$ast_det_varchar10,					$ast_det_varchar11,
							$ast_det_varchar12,			$ast_det_varchar13,			$ast_det_varchar14,				$ast_det_varchar15,					$ast_det_varchar16,
							$ast_det_varchar17,			$ast_det_varchar18,			$ast_det_varchar19,				$ast_det_varchar20,					$ast_det_varchar21,
							$ast_det_varchar22,			$ast_det_varchar23,			$ast_det_varchar24,				$ast_det_varchar25,					$ast_det_varchar26,
							$ast_det_varchar27,			$ast_det_varchar28,			$ast_det_varchar29,				$ast_det_varchar30,					$ast_det_numeric1,
							$ast_det_numeric2,			$ast_det_numeric3,			$ast_det_numeric4,				$ast_det_numeric5,					$ast_det_numeric6,	
							$ast_det_numeric7,			$ast_det_numeric8,			$ast_det_numeric9,				$ast_det_numeric10,					$ast_det_numeric11,
							$ast_det_numeric12,			$ast_det_numeric13,			$ast_det_numeric14,				$ast_det_numeric15,					$ast_det_numeric16,
							$ast_det_numeric17,			$ast_det_numeric18,			$ast_det_numeric19,				$ast_det_numeric20,					$ast_det_datetime1,
							$ast_det_mfg_cd, 			$ast_det_modelno,			$audit_user);	
$stmt_ast_det = sqlsrv_query( $conn, $sql_insert_ast_det,$params_ast_det);	
if( !$stmt_ast_det ) {
$error_message = "Error insert table (INSERT Table ast_mst)";
returnError($error_message);
die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_ast_det);



$sql_insert_ast_aud = "INSERT INTO ast_aud
						(	site_cd ,					mst_RowID ,				ast_aud_asset_no ,			ast_aud_status ,				ast_aud_originator , 
							ast_aud_start_date ,		ast_aud_end_date ,		ast_aud_duration ,			audit_user ,					audit_date ) 												
				VALUES	(	?,							?,						?,							?,								?,
							GetDate(),					NULL,					NULL,						?,								GetDate())";


$params_ast_aud = array(	$site_cd,					$ROW_ID,				$ast_mst_asset_no,					$ast_mst_asset_status,			$ast_aud_originator,				$audit_user);
$stmt_ast_aud = sqlsrv_query( $conn, $sql_insert_ast_aud,$params_ast_aud);	
if( !$stmt_ast_aud ) {
$error_message = "Error insert table (INSERT Table ast_aud)";
returnError($error_message);
die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_ast_aud);

 
 
 if($stmt_ast_mst &&  $stmt_ast_det && $stmt_ast_aud){
	 
	 sqlsrv_commit( $conn );
	 sqlsrv_close( $conn);	
	 returnData($ROW_ID,$ast_mst_asset_no);
	 
 }else{
	sqlsrv_rollback( $conn );
	$error_message = "Transaction rolled back.<br />";
	returnError($error_message);
 }
 
 
/* if ($valid) {
	
	sqlsrv_close( $conn);	
	returnData($ROW_ID,$asset_no);	
} */
 
function returnData($ROW_ID,$ast_mst_asset_no){
	$returnData = array(
	'status' => 'SUCCESS',
	'ROW_ID'=>	$ROW_ID,
	'message' => 'Asset Number : ' .$ast_mst_asset_no . ' created successfully');
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