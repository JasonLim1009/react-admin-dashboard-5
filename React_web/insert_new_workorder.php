<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);
/* require_once ('send_notification.php');
require_once ('f_insert_notification_log.php');
require_once ('find_online_tablet.php');
require_once ('f_logging.php'); */

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
$wko_mst_wo_no = $data['wko_mst_wo_no'];
$wko_mst_assetno = $data['wko_mst_assetno'];
$wko_mst_status = $data['wko_mst_status'];
$wko_mst_asset_status = $data['wko_mst_asset_status'];
$wko_mst_plan_priority = $data['wko_mst_plan_priority'];
$wko_mst_asset_group_code = $data['wko_mst_asset_group_code'];
$wko_mst_org_date = $data['wko_mst_org_date'];
$wko_mst_chg_costcenter = $data['wko_mst_chg_costcenter'];
$wko_mst_due_date = $data['wko_mst_due_date'];
$wko_mst_work_area = $data['wko_mst_work_area'];
$wko_mst_originator = $data['wko_mst_originator'];
$wko_mst_asset_level = $data['wko_mst_asset_level'];
$wko_mst_phone = $data['wko_mst_phone'];
$wko_mst_asset_location = $data['wko_mst_asset_location'];
$wko_mst_flt_code = $data['wko_mst_flt_code'];
$wko_mst_descs = $data['wko_mst_descs'];

$wko_det_corr_action = $data['wko_det_corr_action'];
$wko_mst_project_id = $data['wko_mst_project_id'];
$wko_mst_orig_priority = $data['wko_mst_orig_priority'];
$wko_det_cause_code = $data['wko_det_cause_code'];
$wko_det_sched_date = $data['wko_det_sched_date'];
$wko_det_act_code = $data['wko_det_act_code'];
$wko_det_exc_date = $data['wko_det_exc_date'];
$wko_det_delay_cd = $data['wko_det_delay_cd'];
$wko_det_sc_date = $data['wko_det_sc_date'];
$wko_det_work_type = $data['wko_det_work_type'];
$wko_det_cmpl_date = $data['wko_det_cmpl_date'];
$wko_det_work_class = $data['wko_det_work_class'];
$wko_det_clo_date = $data['wko_det_clo_date'];
$wko_det_work_grp = $data['wko_det_work_grp'];
$wko_det_supv_id = $data['wko_det_supv_id'];
$wko_det_temp_asset = $data['wko_det_temp_asset'];
$wko_det_planner = $data['wko_det_planner'];
$wko_det_approved = $data['wko_det_approved'];
$wko_det_approver = $data['wko_det_approver'];
$wko_det_assign_to = $data['wko_det_assign_to'];
$wko_det_safety = $data['wko_det_safety'];
$wko_det_perm_id = $data['wko_det_perm_id'];

$wko_det_customer_cd = $data['wko_det_customer_cd'];
$wko_det_laccount = $data['wko_det_laccount'];
$wko_det_maccount = $data['wko_det_maccount'];
$wko_det_crd_costcenter = $data['wko_det_crd_costcenter'];
$wko_det_caccount = $data['wko_det_caccount'];
$wko_det_saccount = $data['wko_det_saccount'];
$wko_det_note1 = $data['wko_det_note1'];

$wko_det_varchar1 = $data['wko_det_varchar1'];
$wko_det_varchar2 = $data['wko_det_varchar2'];
$wko_det_varchar3 = $data['wko_det_varchar3'];
$wko_det_varchar4 = $data['wko_det_varchar4'];
$wko_det_varchar5 = $data['wko_det_varchar5'];
$wko_det_varchar6 = $data['wko_det_varchar6'];
$wko_det_varchar7 = $data['wko_det_varchar7'];
$wko_det_varchar8 = $data['wko_det_varchar8'];
$wko_det_varchar9 = $data['wko_det_varchar9'];
$wko_det_varchar10 = $data['wko_det_varchar10'];

$wko_det_numeric1 = $data['wko_det_numeric1'];
$wko_det_numeric2 = $data['wko_det_numeric2'];
$wko_det_numeric3 = $data['wko_det_numeric3'];
$wko_det_numeric4 = $data['wko_det_numeric4'];
$wko_det_numeric5 = $data['wko_det_numeric5'];

$wko_det_datetime1 = $data['wko_det_datetime1'];
$wko_det_datetime2 = $data['wko_det_datetime2'];
$wko_det_datetime3 = $data['wko_det_datetime3'];
$wko_det_datetime4 = $data['wko_det_datetime4'];
$wko_det_datetime5 = $data['wko_det_datetime5'];



$audit_user = $data['audit_user'];
$wko_mst_create_by = $data['wko_mst_create_by'];
$wko_mst_create_date = $data['wko_mst_create_date'];

$ast_aud_originator = $data['ast_aud_originator'];

$cnt_mst_numbering = $data['cnt_mst_numbering'];


switch ($cnt_mst_numbering)
    {

        case 'A':

            $sql = "Select cnt_mst_prefix + SUBSTRING(CONVERT(VARCHAR(7), cnt_mst_counter + 1000000), 2, 6)  ls_doc_no
					From 	cnt_mst WITH (UPDLOCK)
					Where 	site_cd ='" . $site_cd . "'
					And 	cnt_mst_module_cd =  'WKO'";

            $stmt = sqlsrv_query($conn, $sql);

            if ($stmt === false)
            {
                if (($errors = sqlsrv_errors()) != null)
                {
                    foreach ($errors as $error)
                    {

                        //file_put_contents($file_name, $now . "\r\n" . $sql . "\r\n" . "SQLSTATE: " . $error['SQLSTATE'] . "\r\n" . "code: " . $error['code'] . "\r\n" . "message: " . $error['message'] . "\r\n\r\n", FILE_APPEND);
                    }
                }
                sqlsrv_rollback($conn);
                sqlsrv_close($conn);

                $error_message = "(" . $now . ") Error selecting table (cnt_mst)";
                returnError($error_message);
            }

            do
            {
                while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC))
                {

                    $ls_doc_no = $row['ls_doc_no'];
                    $wko_mst_wo_no = $ls_doc_no;

                }
            }
            while (sqlsrv_next_result($stmt));
            sqlsrv_free_stmt($stmt);

            $sql = "Select Count(*) ll_dup_cnt	From wko_mst (NOLOCK)
						Where site_cd = '" . $site_cd . "'
						And wko_mst_wo_no = '" . $ls_doc_no . "'";

            $stmt = sqlsrv_query($conn, $sql);

            if ($stmt === false)
            {
                if (($errors = sqlsrv_errors()) != null)
                {
                    foreach ($errors as $error)
                    {

                       // file_put_contents($file_name, $now . "\r\n" . $sql . "\r\n" . "SQLSTATE: " . $error['SQLSTATE'] . "\r\n" . "code: " . $error['code'] . "\r\n" . "message: " . $error['message'] . "\r\n\r\n", FILE_APPEND);
                    }
                }
                sqlsrv_rollback($conn);
                sqlsrv_close($conn);

                $error_message = "(" . $now . ") Error selecting table (wko_mst)";
                returnError($error_message);
            }

            do
            {
                while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC))
                {
                    $ll_dup_cnt = $row['ll_dup_cnt'];

                }
            }
            while (sqlsrv_next_result($stmt));
            sqlsrv_free_stmt($stmt);

            if ($ll_dup_cnt == 1)
            {
                $error_message = "Asset number is already exists";
                returnError($error_message);
                die(print_r(sqlsrv_errors() , true));
            }

            break;

        case 'M':

            $sql = "Select Count(*) ll_dup_cnt	From wko_mst (NOLOCK)
					Where site_cd = '" . $site_cd . "'
					And wko_mst_wo_no = '" . $wko_mst_wo_no . "'";

            $stmt = sqlsrv_query($conn, $sql);

            if ($stmt === false)
            {
                if (($errors = sqlsrv_errors()) != null)
                {
                    foreach ($errors as $error)
                    {

                        file_put_contents($file_name, $now . "\r\n" . $sql . "\r\n" . "SQLSTATE: " . $error['SQLSTATE'] . "\r\n" . "code: " . $error['code'] . "\r\n" . "message: " . $error['message'] . "\r\n\r\n", FILE_APPEND);
                    }
                }
                sqlsrv_rollback($conn);
                sqlsrv_close($conn);

                $error_message = "(" . $now . ") Error selecting table (wko_mst)";
                returnError($error_message);
            }

            do
            {
                while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC))
                {
                    $ll_dup_cnt = $row['ll_dup_cnt'];

                }
            }
            while (sqlsrv_next_result($stmt));
            sqlsrv_free_stmt($stmt);

            if ($ll_dup_cnt == 1)
            {
                $error_message = "Asset number is already exists";
                returnError($error_message);
                die(print_r(sqlsrv_errors() , true));
            }

            break;
        }


//STEP-01
$sql_insert_wko_mst = "INSERT INTO wko_mst 
									(	site_cd,					wko_mst_wo_no,			wko_mst_originator,			wko_mst_phone, 
										wko_mst_asset_level,		wko_mst_assetno,		wko_mst_flt_code,			wko_mst_status, 
										wko_mst_due_date,			wko_mst_descs,			wko_mst_project_id,			wko_mst_org_date,
										wko_mst_chg_costcenter,		wko_mst_work_area,		wko_mst_asset_location,		wko_mst_asset_group_code, 
										wko_mst_orig_priority,		wko_mst_plan_priority,	wko_mst_type,				wko_mst_pm_grp,
										wko_mst_ast_cod,			audit_user,				audit_date,					wko_mst_create_by, 
										wko_mst_create_date,		column1,				column2,					column3, 
										column4,					column5 ) 
										
						VALUES (		?,							?,						?,							?,
										?,							?,						?,							?, 
										?,							?,						NULL,						?,
										?,							?,						?,							?,
										?,							?,						NULL,						NULL, 
										NULL,						?,						GetDate(),					?, 
										?,							NULL,					NULL,						NULL, 
										NULL,						NULL )";
								
								
$params_wko_mst = array(				$site_cd,					$wko_mst_wo_no,			$wko_mst_originator,		$wko_mst_phone, 
										$wko_mst_asset_level,		$wko_mst_assetno,		$wko_mst_flt_code,			$wko_mst_status, 
										$wko_mst_due_date,			$wko_mst_descs,			$wko_mst_project_id,		$wko_mst_org_date,
										$wko_mst_chg_costcenter,	$wko_mst_work_area,		$wko_mst_asset_location,	$wko_mst_asset_group_code, 
										$wko_mst_orig_priority,		$wko_mst_plan_priority,	$audit_user,				$wko_mst_create_by, 
										$wko_mst_create_date,		);
				
$stmt_wko_mst = sqlsrv_query( $conn,	$sql_insert_wko_mst,	$params_wko_mst);	

if( !$stmt_wko_mst ) {
	$error_message = "Error insert table (INSERT Table wko_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
sqlsrv_free_stmt($stmt_wko_mst);




//STEP-02
$sql = "SELECT Rowid From wko_mst  WHERE site_cd = '".$site_cd."'  AND wko_mst_wo_no = '".$wko_mst_wo_no."'";		
$stmt = sqlsrv_query( $conn, $sql);			
if( !$stmt ) {
	$error_message = "Error select table (wko_mst)";
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
$sql_insert_wko_det = "INSERT INTO wko_det 
									(	site_cd,					mst_RowID,					wko_det_wr_no,				wko_det_supv_id, 
										wko_det_planner,			wko_det_approver,			wko_det_perm_id,			wko_det_approved, 
										wko_det_safety,				wko_det_pm_grp,				wko_det_grp_code,			wko_det_task_id, 
										wko_det_pm_idno,			wko_det_route_id,			wko_det_work_type,			wko_det_work_locn, 
										wko_det_work_grp,			wko_det_exc_date,			wko_det_sched_date,			wko_det_cmpl_date, 
										wko_det_sc_date,			wko_det_ent_date,			wko_det_clo_date,			wko_det_act_code, 
										wko_det_critical_ratio,		wko_det_est_lab_cost,		wko_det_est_mtl_cost,		wko_det_est_con_cost, 
										wko_det_lab_cost,			wko_det_mtl_cost,			wko_det_con_cost,			wko_det_support_rqmt, 
										wko_det_corr_action,		wko_det_chg_costcenter,		wko_det_crd_costcenter,		wko_det_laccount, 
										wko_det_maccount,			wko_det_caccount,			wko_det_work_class,			wko_det_finance_clo, 
										wko_det_budget,				wko_det_wo_limit,			wko_det_fund_src,			wko_det_wo_open, 
										wko_det_dispatch,			wko_det_current_location,	wko_det_cause_code,			wko_det_wo_print, 
										wko_det_on_dispatch_q,		wko_det_check_out,			wko_det_assign_to,			wko_det_parent_wo, 
										wko_det_varchar1,			wko_det_varchar2,			wko_det_varchar3,			wko_det_varchar4, 
										wko_det_varchar5,			wko_det_varchar6,			wko_det_varchar7,			wko_det_varchar8, 
										wko_det_varchar9,			wko_det_varchar10,			wko_det_numeric1,			wko_det_numeric2, 
										wko_det_numeric3,			wko_det_numeric4,			wko_det_numeric5,			wko_det_datetime1, 
										wko_det_datetime2,			wko_det_datetime3,			wko_det_datetime4,			wko_det_datetime5, 
										wko_det_note1,				wko_det_saccount,			wko_det_est_misc_cost,		wko_det_misc_cost, 
										wko_det_customer_cd,		wko_det_temp_asset,			wko_det_contract_no,		wko_det_delay_cd, 
										wko_det_wr_org_date,		wko_det_wr_due_date,		audit_user,					audit_date, 
										column1,					column2,					column3,					column4, 
										column5 ) 
										
						VALUES (		?,							?,							NULL,						?, 
										?,							?,							?,							?, 
										NULL,						NULL,						NULL,						NULL, 
										NULL,						NULL,						?,							NULL, 
										?,							?,							?,							?, 
										NULL,						NULL,						?,							?,
										NULL,						NULL,						NULL,						NULL, 
										NULL,						NULL,						NULL,						NULL, 
										?,							NULL,						?,							?, 
										?,							?,							?,							NULL, 
										NULL,						NULL,						NULL,						'Y', 
										NULL,						NULL,						?,							NULL, 
										NULL,						NULL,						?,							NULL, 
										?,							?,							?,							?,
										?,							?,							?,							?,
										?,							?,							?,							?,		
										?,							?,							?,							?,		
										?,							?,							?,							?,
										?,							?,							NULL,						NULL, 
										NULL,						?,							NULL,						NULL, 
										NULL,						NULL,						?,							GetDate(), 
										NULL,						NULL,						NULL,						NULL, 
										NULL )";


$params_wko_det = array(				$site_cd,					$ROW_ID,					$wko_det_supv_id, 			$wko_det_planner,										
										$wko_det_approver,			$wko_det_perm_id,			$wko_det_approved,			$wko_det_safety,				$wko_det_work_type,			$wko_det_work_grp,			$wko_det_exc_date,			
										$wko_det_sched_date,		$wko_det_cmpl_date,			$wko_det_clo_date,			$wko_det_act_code, 			
										$wko_det_corr_action,		$wko_det_crd_costcenter,	$wko_det_laccount,			$wko_det_maccount,			
										$wko_det_caccount,			$wko_det_work_class			$wko_det_cause_code,		$wko_det_assign_to,			$wko_det_varchar1,			
										$wko_det_varchar2,			$wko_det_varchar3,			$wko_det_varchar4, 			$wko_det_varchar5,			
										$wko_det_varchar6,			$wko_det_varchar7,			$wko_det_varchar8, 			$wko_det_varchar9,			
										$wko_det_varchar10,			$wko_det_numeric1,			$wko_det_numeric2, 			$wko_det_numeric3,			
										$wko_det_numeric4,			$wko_det_numeric5,			$wko_det_datetime1, 		$wko_det_datetime2,		
										$wko_det_datetime3,			$wko_det_datetime4,			$wko_det_datetime5, 		$wko_det_note1,			
										$wko_det_saccount,			$wko_det_temp_asset,		$wko_det_delay_cd,			$audit_user					) ;	
							
$stmt_wko_det = sqlsrv_query( $conn,	$sql_insert_wko_det,	$params_wko_det);	
if( !$stmt_wko_det ) {
	$error_message = "Error insert table (INSERT Table wko_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_wko_det);




	
	
	
	
if($stmt_wko_mst &&  $stmt_wko_det){
	
	
	if ($cnt_mst_numbering == "A")
        {

            $sql = "UPDATE 	cnt_mst WITH (UPDLOCK)
				SET 	cnt_mst_counter = cnt_mst_counter + 1
				WHERE 	site_cd ='" . $site_cd . "' 
				AND 	cnt_mst_module_cd = 'WKO'";

            $stmt = sqlsrv_query($conn, $sql);

            if ($stmt === false)
            {
                if (($errors = sqlsrv_errors()) != null)
                {
                    foreach ($errors as $error)
                    {

                        //file_put_contents($file_name, $now . "\r\n" . $sql . "\r\n" . "SQLSTATE: " . $error['SQLSTATE'] . "\r\n" . "code: " . $error['code'] . "\r\n" . "message: " . $error['message'] . "\r\n\r\n", FILE_APPEND);
                    }
                }
                sqlsrv_rollback($conn);
                sqlsrv_close($conn);

                $error_message = "(" . $now . ") Error updating table (cnt_mst)";
                returnError($error_message);
            }
            sqlsrv_free_stmt($stmt);

        }
        else
        {

            $sql = "UPDATE 	wrk_typ WITH (UPDLOCK)
			SET 	wrk_typ_counter = wrk_typ_counter + 1
			WHERE 	site_cd ='" . $site_cd . "' 
			AND 	wrk_typ_typ_cd = '" . $wko_det_work_type."'";

            $stmt = sqlsrv_query($conn, $sql);

            if ($stmt === false)
            {
                if (($errors = sqlsrv_errors()) != null)
                {
                    foreach ($errors as $error)
                    {

                       // file_put_contents($file_name, $now . "\r\n" . $sql . "\r\n" . "SQLSTATE: " . $error['SQLSTATE'] . "\r\n" . "code: " . $error['code'] . "\r\n" . "message: " . $error['message'] . "\r\n\r\n", FILE_APPEND);
                    }
                }
                sqlsrv_rollback($conn);
                sqlsrv_close($conn);

                $error_message = "(" . $now . ") Error updating table (wrk_typ)";
                returnError($error_message);
            }
            sqlsrv_free_stmt($stmt);

        }
	 
	 sqlsrv_commit( $conn );
	 sqlsrv_close( $conn);	
	 returnData($ROW_ID, $wko_mst_wo_no);
	 
 }else{
	sqlsrv_rollback( $conn );
	$error_message = "Transaction rolled back.<br />";
	returnError($error_message);
 }
 
 
	
function returnData($ROW_ID, $wko_mst_wo_no){
	
	$returnData = array(
	'status' => 'SUCCESS',
	'ROW_ID'=>	$ROW_ID,
	'message' => 'Work Order Number : ' .$wko_mst_wo_no . ' created successfully');
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