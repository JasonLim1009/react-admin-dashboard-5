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

$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json, true);

//echo json_encode($data);;

$site_cd = $data['site_cd'];
$emp_mst_empl_id = $data['emp_mst_empl_id'];
$emp_mst_name = $data['emp_mst_name'];
$emp_mst_status = $data['emp_mst_status'];
$emp_mst_title = $data['emp_mst_title'];
$emp_mst_usr_grp = $data['emp_mst_usr_grp'];
$emp_mst_login_id = $data['emp_mst_login_id'];
$emp_mst_dash_access = $data['emp_mst_dash_access'];

$emp_mst_homephone = $data['emp_mst_homephone'];
$emp_mst_date_of_birth = $data['emp_mst_date_of_birth'];
$emp_mst_emg_name = $data['emp_mst_emg_name'];
$emp_mst_dateofhire = $data['emp_mst_dateofhire'];
$emp_mst_emg_phone = $data['emp_mst_emg_phone'];
$emp_mst_payrate = $data['emp_mst_payrate'];
$emp_mst_sex = $data['emp_mst_sex'];
$emp_mst_pay_period = $data['emp_mst_pay_period'];
$emp_mst_marital_status = $data['emp_mst_marital_status'];
$emp_mst_remarks = $data['emp_mst_remarks'];

$emp_det_shift = $data['emp_det_shift'];
$emp_det_email_id = $data['emp_det_email_id'];
$emp_det_supervisor_id = $data['emp_det_supervisor_id'];
$emp_det_craft = $data['emp_det_craft'];
$emp_det_work_area = $data['emp_det_work_area'];
$emp_det_work_grp = $data['emp_det_work_grp'];

$emp_det_mr_limit = $data['emp_det_mr_limit'];
$emp_det_wo_approval_limit = $data['emp_det_wo_approval_limit'];	
$emp_det_pr_approval_limit = $data['emp_det_pr_approval_limit'];
$emp_det_mr_approver = $data['emp_det_mr_approver'];
$emp_det_wo_budget_approver = $data['emp_det_wo_budget_approver'];
$emp_det_pr_approver = $data['emp_det_pr_approver'];

$emp_det_wr_approver = $data['emp_det_wr_approver'];
$emp_det_planner = $data['emp_det_planner'];
$emp_det_wo_gen_mr_pr = $data['emp_det_wo_gen_mr_pr'];
$emp_det_pm_generator = $data['emp_det_pm_generator'];
$emp_det_time_card_enter = $data['emp_det_time_card_enter'];
$emp_det_time_card_void = $data['emp_det_time_card_void'];
$emp_det_core = $data['emp_det_core'];

$emp_det_wo_sched = $data['emp_det_wo_sched'];
$emp_det_po_buyer = $data['emp_det_po_buyer'];
$emp_det_supervisor = $data['emp_det_supervisor'];
$emp_det_foreman = $data['emp_det_foreman'];
$emp_det_asset_tag_flag = $data['emp_det_asset_tag_flag'];
$emp_det_msetup_mobile_user = $data['emp_det_msetup_mobile_user'];
$emp_det_checklist = $data['emp_det_checklist'];
$emp_det_mobile = $data['emp_det_mobile'];
$emp_det_webwork = $data['emp_det_webwork'];
	

$emp_det_note1 = $data['emp_det_note1'];
$emp_det_varchar1 = $data['emp_det_varchar1'];
$emp_det_varchar2 = $data['emp_det_varchar2'];
$emp_det_varchar3 = $data['emp_det_varchar3'];
$emp_det_varchar4 = $data['emp_det_varchar4'];
$emp_det_varchar5 = $data['emp_det_varchar5'];
$emp_det_varchar6 = $data['emp_det_varchar6'];
$emp_det_varchar7 = $data['emp_det_varchar7'];
$emp_det_varchar8 = $data['emp_det_varchar8'];
$emp_det_varchar9 = $data['emp_det_varchar9'];
$emp_det_varchar10 = $data['emp_det_varchar10'];

$emp_det_note2 = $data['emp_det_note2'];
$emp_det_varchar11 = $data['emp_det_varchar11'];
$emp_det_varchar12 = $data['emp_det_varchar12'];
$emp_det_varchar13 = $data['emp_det_varchar13'];
$emp_det_varchar14 = $data['emp_det_varchar14'];
$emp_det_varchar15 = $data['emp_det_varchar15'];
$emp_det_varchar16 = $data['emp_det_varchar16'];
$emp_det_varchar17 = $data['emp_det_varchar17'];
$emp_det_varchar18 = $data['emp_det_varchar18'];
$emp_det_varchar19 = $data['emp_det_varchar19'];
$emp_det_varchar20 = $data['emp_det_varchar20'];

$emp_det_numeric1 = $data['$emp_det_numeric1'];
$emp_det_numeric2 = $data['$emp_det_numeric2'];
$emp_det_numeric3 = $data['$emp_det_numeric3'];
$emp_det_numeric4 = $data['$emp_det_numeric4'];
$emp_det_numeric5 = $data['$emp_det_numeric5'];
$emp_det_numeric6 = $data['$emp_det_numeric6'];
$emp_det_numeric7 = $data['$emp_det_numeric7'];
$emp_det_numeric8 = $data['$emp_det_numeric8'];
$emp_det_numeric9 = $data['$emp_det_numeric9'];
$emp_det_numeric10 = $data['$emp_det_numeric10'];

$emp_det_datetime1 = $data['emp_det_datetime1'];
$emp_det_datetime2 = $data['emp_det_datetime2'];
$emp_det_datetime3 = $data['emp_det_datetime3'];
$emp_det_datetime4 = $data['emp_det_datetime4'];
$emp_det_datetime5 = $data['emp_det_datetime5'];
$emp_det_datetime6 = $data['emp_det_datetime6'];
$emp_det_datetime7 = $data['emp_det_datetime7'];
$emp_det_datetime8 = $data['emp_det_datetime8'];
$emp_det_datetime9 = $data['emp_det_datetime9'];
$emp_det_datetime10 = $data['emp_det_datetime10'];


$audit_user = $data['audit_user'];
$emp_mst_create_by = $data['ast_mst_create_by'];
$ast_aud_originator = $data['ast_aud_originator'];
$emp_mst_create_date = $data['emp_mst_create_date'];

//STEP-01
$sql_insert_emp_mst = "	INSERT INTO emp_mst ( 
									site_cd,				emp_mst_empl_id,				emp_mst_login_id,			emp_mst_usr_grp, 
									emp_mst_name,			emp_mst_title,					emp_mst_status,				emp_mst_homephone, 
									emp_mst_emg_name,		emp_mst_emg_phone,				emp_mst_dateofhire,			emp_mst_sex, 
									emp_mst_date_of_birth,	emp_mst_marital_status,			emp_mst_payrate,			emp_mst_pay_period, 
									emp_mst_remarks,		emp_mst_privilege_template,		emp_mst_dash_access,		emp_mst_create_by, 
									emp_mst_create_date,	audit_user,						audit_date,					column1, 
									column2,				column3,						column4,					column5 ) 

						VALUES (	?,						?,								NULL,						?,
									?,						?,								?,							?,
									?,						?,								NULL,						?,
									NULL,					?,								?,							?,
									?,						NULL,							?,							?,
									?, 						?,								GetDate(),					NULL,
									NULL,					NULL,							NULL,						NULL )";
								
								
$params_emp_mst = array(		$site_cd,					$emp_mst_empl_id,				$emp_mst_login_id,			$emp_mst_usr_grp,	
								$emp_mst_name,				$emp_mst_title,					$emp_mst_status,			$emp_mst_homephone, 
								$emp_mst_emg_name,			$emp_mst_emg_phone,											$emp_mst_sex, 
															$emp_mst_marital_status,		$emp_mst_payrate,			$emp_mst_pay_period, 
								$emp_mst_remarks,											$emp_mst_dash_access,		$emp_mst_create_by, 
								$emp_mst_create_date,		$audit_user,												 );
								
				
$stmt_emp_mst = sqlsrv_query( $conn,	$sql_insert_emp_mst,	$params_emp_mst);	

if( !$stmt_emp_mst ) {
	$error_message = "Error insert table (INSERT Table emp_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
sqlsrv_free_stmt($stmt_emp_mst);




//STEP-02
$sql = "SELECT Rowid From emp_mst  WHERE site_cd = '".$site_cd."'  AND emp_mst_empl_id = '".$emp_mst_empl_id."'";		
$stmt = sqlsrv_query( $conn, $sql);			
if( !$stmt ) {
	$error_message = "Error select table (emp_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
	 
	 $ROW_ID = $row['Rowid'];		
	 	 
   }
} while ( sqlsrv_next_result($stmt));
sqlsrv_free_stmt( $stmt);




//STEP-03
$sql_insert_emp_det = "INSERT INTO emp_det 
								(	site_cd,					mst_RowID,						emp_det_po_no,					emp_det_supplier, 				emp_det_phone,				
									emp_det_ssn,				emp_det_supervisor_id,			emp_det_exempt, 				emp_det_probation_per,			emp_det_dateofterm,				
									emp_det_eth,				emp_det_costcenter, 			emp_det_account,				emp_det_shift,					emp_det_ot_worked,				
									emp_det_ot_refused, 		emp_det_purch_person,			emp_det_work_area,				emp_det_craft,					emp_det_work_grp, 
									emp_det_dispatch_module,	emp_det_email_id,				emp_det_avail_hrs,				emp_det_pager, 					emp_det_fax,	
									emp_det_pager_serviceid,	emp_det_contractor,				emp_det_po_buyer, 				emp_det_planner,				emp_det_supervisor,				
									emp_det_mr_approver,		emp_det_mr_limit,				emp_det_wr_approver,			emp_det_wo_budget_approver,		emp_det_wo_approval_limit,		
									emp_det_pr_approver,		emp_det_pr_approval_limit,		emp_det_pm_generator,			emp_det_em_inactive_flag,		emp_det_last_worked_date, 
									emp_det_last_worked_time,	emp_det_available_flag,			emp_det_liability_acc,			emp_det_invoice_approver, 		emp_det_inv_tol_linepct,	
									emp_det_inv_tol_lineval,	emp_det_inv_tol_freight_val,	emp_det_inv_tol_freight_pct, 	emp_det_inv_tol_whole,			emp_det_foreman,				
									emp_det_insurance_id,		emp_det_address_id, 			emp_det_ira_idno,				emp_det_msetup_mobile_user,		emp_det_msetup_device_id,		
									emp_det_asset_tag_flag, 	emp_det_time_card_enter,		emp_det_time_card_void,			emp_det_wo_gen_mr_pr,			emp_det_wo_sched, 
									emp_det_mobile,				emp_det_core,					emp_det_webwork,				emp_det_varchar1, 				emp_det_varchar2,			
									emp_det_varchar3,			emp_det_varchar4,				emp_det_varchar5, 				emp_det_varchar6,				emp_det_varchar7,				
									emp_det_varchar8,			emp_det_varchar9, 				emp_det_varchar10,				emp_det_varchar11,				emp_det_varchar12,				
									emp_det_varchar13, 			emp_det_varchar14,				emp_det_varchar15,				emp_det_varchar16,				emp_det_varchar17, 
									emp_det_varchar18,			emp_det_varchar19,				emp_det_varchar20,				emp_det_numeric1, 				emp_det_numeric2,			
									emp_det_numeric3,			emp_det_numeric4,				emp_det_numeric5, 				emp_det_numeric6,				emp_det_numeric7,				
									emp_det_numeric8,			emp_det_numeric9, 				emp_det_numeric10,				emp_det_datetime1,				emp_det_datetime2,				
									emp_det_datetime3, 			emp_det_datetime4,				emp_det_datetime5,				emp_det_datetime6,				emp_det_datetime7, 
									emp_det_datetime8,			emp_det_datetime9,				emp_det_datetime10,				emp_det_note1, 					emp_det_note2,				
									emp_det_checklist,			audit_user,						audit_date, 					column1,						column2,						
									column3,					column4, 						column5 ) 
									
						VALUES (	?,							?,								NULL,							NULL, 							NULL,						
									NULL,						?,								NULL, 							NULL,							NULL,							
									NULL,						NULL, 							NULL,							?,								NULL,							
									NULL, 						NULL,							?,								?,								?, 
									NULL,						?,								NULL,							NULL, 							NULL,						
									NULL,						NULL,							?, 								?,								?,							
									?,							?, 								?,								?,								?,						
									?, 							?,								?,								NULL,							NULL, 
									NULL,						NULL,							NULL,							NULL, 							NULL,						
									NULL,						NULL,							NULL, 							NULL,							?,							
									NULL,						NULL, 							NULL,							?,								NULL,							
									?,							?,								?,								?,								?,
									?,							?,								?,								?, 								?,						
									?,							?,								?, 								?,								?,							
									?,							?,								?,								?,								?,							
									?,							?,								?,								?,								?,
									?,							?,								?,								?,								?,						
									?,							?,								?,								?,								?,							
									?,							?,								?,								?,								?,							
									?,							?,								?,								?,								?,
									?,							?,								?,								NULL, 							NULL,						
									?,							?,								GetDate(),				 		NULL,							NULL,							
									NULL,						NULL,							NULL )";


$params_emp_det = array(			$site_cd,					$ROW_ID,						
																$emp_det_supervisor_id,
																																$emp_det_shift,					
																								$emp_det_work_area,				$emp_det_craft,					$emp_det_work_grp, 				
																$emp_det_email_id,				
																								$emp_det_po_buyer, 				$emp_det_planner,				$emp_det_supervisor,			
									$emp_det_mr_approver,		$emp_det_mr_limit,				$emp_det_wr_approver,			$emp_det_wo_budget_approver,	$emp_det_wo_approval_limit,		
									$emp_det_pr_approver,		$emp_det_pr_approval_limit,		$emp_det_pm_generator,			
																
																																								$emp_det_foreman,				
																																$emp_det_msetup_mobile_user,
									$emp_det_asset_tag_flag, 	$emp_det_time_card_enter,		$emp_det_time_card_void,		$emp_det_wo_gen_mr_pr,			$emp_det_wo_sched, 
									$emp_det_mobile,			$emp_det_core,					$emp_det_webwork,				$emp_det_varchar1, 				$emp_det_varchar2,			
									$emp_det_varchar3,			$emp_det_varchar4,				$emp_det_varchar5, 				$emp_det_varchar6,				$emp_det_varchar7,				
									$emp_det_varchar8,			$emp_det_varchar9, 				$emp_det_varchar10,				$emp_det_varchar11,				$emp_det_varchar12,				
									$emp_det_varchar13, 		$emp_det_varchar14,				$emp_det_varchar15,				$emp_det_varchar16,				$emp_det_varchar17, 
									$emp_det_varchar18,			$emp_det_varchar19,				$emp_det_varchar20,				$emp_det_numeric1,				$emp_det_numeric2,
									$emp_det_numeric3,			$emp_det_numeric4,				$emp_det_numeric5,				$emp_det_numeric6,				$emp_det_numeric7,
									$emp_det_numeric8,			$emp_det_numeric9,				$emp_det_numeric10,				$emp_det_datetime1,				$emp_det_datetime2,				
									$emp_det_datetime3, 		$emp_det_datetime4,				$emp_det_datetime5,				$emp_det_datetime6,				$emp_det_datetime7, 
									$emp_det_datetime8,			$emp_det_datetime9,				$emp_det_datetime10,
							
							
							
							
							
							
							$emp_det_checklist,				$audit_user);	
							
$stmt_emp_det = sqlsrv_query( $conn,	$sql_insert_emp_det,	$params_emp_det);	
if( !$stmt_emp_det ) {
$error_message = "Error insert table (emp_det)";
returnError($error_message);
die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_emp_det);




//STEP-04
$sql_insert_emp_ls1 = "INSERT INTO emp_ls1 
								(	site_cd,			emp_ls1_craft,		mst_RowID,					emp_ls1_pay_rate,	emp_ls1_supervisor_id,		emp_ls1_charge_rate,	emp_ls1_varchar1, 
									emp_ls1_varchar2,	emp_ls1_varchar3,	emp_ls1_varchar4,			emp_ls1_varchar5,	emp_ls1_varchar6,			emp_ls1_varchar7,		emp_ls1_varchar8, 
									emp_ls1_varchar9,	emp_ls1_varchar10,	emp_ls1_numeric1,			emp_ls1_numeric2,	emp_ls1_numeric3,			emp_ls1_numeric4,		emp_ls1_numeric5, 
									emp_ls1_numeric6,	emp_ls1_numeric7,	emp_ls1_numeric8,			emp_ls1_numeric9,	emp_ls1_numeric10,			emp_ls1_datetime1,		emp_ls1_datetime2, 
									emp_ls1_datetime3,	emp_ls1_datetime4,	emp_ls1_datetime5,			emp_ls1_datetime6,	emp_ls1_datetime7,			emp_ls1_datetime8,		emp_ls1_datetime9, 
									emp_ls1_datetime10, audit_user,			audit_date,					column1,			column2,					column3,				column4, 
									column5 ) 
						VALUES (   	?,					NULL,				?,							NULL,				NULL,						NULL,					NULL,
									NULL,				NULL,				NULL,						NULL,				NULL,						NULL,					NULL,
									NULL,				NULL,				NULL,						NULL,				NULL,						NULL,					NULL,
									NULL,				NULL,				NULL,						NULL,				NULL,						NULL,					NULL,	
									NULL,				NULL,				NULL,						NULL,				NULL,						NULL,					NULL,
									NULL,				?,					GetDate(),					NULL,				NULL,						NULL,					NULL,
									NULL	)";
									
$params_emp_ls1 = array(	$site_cd,					$ROW_ID,			$audit_user	);	
									
$stmt_emp_ls1 = sqlsrv_query( $conn,	$sql_insert_emp_ls1,	$params_emp_ls1);	
if( !$stmt_emp_ls1 ) {
$error_message = "Error insert table (emp_ls1)";
returnError($error_message);
die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_emp_ls1);




//STEP-05
$sql_insert_usg_itm = "	Insert usg_itm 
									(site_cd, 	usg_itm_usr_grp, 	usg_itm_empl_id, 	usg_itm_location, 	usg_itm_list, 	usg_itm_change, 	audit_user, 	audit_date )  
						Select		site_cd, 	NULL, 				NULL, 				loc_mst_stk_loc, 	NULL, 			NULL, 				?, 				GetDate()  
						From 		loc_mst  
						Where 		site_cd = '".$site_cd."'";

$params_usg_itm = array(	$audit_user	);

$stmt_usg_itm = sqlsrv_query( $conn,	$sql_insert_usg_itm,	$params_usg_itm);	
if( !$stmt_usg_itm ) {
$error_message = "Error insert table (INSERT Table usg_itm)";
returnError($error_message);
die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_usg_itm);




//STEP-06
$sql_insert_usg_emp = "Insert usg_emp 
								(	site_cd, 	usg_emp_usr_grp,	 usg_emp_emp_id, 	usg_emp_level,	 	usg_emp_days, 		audit_user, 	audit_date ) 
						Values 	(	?, 			?,					?,		 			'0',				'0',			 	?, 				GetDate() )";
						
$params_usg_emp = array(		$site_cd,		$emp_mst_usr_grp,	$emp_mst_empl_id,	$audit_user	);

$stmt_usg_emp = sqlsrv_query( 	$conn,		$sql_insert_usg_emp,		$params_usg_emp);	
if( !$stmt_usg_emp ) {
$error_message = "Error insert table (INSERT Table usg_emp)";
returnError($error_message);
die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_usg_emp);

	
	
	
//STEP-07
$sql_insert_dsh_uac = "Insert dsh_uac 
								(	site_cd, 			emp_RowID, 		dsh_RowID, 			dsh_uac_flag, 			audit_user,		 audit_date )  
						Select 		dsh_gac.site_cd, 	?, 				dsh_gac.dsh_RowID,  dsh_gac.dsh_gac_flag, 	?, 				 GetDate()  
						From 		usr_grp, dsh_gac  
						Where 		usr_grp.site_cd = dsh_gac.site_cd  
						And 		usr_grp.RowID = dsh_gac.usg_RowID  
						And 		usr_grp.site_cd = '".$site_cd."'
						And 		usr_grp.usr_grp_usr_grp =  '".$emp_mst_usr_grp."'";
$params_dsh_uac = array(	$ROW_ID,	$audit_user	);

$stmt_dsh_uac = sqlsrv_query( 	$conn,		$sql_insert_dsh_uac,	$params_dsh_uac	);	
if( !$stmt_dsh_uac ) {
$error_message = "Error insert table (INSERT Table dsh_uac)";
returnError($error_message);
die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_dsh_uac);
	
	
	
	
if($stmt_emp_mst &&  $stmt_emp_det	&&	$stmt_emp_ls1	&&	$stmt_usg_itm	&&	$stmt_usg_emp	&&	$stmt_dsh_uac){
	 
	 sqlsrv_commit( $conn );
	 sqlsrv_close( $conn);	
	 returnData($ROW_ID,$emp_mst_empl_id);
	 
 }else{
	sqlsrv_rollback( $conn );
	$error_message = "Transaction rolled back.<br />";
	returnError($error_message);
 }
 
 
	
function returnData($ROW_ID,$emp_mst_empl_id){
	
	$returnData = array(
	'status' => 'SUCCESS',
	'ROW_ID'=>	$ROW_ID,
	'message' => 'Employee Number : ' .$emp_mst_empl_id . ' created successfully');
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