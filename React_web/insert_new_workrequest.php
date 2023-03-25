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
$wkr_mst_wr_no = $data['wkr_mst_wr_no'];
//$wkr_mst_wr_status = $data['wkr_mst_wr_status'];
//$wkr_mst_temp_asset = $data['wkr_mst_temp_asset'];
//$wkr_mst_email_notification = $data['wkr_mst_email_notification'];
$wkr_mst_assetno = $data['wkr_mst_assetno'];
$wkr_mst_work_area = $data['wkr_mst_work_area'];
$wkr_mst_chg_costcenter = $data['wkr_mst_chg_costcenter'];
$wkr_mst_assetlocn = $data['wkr_mst_assetlocn'];
$wkr_mst_orig_priority = $data['wkr_mst_orig_priority'];
$wkr_mst_location = $data['wkr_mst_location'];
$wkr_mst_org_date = $data['wkr_mst_org_date'];
$wkr_mst_work_type = $data['wkr_mst_work_type'];
$wkr_mst_due_date = $data['wkr_mst_due_date'];
$wkr_mst_work_class = $data['wkr_mst_work_class'];
$wkr_mst_originator = $data['wkr_mst_originator'];
$wkr_mst_work_group = $data['wkr_mst_work_group'];
$wkr_mst_phone = $data['wkr_mst_phone'];
$wkr_mst_projectid = $data['wkr_mst_projectid'];
$wkr_mst_fault_code = $data['wkr_mst_fault_code'];
$wkr_mst_wr_descs = $data['wkr_mst_wr_descs'];

$wkr_det_note1 = $data['wkr_det_note1'];
$wkr_det_note2 = $data['wkr_det_note2'];

$wkr_det_varchar1 = $data['wkr_det_varchar1'];
$wkr_det_varchar2 = $data['wkr_det_varchar2'];
$wkr_det_varchar3 = $data['wkr_det_varchar3'];
$wkr_det_varchar4 = $data['wkr_det_varchar4'];
$wkr_det_varchar5 = $data['wkr_det_varchar5'];
$wkr_det_varchar6 = $data['wkr_det_varchar6'];
$wkr_det_varchar7 = $data['wkr_det_varchar7'];
$wkr_det_varchar8 = $data['wkr_det_varchar8'];
$wkr_det_varchar9 = $data['wkr_det_varchar9'];
$wkr_det_varchar10 = $data['wkr_det_varchar10'];
$wkr_det_varchar11 = $data['wkr_det_varchar11'];
$wkr_det_varchar12 = $data['wkr_det_varchar12'];
$wkr_det_varchar13 = $data['wkr_det_varchar13'];
$wkr_det_varchar14 = $data['wkr_det_varchar14'];
$wkr_det_varchar15 = $data['wkr_det_varchar15'];
$wkr_det_varchar16 = $data['wkr_det_varchar16'];
$wkr_det_varchar17 = $data['wkr_det_varchar17'];
$wkr_det_varchar18 = $data['wkr_det_varchar18'];
$wkr_det_varchar19 = $data['wkr_det_varchar19'];
$wkr_det_varchar20 = $data['wkr_det_varchar20'];

$wkr_det_numeric1 = $data['wkr_det_numeric1'];
$wkr_det_numeric2 = $data['wkr_det_numeric2'];
$wkr_det_numeric3 = $data['wkr_det_numeric3'];
$wkr_det_numeric4 = $data['wkr_det_numeric4'];
$wkr_det_numeric5 = $data['wkr_det_numeric5'];
$wkr_det_numeric6 = $data['wkr_det_numeric6'];
$wkr_det_numeric7 = $data['wkr_det_numeric7'];
$wkr_det_numeric8 = $data['wkr_det_numeric8'];
$wkr_det_numeric9 = $data['wkr_det_numeric9'];
$wkr_det_numeric10 = $data['wkr_det_numeric10'];

$wkr_det_datetime1 = $data['wkr_det_datetime1'];
$wkr_det_datetime2 = $data['wkr_det_datetime2'];
$wkr_det_datetime3 = $data['wkr_det_datetime3'];
$wkr_det_datetime4 = $data['wkr_det_datetime4'];
$wkr_det_datetime5 = $data['wkr_det_datetime5'];
$wkr_det_datetime6 = $data['wkr_det_datetime6'];
$wkr_det_datetime7 = $data['wkr_det_datetime7'];
$wkr_det_datetime8 = $data['wkr_det_datetime8'];
$wkr_det_datetime9 = $data['wkr_det_datetime9'];
$wkr_det_datetime10 = $data['wkr_det_datetime10'];



$audit_user = $data['audit_user'];
$wkr_mst_create_by = $data['wkr_mst_create_by'];
$wkr_mst_create_date = $data['wkr_mst_create_date'];

$ast_aud_originator = $data['ast_aud_originator'];

$cnt_mst_numbering = $data['cnt_mst_numbering'];


switch ($cnt_mst_numbering)
    {

        case 'A':

            $sql = "Select cnt_mst_prefix + SUBSTRING(CONVERT(VARCHAR(7), cnt_mst_counter + 1000000), 2, 6)  ls_doc_no
					From 	cnt_mst WITH (UPDLOCK)
					Where 	site_cd ='" . $site_cd . "'
					And 	cnt_mst_module_cd =  'WKR'";

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
                    $wkr_mst_wr_no = $ls_doc_no;

                }
            }
            while (sqlsrv_next_result($stmt));
            sqlsrv_free_stmt($stmt);

            $sql = "Select Count(*) ll_dup_cnt	From wkr_mst (NOLOCK)
						Where site_cd = '" . $site_cd . "'
						And wkr_mst_wr_no = '" . $ls_doc_no . "'";

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

                $error_message = "(" . $now . ") Error selecting table (wkr_mst)";
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

            $sql = "Select Count(*) ll_dup_cnt	From wkr_mst (NOLOCK)
					Where site_cd = '" . $site_cd . "'
					And wkr_mst_wr_no = '" . $wkr_mst_wr_no . "'";

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

                $error_message = "(" . $now . ") Error selecting table (wkr_mst)";
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
$sql_insert_wkr_mst = "INSERT INTO wkr_mst ( 
										site_cd,					wkr_mst_wr_no,					wkr_mst_org_date,					wkr_mst_org_time, 
										wkr_mst_taken_by,			wkr_mst_originator,				wkr_mst_phone,						wkr_mst_orig_priority, 
										wkr_mst_due_date,			wkr_mst_fault_code,				wkr_mst_wr_descs,					wkr_mst_assetno, 
										wkr_mst_wr_status,			wkr_mst_wo_status,				wkr_mst_work_type,					wkr_mst_work_class, 
										wkr_mst_chg_costcenter,		wkr_mst_work_group,				wkr_mst_approved,					wkr_mst_location, 
										wkr_mst_assetdesc,			wkr_mst_projectid,				wkr_mst_work_area,					wkr_mst_planner, 
										wkr_mst_assetlocn,			wkr_mst_requestor,				wkr_mst_requestor_phone,			wkr_mst_org_locn, 
										wkr_mst_dept,				wkr_mst_capital_project,		wkr_mst_temp_asset,					wkr_mst_email_notification, 
										audit_user,					audit_date,						wkr_mst_create_by,					wkr_mst_create_date, 
										column1,					column2,						column3, 							column4, 
										column5 ) 

							VALUES (	?,							?,								?,									NULL, 
										NULL,						?,								?,									?,
										?,							NULL,							?,									?,
										NULL,						NULL,							?,									NULL, 
										?,							?,								NULL,								?, 
										NULL,						NULL,							?,									NULL,
										?,							NULL,							NULL,								NULL,
										NULL,						NULL,							NULL,								NULL, 
										?,							GetDate(),						?,									?,
										NULL,						NULL,							NULL,								NULL, 
										NULL )";
								
								
$params_wkr_mst = array(				$site_cd,					$wkr_mst_wr_no,					$wkr_mst_org_date,						
																	$wkr_mst_originator,			$wkr_mst_phone,						$wkr_mst_orig_priority, 
										$wkr_mst_due_date,											$wkr_mst_wr_descs,					$wkr_mst_assetno, 
																									$wkr_mst_work_type,						
										$wkr_mst_chg_costcenter,	$wkr_mst_work_group,												$wkr_mst_location, 
																									$wkr_mst_work_area,						 
										$wkr_mst_assetlocn,																					 
																																			
										$audit_user,												$wkr_mst_create_by,					$wkr_mst_create_date, 
										 ) ;
				
$stmt_wkr_mst = sqlsrv_query( $conn,	$sql_insert_wkr_mst,	$params_wkr_mst);	

if( !$stmt_wkr_mst ) {
	$error_message = "Error insert table (INSERT Table wkr_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
sqlsrv_free_stmt($stmt_wkr_mst);




//STEP-02
$sql = "SELECT Rowid From wkr_mst  WHERE site_cd = '".$site_cd."'  AND wkr_mst_wr_no = '".$wkr_mst_wr_no."'";		
$stmt = sqlsrv_query( $conn, $sql);			
if( !$stmt ) {
	$error_message = "Error select table (wkr_mst)";
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
$sql_insert_wkr_det = "INSERT INTO wkr_det ( 
										site_cd,				mst_RowID,				wkr_det_reject_by,				wkr_det_reject_desc, 
										wkr_det_reject_date,	wkr_det_approver,		wkr_det_appr_date,				wkr_det_wo, 
										wkr_det_varchar1,		wkr_det_varchar2,		wkr_det_varchar3,				wkr_det_varchar4, 
										wkr_det_varchar5,		wkr_det_varchar6,		wkr_det_varchar7,				wkr_det_varchar8, 
										wkr_det_varchar9,		wkr_det_varchar10,		wkr_det_varchar11,				wkr_det_varchar12,
										wkr_det_varchar13,		wkr_det_varchar14,		wkr_det_varchar15,				wkr_det_varchar16, 
										wkr_det_varchar17,		wkr_det_varchar18,		wkr_det_varchar19,				wkr_det_varchar20, 
										wkr_det_varchar21,		wkr_det_varchar22,		wkr_det_varchar23,				wkr_det_varchar24, 
										wkr_det_varchar25,		wkr_det_varchar26,		wkr_det_varchar27,				wkr_det_varchar28, 
										wkr_det_varchar29,		wkr_det_varchar30,		wkr_det_numeric1,				wkr_det_numeric2, 
										wkr_det_numeric3,		wkr_det_numeric4,		wkr_det_numeric5,				wkr_det_numeric6, 
										wkr_det_numeric7,		wkr_det_numeric8,		wkr_det_numeric9,				wkr_det_numeric10, 
										wkr_det_numeric11,		wkr_det_numeric12,		wkr_det_numeric13,				wkr_det_numeric14, 
										wkr_det_numeric15,		wkr_det_numeric16,		wkr_det_numeric17,				wkr_det_numeric18, 
										wkr_det_numeric19,		wkr_det_numeric20,		wkr_det_datetime1,				wkr_det_datetime2, 
										wkr_det_datetime3,		wkr_det_datetime4,		wkr_det_datetime5,				wkr_det_datetime6,
										wkr_det_datetime7,		wkr_det_datetime8,		wkr_det_datetime9,				wkr_det_datetime10,
										wkr_det_datetime11,		wkr_det_datetime12,		wkr_det_datetime13,				wkr_det_datetime14,
										wkr_det_datetime15,		wkr_det_datetime16,		wkr_det_datetime17,				wkr_det_datetime18, 
										wkr_det_datetime19,		wkr_det_datetime20,		wkr_det_note1,					wkr_det_note2, 
										wkr_det_note3,			audit_user,				audit_date,						column1, 
										column2,				column3,				column4,						column5 ) 
 
							VALUES (	?,						?,						NULL,							NULL, 
										NULL,					NULL,					NULL,							NULL, 
										?,						NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL, 
										NULL,					NULL,					NULL,							NULL, 
										NULL,					NULL,					NULL,							NULL, 
										NULL,					NULL,					NULL,							NULL, 
										NULL,					NULL,					NULL,							NULL, 
										NULL,					NULL,					NULL,							NULL, 
										NULL,					NULL,					NULL,							NULL, 
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					NULL,							NULL,
										NULL,					NULL,					?,								NULL, 
										NULL,					?,						GetDate(),						NULL, 
										NULL,					NULL,					NULL,							NULL )";


$params_wkr_det = array(				$site_cd,				$ROW_ID,				$wkr_det_varchar1,				$wkr_det_note1,				$audit_user	 ) ;	
							
$stmt_wkr_det = sqlsrv_query( $conn,	$sql_insert_wkr_det,	$params_wkr_det);	
if( !$stmt_wkr_det ) {
	$error_message = "Error insert table (INSERT Table wkr_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_wkr_det);




	
	
	
	
if($stmt_wkr_mst &&  $stmt_wkr_det){
	
	
	if ($cnt_mst_numbering == "A")
        {

            $sql = "UPDATE 	cnt_mst WITH (UPDLOCK)
				SET 	cnt_mst_counter = cnt_mst_counter + 1
				WHERE 	site_cd ='" . $site_cd . "' 
				AND 	cnt_mst_module_cd = 'WKR'";

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

            $sql = "update cnt_mst WITH ( UPDLOCK ) 
					SET cnt_mst_counter =cnt_mst_counter + 1 
					WHERE site_cd ='" . $site_cd . "' 
					AND cnt_mst_module_cd = '" . $wkr_mst_work_type."'";

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
	 returnData($ROW_ID,$wkr_mst_wr_no);
	 
 }else{
	sqlsrv_rollback( $conn );
	$error_message = "Transaction rolled back.<br />";
	returnError($error_message);
 }
 
 
	
function returnData($ROW_ID,$wkr_mst_wr_no){
	
	$returnData = array(
	'status' => 'SUCCESS',
	'ROW_ID'=>	$ROW_ID,
	'message' => 'Work Request Number : ' .$wkr_mst_wr_no . ' created successfully');
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