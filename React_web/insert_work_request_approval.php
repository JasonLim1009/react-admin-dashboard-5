<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);
require_once('config.php');
//require_once('send_notification.php');
//require_once('f_insert_notification_log.php');
//require_once('find_online_tablet.php');

/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}

$insert_ntf = false;
$error_message;
$valid = true;
$ast_mst_asset_status = null;				
$ast_mst_asset_grpcode = null;
$ast_mst_asset_code = null;
$ast_mst_perm_id = null;
$ast_mst_asset_shortdesc = null;
$ast_det_cus_code = null;

$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json, true);

$site_cd = $data['site_cd'];
$EmpID = $data['EmpID'];
$EmpName = $data['EmpName'];

$RowID = $data['RowID'];
//$dvc_id = $data['dvc_id'];
$wrk_status = $data['wko_mst_status'];
$wko_det_assign_to = $data['wkr_mst_originator'];
$work_group =$data['wkr_mst_work_group'];

$LOGINID = $data['LOGINID'];



$sql = "SELECT 	wkr_mst.wkr_mst_wr_no,   
				wkr_mst.wkr_mst_assetno,  
				wkr_mst.wkr_mst_chg_costcenter, 			
				wkr_mst.wkr_mst_assetlocn,   			
				wkr_mst.wkr_mst_work_area,  
				wkr_mst.wkr_mst_work_type,   
				wkr_mst.wkr_mst_work_class,   
				wkr_mst.wkr_mst_work_group, 
				wkr_mst.wkr_mst_location, 
				wkr_mst.wkr_mst_taken_by,   
				wkr_mst.wkr_mst_originator,   
				wkr_mst.wkr_mst_phone,  
				wkr_mst.wkr_mst_orig_priority,    
				wkr_mst.wkr_mst_org_date, 
				wkr_mst.wkr_mst_due_date,   
				wkr_mst.wkr_mst_fault_code,   
				wkr_mst.wkr_mst_wr_descs,
				wkr_mst.wkr_mst_wr_status,
				wkr_mst.wkr_mst_temp_asset,
				wkr_mst.wkr_mst_projectid,
				wkr_det.wkr_det_varchar1,
				wkr_det.wkr_det_varchar2,
				wkr_det.wkr_det_varchar3,
				wkr_det.wkr_det_varchar4,
				wkr_det.wkr_det_varchar5,
				wkr_det.wkr_det_varchar6,
				wkr_det.wkr_det_varchar7,
				wkr_det.wkr_det_varchar8,
				wkr_det.wkr_det_note1,
				wkr_det.wkr_det_numeric1,
				wkr_det.wkr_det_numeric2,
				wkr_det.wkr_det_numeric3,
				wkr_det.wkr_det_numeric4,
				wkr_det.wkr_det_numeric5,
				wkr_det.wkr_det_datetime1,
				wkr_det.wkr_det_datetime2,
				wkr_det.wkr_det_datetime3,
				wkr_det.wkr_det_datetime4,
				wkr_det.wkr_det_datetime5					
		
	FROM 	wkr_mst (NOLOCK),wkr_det (NOLOCK)
	WHERE	wkr_mst.site_cd = '".$site_cd."' 
	AND 	wkr_mst.RowID = '".$RowID."'
	AND		wkr_mst.site_cd = wkr_det.site_cd 
	AND		wkr_mst.RowID = wkr_det.mst_RowID";			
			
		$stmt = sqlsrv_query( $conn, $sql);			
		if( !$stmt ) {
			$error_message = "Error select table (cnt_mst)";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		do {
			while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
			
			$wkr_mst_wr_no = $row['wkr_mst_wr_no'];				
			$wkr_mst_assetno = $row['wkr_mst_assetno'];
			$wkr_mst_chg_costcenter = $row['wkr_mst_chg_costcenter'];
			$wkr_mst_assetlocn = $row['wkr_mst_assetlocn'];
			$wkr_mst_work_area = $row['wkr_mst_work_area'];
			$wkr_mst_work_type = $row['wkr_mst_work_type'];
			$wkr_mst_work_class = $row['wkr_mst_work_class'];
			$wkr_mst_work_group = $row['wkr_mst_work_group'];
			$wkr_mst_location = $row['wkr_mst_location'];
			$wkr_mst_taken_by = $row['wkr_mst_taken_by'];
			$wkr_mst_originator = $row['wkr_mst_originator'];
			$wkr_mst_phone = $row['wkr_mst_phone'];
			$wkr_mst_orig_priority = $row['wkr_mst_orig_priority'];
			$wkr_mst_org_date = $row['wkr_mst_org_date'];
			$wkr_mst_due_date = $row['wkr_mst_due_date'];
			$wkr_mst_fault_code = $row['wkr_mst_fault_code'];
			$wkr_mst_wr_descs = $row['wkr_mst_wr_descs'];				
			$wkr_mst_wr_status = $row['wkr_mst_wr_status'];				
			$wkr_mst_temp_asset = $row['wkr_mst_temp_asset'];
			$wkr_mst_projectid = $row['wkr_mst_projectid'];
			$wkr_det_varchar1 = $row['wkr_det_varchar1'];
			$wkr_det_varchar2 = $row['wkr_det_varchar2'];
			$wkr_det_varchar3 = $row['wkr_det_varchar3'];
			$wkr_det_varchar4 = $row['wkr_det_varchar4'];
			$wkr_det_varchar5 = $row['wkr_det_varchar5'];
			$wkr_det_varchar6 = $row['wkr_det_varchar6'];
			$wkr_det_varchar7 = $row['wkr_det_varchar7'];
			$wkr_det_varchar8 = $row['wkr_det_varchar8'];
			$wkr_det_note1 = $row['wkr_det_note1'];
			$wkr_det_numeric1 = $row['wkr_det_numeric1'];
			$wkr_det_numeric2 = $row['wkr_det_numeric2'];
			$wkr_det_numeric3 = $row['wkr_det_numeric3'];
			$wkr_det_numeric4 = $row['wkr_det_numeric4'];
			$wkr_det_numeric5 = $row['wkr_det_numeric5'];				
			$wkr_det_datetime1 = $row['wkr_det_datetime1'];
			$wkr_det_datetime2 = $row['wkr_det_datetime2'];
			$wkr_det_datetime3 = $row['wkr_det_datetime3'];
			$wkr_det_datetime4 = $row['wkr_det_datetime4'];
			$wkr_det_datetime5 = $row['wkr_det_datetime5'];					
					 
		}
	} while ( sqlsrv_next_result($stmt));
	sqlsrv_free_stmt( $stmt);	
		



if($wkr_mst_wr_status == 'W'){
	


$sql = "SELECT	ll_loc_cnt = COUNT(*)
		FROM		ast_loc (NOLOCK)
		WHERE	ast_loc.site_cd = '".$site_cd."'
		AND		ast_loc.ast_loc_ast_loc = '".$wkr_mst_assetlocn."'
		AND		ast_loc.ast_loc_wo_prefix IS NOT NULL
		AND		ast_loc.ast_loc_wo_option = '1'";			
			
			$stmt = sqlsrv_query( $conn, $sql);			
			if( !$stmt ) {
				$error_message = "Error select table (cnt_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
				
				$ll_loc_cnt = $row['ll_loc_cnt'];	
			}
		} while ( sqlsrv_next_result($stmt));
		sqlsrv_free_stmt( $stmt);
		
		
$sql = "SELECT	ll_cnt = COUNT(*)
		FROM		wrk_typ (NOLOCK)
		WHERE	site_cd = '".$site_cd."'
		AND		wrk_typ_typ_cd = '".$wkr_mst_work_type."'
		AND		wrk_typ_prefix IS NOT NULL		
		AND		wrk_typ_option = '1'";			
			
			$stmt = sqlsrv_query( $conn, $sql);			
			if( !$stmt ) {
				$error_message = "Error select table (cnt_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
				
				$ll_cnt = $row['ll_cnt'];	
			}
		} while ( sqlsrv_next_result($stmt));	
		sqlsrv_free_stmt( $stmt);		


if($ll_loc_cnt>0){
	
		$sql = "Select 	ast_loc_wo_prefix + SUBSTRING(CONVERT(VARCHAR(7), ast_loc_wo_counter + 1000000), 2, 6)  ls_doc_no
				From 	ast_loc WITH (UPDLOCK)
				Where 	site_cd ='".$site_cd."'
				And 	ast_loc_ast_loc =  '".$wkr_mst_assetlocn."'";			
			
				$stmt = sqlsrv_query( $conn, $sql);			
				if( !$stmt ) {
					$error_message = "Error select table (cnt_mst)";
					returnError($error_message);
					die( print_r( sqlsrv_errors(), true));
				}
				do {
					while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
					
					$ls_doc_no = $row['ls_doc_no'];				
					$wko_mst_wo_no  = $ls_doc_no;
							 
				}
			} while ( sqlsrv_next_result($stmt));
			sqlsrv_free_stmt( $stmt);


		$sql = "Select Count(*) ll_dup_cnt	From wko_mst (NOLOCK)
				Where site_cd = '".$site_cd."'
				And wko_mst_wo_no = '".$ls_doc_no."'";			
					
				$stmt = sqlsrv_query( $conn, $sql);	
				if( !$stmt ) {
					$error_message = "Error select table (wko_mst)";
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
	
}else if ($ll_cnt >0){
		
		$sql = "Select 	wrk_typ_prefix + SUBSTRING(CONVERT(VARCHAR(7), wrk_typ_counter + 1000000), 2, 6)  ls_doc_no
				From 	wrk_typ WITH (UPDLOCK)
				Where 	site_cd ='".$site_cd."'
				And 	wrk_typ_typ_cd =  '".$wkr_mst_work_type."'";			
			
				$stmt = sqlsrv_query( $conn, $sql);			
				if( !$stmt ) {
					$error_message = "Error select table (cnt_mst)";
					returnError($error_message);
					die( print_r( sqlsrv_errors(), true));
				}
				do {
					while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
					
					$ls_doc_no = $row['ls_doc_no'];				
					$wko_mst_wo_no  = $ls_doc_no;
							 
				}
			} while ( sqlsrv_next_result($stmt));
			sqlsrv_free_stmt( $stmt);


		$sql = "Select Count(*) ll_dup_cnt	From wko_mst (NOLOCK)
				Where site_cd = '".$site_cd."'
				And wko_mst_wo_no = '".$ls_doc_no."'";			
					
				$stmt = sqlsrv_query( $conn, $sql);	
				if( !$stmt ) {
					$error_message = "Error select table (wko_mst)";
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
	
}else{
	
		$sql = "Select cnt_mst_prefix + SUBSTRING(CONVERT(VARCHAR(7), cnt_mst_counter + 1000000), 2, 6)  as ls_doc_no
				From 	cnt_mst WITH (UPDLOCK)
				Where 	site_cd ='".$site_cd."'
				And 	cnt_mst_module_cd =  'WKO'";			
			
				$stmt = sqlsrv_query( $conn, $sql);			
				if( !$stmt ) {
					$error_message = "Error select table (cnt_mst)";
					returnError($error_message);
					die( print_r( sqlsrv_errors(), true));
				}
				do {
					while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
					
					$ls_doc_no = $row['ls_doc_no'];				
					$wko_mst_wo_no  = $ls_doc_no;
					//echo $ls_doc_no ;
							 
				}
			} while ( sqlsrv_next_result($stmt));
			sqlsrv_free_stmt( $stmt);


		$sql = "Select Count(*) ll_dup_cnt	From wko_mst (NOLOCK)
				Where site_cd = '".$site_cd."'
				And wko_mst_wo_no = '".$ls_doc_no."'";			
					
				$stmt = sqlsrv_query( $conn, $sql);	
				if( !$stmt ) {
					$error_message = "Error select table (wko_mst)";
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
		
}


$sql = "SELECT	ast_mst_asset_status,
				ast_mst_asset_grpcode,
				ast_mst_asset_code,
				ast_mst_perm_id,	
				ast_mst_asset_shortdesc,
				ast_det_cus_code,
				ast_mst.RowID
		
		FROM 	ast_mst (NOLOCK),ast_det (NOLOCK)
		WHERE	ast_mst.site_cd = '".$site_cd."'
		AND		ast_mst.site_cd = ast_det.site_cd
		AND		ast_mst.rowid = ast_det.mst_rowid
		AND 	ast_mst.ast_mst_asset_no = '".$wkr_mst_assetno."'";			
			
		$stmt = sqlsrv_query( $conn, $sql);			
		if( !$stmt ) {
			$error_message = "Error select table (cnt_mst)";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		do {
			while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
			
			$ast_mst_asset_status = $row['ast_mst_asset_status'];				
			$ast_mst_asset_grpcode = $row['ast_mst_asset_grpcode'];
			$ast_mst_asset_code = $row['ast_mst_asset_code'];
			$ast_mst_perm_id = $row['ast_mst_perm_id'];
			$ast_mst_asset_shortdesc = $row['ast_mst_asset_shortdesc'];
			$ast_det_cus_code=$row['ast_det_cus_code'];
			$ast_mst_RowID = $row['RowID'];							
					 
		}
	} while ( sqlsrv_next_result($stmt));
	sqlsrv_free_stmt( $stmt);
	


$sql = "SELECT 	wrk_pri_due_date_count = wrk_pri_due_date_count
		FROM	wrk_pri (NOLOCK)
		WHERE	site_cd = '".$site_cd."'
		AND 	wrk_pri_pri_cd = '".$wkr_mst_orig_priority."'";			
			
		$stmt = sqlsrv_query( $conn, $sql);			
		if( !$stmt ) {
			$error_message = "Error select table (wrk_pri)";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		do {
			while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
			
			$wrk_pri_due_date_count = $row['wrk_pri_due_date_count'];				
				
					 
		}
	} while ( sqlsrv_next_result($stmt));
	sqlsrv_free_stmt( $stmt);
	

if(empty($wrk_pri_due_date_count)){
	$wrk_pri_due_date_count =0;
}


$sql = "SELECT TOP 1 
		
		wkr_mst_org_date = CAST(DATEADD(MINUTE, DATEDIFF(MINUTE, 0, GETDATE()), 0) AS SMALLDATETIME),
		wkr_mst_due_date = CAST(DATEADD(MINUTE, DATEDIFF(MINUTE, 0, DATEADD(MI, ".$wrk_pri_due_date_count.", GETDATE())), 0) AS SMALLDATETIME)
		
		FROM cf_user (NOLOCK)";			
			
		$stmt = sqlsrv_query( $conn, $sql);			
		if( !$stmt ) {
			$error_message = "Error select table (cf_user)";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		do {
			while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
			
			$wkr_mst_org_date = $row['wkr_mst_org_date']->format('Y-m-d H:i:s');
			$wkr_mst_due_date = $row['wkr_mst_due_date']->format('Y-m-d H:i:s');			
				
			
				
		}
	} while ( sqlsrv_next_result($stmt));
	sqlsrv_free_stmt( $stmt);

//echo $wkr_mst_org_date;	
			

$sql_insert_wko_mst = "INSERT INTO wko_mst  (	site_cd,						wko_mst_wo_no,					wko_mst_originator,			wko_mst_phone,				
												wko_mst_asset_level,			wko_mst_assetno,				wko_mst_flt_code,			wko_mst_status,				
												wko_mst_due_date,				wko_mst_descs,					wko_mst_project_id,			wko_mst_org_date,			
												wko_mst_chg_costcenter,			wko_mst_work_area,				wko_mst_asset_location,		wko_mst_asset_group_code,	
												wko_mst_asset_status,			wko_mst_orig_priority,			wko_mst_plan_priority,		wko_mst_type,
												wko_mst_create_by,				wko_mst_create_date,			wko_mst_ast_cod,			audit_user,
												audit_date	 ) 
												
									VALUES 	(	?,								?,								?,							?,
												?,								?,								?,							?,
												?,								?,								?,							?,	
												?,								?,								?,							?,	
												?,								?,								?,							?,	
												?,								GetDate(),						?,							?,	
												GetDate()	)";
																
						
$params_wko_mst = array($site_cd,$wko_mst_wo_no,$wkr_mst_originator,$wkr_mst_phone,$wkr_mst_location,$wkr_mst_assetno,$wkr_mst_fault_code,$wrk_status,$wkr_mst_due_date,$wkr_mst_wr_descs,$wkr_mst_projectid,$wkr_mst_org_date,$wkr_mst_chg_costcenter,$wkr_mst_work_area,$wkr_mst_assetlocn,$ast_mst_asset_grpcode,$ast_mst_asset_status,$wkr_mst_orig_priority,$wkr_mst_orig_priority,'C',$LOGINID,$ast_mst_asset_code,$LOGINID,$LOGINID);	

$stmt_wko_mst = sqlsrv_query( $conn, $sql_insert_wko_mst,$params_wko_mst);

if( !$stmt_wko_mst ) {
	$error_message = "Error insert table (INSERT Table wko_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_wko_mst);	



$sql = "SELECT Rowid From wko_mst (NOLOCK) WHERE site_cd = '".$site_cd."' AND wko_mst_wo_no = '".$wko_mst_wo_no."'";
		
$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "SELECT   table Error (wko_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
	 
	 $Mst_ROW_ID = $row['Rowid'];		
	 	 
   }
} while ( sqlsrv_next_result($stmt));
sqlsrv_free_stmt( $stmt);	

$sql = " SELECT 	dft_mst_lab_act,
					dft_mst_mat_act,
					dft_mst_con_act
		FROM		dft_mst (NOLOCK)
		WHERE	site_cd = '".$site_cd."'";
		
$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "SELECT  table Error (dft_mst)";
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



$sql = " select emp_det_wo_budget_approver, emp_det_wo_approval_limit from emp_det (NOLOCK) ,emp_mst (NOLOCK) 
		where emp_det.site_cd = emp_mst.site_cd 
		and emp_det.mst_RowID = emp_mst.RowID 
		AND		emp_mst.site_cd = '".$site_cd."'
		and emp_mst_empl_id ='".$EmpID."'";
		
$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "SELECT  table Error (emp_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
	 
	  $emp_det_wo_budget_approver = $row['emp_det_wo_budget_approver'];
	 $emp_det_wo_approval_limit = $row['emp_det_wo_approval_limit'];
	
	 	 
   }
} while ( sqlsrv_next_result($stmt));
sqlsrv_free_stmt( $stmt);	


$sql = "SELECT	emp_mst_name		
		FROM 	emp_mst (NOLOCK)
		WHERE  	emp_mst.site_cd = '".$site_cd."'
		AND		emp_mst_empl_id = '".$wkr_mst_originator."' ";
		
$stmt = sqlsrv_query( $conn, $sql);	
		
if( !$stmt ) {
	$error_message = "SELECT  table Error (emp_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
	 
	  $emp_mst_name = $row['emp_mst_name'];
	 	
	 	 
   }
} while ( sqlsrv_next_result($stmt));
sqlsrv_free_stmt( $stmt);	


if($emp_det_wo_budget_approver = '0'){
	$ld_wo_limit = 0;
}



$sql_insert_ast_mst = "INSERT INTO wko_det 
		(		site_cd, 						mst_RowID, 					wko_det_wr_no, 				wko_det_supv_id, 
				wko_det_planner,				wko_det_approver, 			wko_det_perm_id, 			wko_det_approved, 
				wko_det_safety, 				wko_det_pm_grp, 			wko_det_grp_code, 			wko_det_task_id, 
				wko_det_pm_idno, 				wko_det_route_id, 			wko_det_work_type, 			wko_det_work_locn, 
				wko_det_work_grp, 				wko_det_exc_date, 			wko_det_sched_date, 		wko_det_cmpl_date, 
				wko_det_sc_date, 				wko_det_act_code, 			wko_det_critical_ratio, 	wko_det_est_lab_cost,
				wko_det_est_mtl_cost,    		wko_det_est_con_cost, 		wko_det_lab_cost, 			wko_det_mtl_cost, 			
				wko_det_con_cost,				wko_det_support_rqmt, 		wko_det_corr_action, 		wko_det_chg_costcenter, 	
				wko_det_crd_costcenter, 		wko_det_laccount, 			wko_det_maccount,			wko_det_caccount, 			
				wko_det_work_class, 			wko_det_finance_clo, 		wko_det_budget, 			wko_det_wo_limit, 
				wko_det_fund_src, 				wko_det_ent_date,			wko_det_wo_open, 			wko_det_dispatch, 			
				wko_det_current_location, 		wko_det_cause_code, 		wko_det_wo_print, 			wko_det_on_dispatch_q, 	
				wko_det_check_out, 				wko_det_varchar1, 			wko_det_varchar2, 			wko_det_varchar3, 			
				wko_det_varchar4, 				wko_det_varchar5, 			wko_det_varchar6, 			wko_det_varchar7, 			
				wko_det_varchar8, 				wko_det_varchar9, 			wko_det_varchar10, 			wko_det_numeric1, 			
				wko_det_numeric2, 				wko_det_numeric3, 			wko_det_numeric4, 			wko_det_numeric5, 			
				wko_det_datetime1, 				wko_det_datetime2, 			wko_det_datetime3, 			wko_det_datetime4, 			
				wko_det_datetime5, 				wko_det_note1, 				wko_det_customer_cd,		audit_user, 						
				audit_date,						wko_det_temp_asset,			wko_det_est_misc_cost,		wko_det_misc_cost,
				wko_det_misc_amt,				wko_det_assign_to	 ) 
			
VALUES 	(		?,								?,							?,							NULL,
				NULL,							?,							?,							'0',
				'0',							NULL,						NULL,						NULL,
				NULL,							NULL,						?,							NULL,
				?,								NULL,						NULL,						NULL,
				?,								NULL,						NULL,						0,
				0,								0,							0,							0,
				0,								Null,						Null,						?,
				NULL,							?,							?,							?,
				?,								Null,						?,							?,					
				Null,							Null,						'Y',						Null,
				NULL,							NULL,						NULL,						NULL,
				NULL,							?,							?,							?,
				?,								?,							?,							?,
				?,								NULL,						NULL,						0,
				0,								0,							0,							0,
				?,								?,							?,							?,
				?,								?,							?,							?,
				GetDate(),						?,							0,							0,
				0,								?	)";
								
								

$params_wko_det = array($site_cd,$Mst_ROW_ID,$wkr_mst_wr_no,$EmpID,$ast_mst_perm_id,$wkr_mst_work_type,$work_group,$wkr_mst_org_date,$wkr_mst_chg_costcenter,$dft_mst_lab_act,$dft_mst_mat_act,$dft_mst_con_act,$wkr_mst_work_class,$emp_det_wo_approval_limit,$emp_det_wo_approval_limit,$wkr_det_varchar1,$wkr_det_varchar2,$wkr_det_varchar3,$wkr_det_varchar4,$wkr_det_varchar5,$wkr_det_varchar6,$wkr_det_varchar7,$wkr_det_varchar8,$wkr_det_datetime1,$wkr_det_datetime2,$wkr_det_datetime3,$wkr_det_datetime4,$wkr_det_datetime5,$wkr_det_note1,$ast_det_cus_code,$LOGINID,$wkr_mst_temp_asset,$wko_det_assign_to,$LOGINID);					
$stmt_wko_det = sqlsrv_query( $conn, $sql_insert_ast_mst,$params_wko_det);

if( !$stmt_wko_det ) {
	$error_message = "Error insert table (INSERT Table wko_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_wko_det);



$sql = " update wkr_mst SET wkr_mst_wr_status ='A' , wkr_mst_work_group = '".$work_group."' WHERE RowID ='".$RowID."'";
		
$stmt_update_wkr_mst = sqlsrv_query( $conn, $sql);	
		
if( !$stmt_update_wkr_mst ) {
	$error_message = "Error update table (wkr_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt_update_wkr_mst, SQLSRV_FETCH_ASSOC)) {
	 
	 $emp_det_wo_approval_limit = $row['emp_det_wo_approval_limit'];
	
	 	 
   }
} while ( sqlsrv_next_result($stmt_update_wkr_mst));
sqlsrv_free_stmt( $stmt_update_wkr_mst);


$sql = " update wkr_det SET wkr_det_approver ='".$LOGINID."',wkr_det_appr_date =getdate( ) , wkr_det_wo ='".$wko_mst_wo_no."' ,wkr_det_datetime1 =Null  WHERE mst_RowID ='".$RowID."'";
		
$stmt_update_wkr_det = sqlsrv_query( $conn, $sql);	
		
if( !$stmt_update_wkr_det ) {
	$error_message = "Error update table (wkr_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt_update_wkr_det, SQLSRV_FETCH_ASSOC)) {	
	
	 	 
   }
} while ( sqlsrv_next_result($stmt_update_wkr_det));
sqlsrv_free_stmt( $stmt_update_wkr_det);



$sql_insert_wko_sts = "	INSERT wko_sts 
						(	site_cd ,					mst_RowID ,					wko_sts_wo_no ,					wko_sts_status , 
							wko_sts_originator ,		wko_sts_start_date ,		wko_sts_end_date ,				wko_sts_duration , 
							audit_user ,				audit_date ) 
				VALUES 
						(	?,							?,							?,								?,
							?,							?,							NULL,							'1',
							?,							GetDate()	)";


$params_wko_sts = array($site_cd,$Mst_ROW_ID,$wko_mst_wo_no,$wrk_status,$LOGINID,$wkr_mst_org_date,$LOGINID,$LOGINID);	
$stmt_wko_sts = sqlsrv_query( $conn, $sql_insert_wko_sts,$params_wko_sts);	
if( !$stmt_wko_sts ) {
$error_message = "Error insert table (INSERT Table wko_sts)";
returnError($error_message);
die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_wko_sts);


if($ll_loc_cnt>0){
	
		$sql = "UPDATE 	ast_loc WITH (UPDLOCK)
				SET 	ast_loc_wo_counter = ast_loc_wo_counter + 1
				WHERE 	site_cd ='".$site_cd."' 
				AND 	ast_loc_ast_loc = 'WKO'";			
			
			$stmt = sqlsrv_query( $conn, $sql);			
			if( !$stmt ) {
				$error_message = "Error UPDATE table (ast_loc)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			sqlsrv_free_stmt( $stmt);
	
}else if ($ll_cnt >0){
	
	$sql = "UPDATE 	wrk_typ WITH (UPDLOCK)
			SET 	wrk_typ_counter = wrk_typ_counter + 1
			WHERE 	site_cd ='".$site_cd."' 
			AND 	wrk_typ_typ_cd = 'WKO'";			
			
			$stmt = sqlsrv_query( $conn, $sql);			
			if( !$stmt ) {
				$error_message = "Error UPDATE table (wrk_typ)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			sqlsrv_free_stmt( $stmt);
	
}else{
	
	$sql = "UPDATE 	cnt_mst WITH (UPDLOCK)
			SET 	cnt_mst_counter = cnt_mst_counter + 1
			WHERE 	site_cd ='".$site_cd."' 
			AND 	cnt_mst_module_cd = 'WKO'";			
			
			$stmt = sqlsrv_query( $conn, $sql);			
			if( !$stmt ) {
				$error_message = "Error UPDATE table (cnt_mst)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}
			sqlsrv_free_stmt( $stmt);
}



if(!empty($wko_det_assign_to)){
	
	
	
	$sql_insert_wko_sts = "	INSERT wko_ls7 
						(	site_cd,				mst_RowID,					wko_ls7_level,			wko_ls7_emp_id, 
							wko_ls7_due_days,		wko_ls7_wo_org_date,		wko_ls7_due_date,		wko_ls7_total_days, 
							audit_user ,			audit_date	) 
				VALUES 
						(	'".$site_cd."',			'".$Mst_ROW_ID."',			'1',					'".$wko_det_assign_to."',
							'1',					GetDate(),					NULL,					NULL,
							'".$LOGINID."',			GetDate())";

		$stmt = sqlsrv_query( $conn, $sql_insert_wko_sts);	
		if( !$stmt ) {
		$error_message = "Error insert table (INSERT Table wko_sts)";
		returnError($error_message);
		die( print_r( sqlsrv_errors(), true));
		}	
		sqlsrv_free_stmt( $stmt);


	
	
	$title = "Work Order Assigned";
	$body = "The work order  ('".$wko_mst_wo_no."') been assigned to you.";
	$module = "Work Order";
	$message_assign ="Asset No:".$wkr_mst_assetno." 
	\r\n   Asset Desc:".$ast_mst_asset_shortdesc."
	\r\n   Work Area:".$ast_mst_asset_shortdesc."
	\r\n   Location:".$wkr_mst_assetlocn."";
	
	//$insert_ntf4 = insert_notification_log($site_cd, $EmpID, $wko_det_assign_to, $wko_mst_wo_no, $title, $body, $message_assign, $module, $dvc_id, $LOGINID);
	
	// foreach($insert_ntf4 as $x => $val) {
			
			// $row = $x = $val["row"];
			// $insert_ntf = $x = $val["insert_ntf"];
			
			//echo '<pre>'; print_r($row); echo '</pre>';
			//echo '<pre>'; print_r($insert_ntf); echo '</pre>';		
			
		
		// }
	
	
	//Get New Value Assignto Online Token
	//$tkn_token_2 = get_online($wko_det_assign_to, $site_cd);
	
	//Notify token user
	/* if (sizeof($tkn_token_2) > 0){
		
				
		foreach($tkn_token_2 as $x => $val) {			
			$tokenlist = $x = $val["token"];
			$RowID = $x = $val["RowID"];
			$tkn_site = $x = $val["tkn_site"];
			
			//echo '<pre>'; print_r($tkn_site); echo '</pre>';
			//echo '<pre>'; print_r($RowID); echo '</pre>';			
			
			push_notification_android( $tokenlist,'The work order ('.$wko_mst_wo_no.') had been assigned to you',"Work Order Assigned (".$site_cd.")",$site_cd,$tokenlist,$RowID,$row,$tkn_site,$LOGINID);			
			
		
		}		
	} */
	
	
	
}


if($stmt_wko_mst && $stmt_wko_det && $stmt_update_wkr_mst && $stmt_update_wkr_det && $stmt_wko_sts){
	
	if(!empty($wko_det_assign_to)){
		
		sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 returnData($Mst_ROW_ID,$wko_mst_wo_no);
		
		/* if($insert_ntf4) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 returnData($Mst_ROW_ID,$wko_mst_wo_no);
		}else{
			sqlsrv_rollback( $conn );
			$error_message = "Transaction rolled back.<br />";
			returnError($error_message);
		} */
		
	}else{
		sqlsrv_commit( $conn );
		sqlsrv_close( $conn);	
		returnData($Mst_ROW_ID,$wko_mst_wo_no);
		
	}
	
	
}else{
	
	
	
	
		 sqlsrv_rollback( $conn );
		 $error_message = "Transaction rolled back.<br />";
		 returnError($error_message);
}
 
 
 
 }else{
	 
	 
	 
	 $sql = "	SELECT 	wkr_det_wo	
				FROM 	wkr_det (NOLOCK)
				WHERE	wkr_det.site_cd = '".$site_cd."' 
				AND 	wkr_det.mst_RowID = '".$RowID."'";			
			
		$stmt = sqlsrv_query( $conn, $sql);			
		if( !$stmt ) {
			$error_message = "Error select table (cnt_mst)";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
		}
		do {
			while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {	
			
			$wkr_det_wo = $row['wkr_det_wo'];				
			
		}
	} while ( sqlsrv_next_result($stmt));
	sqlsrv_free_stmt( $stmt);
	 
	 sqlsrv_rollback( $conn );
	 $error_message = 'Work Request is already Approved Work Order No: ' .$wkr_det_wo. '';
	 returnalert($error_message);
	
}
 
function returnData($Mst_ROW_ID,$wko_mst_wo_no){
	$returnData = array(
	'status' => 'SUCCESS',
	'ROW_ID'=>	$Mst_ROW_ID,
	'WorkOrderno'=>	$wko_mst_wo_no,
	
	'message' => 'Work Order No: ' .$wko_mst_wo_no.  ' Had Created Successfully');
	echo json_encode($returnData);
}


function returnalert($error_message){	
	
	$returnData = array(
	'status' => 'alert',
	'message' => $error_message);	
	echo json_encode($returnData);
	exit();
}



function returnError($error_message){	
	
	$returnData = array(
	'status' => 'ERROR',
	'message' => $error_message);	
	echo json_encode($returnData);
	exit();
}






 
 
?>