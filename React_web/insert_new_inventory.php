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
$itm_mst_type = $data['itm_mst_type'];
$itm_mst_com_code = $data['itm_mst_com_code'];
$itm_mst_stockno = $data['itm_mst_stockno'];
$itm_mst_itm_grp = $data['itm_mst_itm_grp'];
$itm_mst_mstr_locn = $data['itm_mst_mstr_locn'];
$itm_mst_partno = $data['itm_mst_partno'];
$itm_mst_order_rule = $data['itm_mst_order_rule'];
$itm_mst_costcenter = $data['itm_mst_costcenter'];
$itm_mst_account = $data['itm_mst_account'];
$itm_mst_desc = $data['itm_mst_desc'];
$itm_mst_ext_desc = $data['itm_mst_ext_desc'];

$itm_det_part_deac_status = $data['itm_det_part_deac_status'];
$itm_det_auto_spare = $data['itm_det_auto_spare'];
$itm_det_issue_uom = $data['itm_det_issue_uom'];
$itm_det_critical_spare = $data['itm_det_critical_spare'];
$itm_det_rcv_uom = $data['itm_det_rcv_uom'];
$itm_det_hzd_mtl = $data['itm_det_hzd_mtl'];
$itm_det_abc_class = $data['itm_det_abc_class'];
$itm_det_storage_type = $data['itm_det_storage_type'];
$itm_det_order_pt = $data['itm_det_order_pt'];
$itm_det_cube = $data['itm_det_cube'];
$itm_det_maximum = $data['itm_det_maximum'];
$itm_det_shelf_life = $data['itm_det_shelf_life'];
$itm_det_lastactdate = $data['itm_det_lastactdate'];
$itm_det_lastcntdate = $data['itm_det_lastcntdate'];
$itm_det_next_cnt_date = $data['itm_det_next_cnt_date'];

$itm_det_note1 = $data['itm_det_note1'];
$itm_det_varchar1 = $data['itm_det_varchar1'];
$itm_det_varchar2 = $data['itm_det_varchar2'];
$itm_det_varchar3 = $data['itm_det_varchar3'];
$itm_det_varchar4 = $data['itm_det_varchar4'];
$itm_det_varchar5 = $data['itm_det_varchar5'];
$itm_det_varchar6 = $data['itm_det_varchar6'];
$itm_det_varchar7 = $data['itm_det_varchar7'];
$itm_det_varchar8 = $data['itm_det_varchar8'];
$itm_det_varchar9 = $data['itm_det_varchar9'];
$itm_det_varchar10 = $data['itm_det_varchar10'];

$itm_det_numeric1 = $data['itm_det_numeric1'];
$itm_det_numeric2 = $data['itm_det_numeric2'];
$itm_det_numeric3 = $data['itm_det_numeric3'];
$itm_det_numeric4 = $data['itm_det_numeric4'];
$itm_det_numeric5 = $data['itm_det_numeric5'];

$itm_det_datetime1 = $data['itm_det_datetime1'];
$itm_det_datetime2 = $data['itm_det_datetime2'];
$itm_det_datetime3 = $data['itm_det_datetime3'];
$itm_det_datetime4 = $data['itm_det_datetime4'];
$itm_det_datetime5 = $data['itm_det_datetime5'];

$itm_det_acct_type = $data['itm_det_acct_type'];
$itm_det_tax_cd = $data['itm_det_tax_cd'];
$itm_det_cr_code = $data['itm_det_cr_code'];
$itm_det_avg_cost = $data['itm_det_avg_cost'];
$itm_det_std_cost = $data['itm_det_std_cost'];
$itm_det_last_cost = $data['itm_det_last_cost'];



$itm_mst_create_by = $data['itm_mst_create_by'];
$itm_mst_create_date = $data['itm_mst_create_date'];



$audit_user = $data['audit_user'];

$ast_aud_originator = $data['ast_aud_originator'];

$cnt_mst_numbering = $data['cnt_mst_numbering'];


switch ($cnt_mst_numbering)
    {

        case 'A':

            $sql = "Select cnt_mst_prefix + SUBSTRING(CONVERT(VARCHAR(7), cnt_mst_counter + 1000000), 2, 6)  ls_doc_no
					From 	cnt_mst WITH (UPDLOCK)
					Where 	site_cd ='" . $site_cd . "'
					And 	cnt_mst_module_cd =  'ITM'";

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
                    $itm_mst_stockno = $ls_doc_no;

                }
            }
            while (sqlsrv_next_result($stmt));
            sqlsrv_free_stmt($stmt);

            $sql = "Select Count(*) ll_dup_cnt	From itm_mst (NOLOCK)
						Where site_cd = '" . $site_cd . "'
						And itm_mst_stockno = '" . $ls_doc_no . "'";

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

                $error_message = "(" . $now . ") Error selecting table (itm_mst)";
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

            $sql = "Select Count(*) ll_dup_cnt	From itm_mst (NOLOCK)
					Where site_cd = '" . $site_cd . "'
					And itm_mst_stockno = '" . $itm_mst_stockno . "'";

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

                $error_message = "(" . $now . ") Error selecting table (itm_mst)";
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
$sql_insert_itm_mst = "INSERT INTO itm_mst 
									(	site_cd,					itm_mst_stockno,				itm_mst_partno,					itm_mst_desc, 
										itm_mst_issue_price,		itm_mst_ttl_oh,					itm_mst_issue_uom,				itm_mst_com_code, 
										itm_mst_mstr_locn,			itm_mst_non_stk_flg,			itm_mst_tool_flg,				itm_mst_order_rule, 
										itm_mst_costcenter,			itm_mst_account,				itm_mst_rec_supplier,			itm_mst_ext_desc, 
										itm_mst_serialize_flg,		itm_mst_auto_serialize_flg,		itm_mst_serialize_counter,		itm_mst_type, 
										itm_mst_itm_grp,			itm_mst_itm_use,				itm_mst_varchar1,				itm_mst_varchar2, 
										itm_mst_varchar3,			itm_mst_varchar4,				itm_mst_varchar5,				itm_mst_varchar6, 
										itm_mst_varchar7,			itm_mst_varchar8,				itm_mst_varchar9,				itm_mst_varchar10, 
										itm_mst_numeric1,			itm_mst_numeric2,				itm_mst_numeric3,				itm_mst_numeric4, 
										itm_mst_numeric5,			itm_mst_datetime1,				itm_mst_datetime2,				itm_mst_datetime3, 
										itm_mst_datetime4,			itm_mst_datetime5,				itm_mst_note1,					audit_user, 
										audit_date,					itm_mst_create_by,				itm_mst_create_date,			column1, 
										column2,					column3,						column4,						column5 ) 
							
							VALUES (	?,							?,								?,								?, 
										NULL,						NULL,							NULL,							?, 
										?,							NULL,							NULL,							?, 
										?,							?,								NULL,							?,
										NULL,						NULL,							NULL,							?,
										?,							NULL,							NULL,							NULL, 
										NULL,						NULL,							NULL,							NULL,
										NULL,						NULL,							NULL,							NULL, 
										NULL,						NULL,							NULL,							NULL, 
										NULL,						NULL,							NULL,							NULL, 
										NULL,						NULL,							NULL,							?, 
										GetDate(),					?,								?,								NULL,
										NULL,						NULL,							NULL,							NULL )";
								
								
$params_itm_mst = array(				$site_cd,					$itm_mst_stockno,				$itm_mst_partno,				$itm_mst_desc, 
																																	$itm_mst_com_code, 
										$itm_mst_mstr_locn,																			$itm_mst_order_rule, 
										$itm_mst_costcenter,		$itm_mst_account,												$itm_mst_ext_desc, 
																																	$itm_mst_type, 
										$itm_mst_itm_grp,														
																																	$audit_user, 
																	$itm_mst_create_by,				$itm_mst_create_date			);
				
$stmt_itm_mst = sqlsrv_query( $conn,	$sql_insert_itm_mst,	$params_itm_mst);	

if( !$stmt_itm_mst ) {
	$error_message = "Error insert table (INSERT Table itm_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}
sqlsrv_free_stmt($stmt_itm_mst);




//STEP-02
$sql = "SELECT Rowid From itm_mst  WHERE site_cd = '".$site_cd."'  AND itm_mst_stockno = '".$itm_mst_stockno."'";		
$stmt = sqlsrv_query( $conn, $sql);			
if( !$stmt ) {
	$error_message = "Error select table (itm_mst)";
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
$sql_insert_itm_det = "INSERT INTO itm_det 
									(	site_cd,					mst_RowID,						itm_det_issue_uom,					itm_det_rcv_uom, 
										itm_det_lastcntdate,		itm_det_lastactdate,			itm_det_next_cnt_date,				itm_det_hzd_mtl, 
										itm_det_auto_spare,			itm_det_critical_spare,			itm_det_abc_class,					itm_det_count_freq, 
										itm_det_storage_type,		itm_det_cube,					itm_det_shelf_life,					itm_det_avg_leadtime, 
										itm_det_part_deac_status,	itm_det_order_pt,				itm_det_maximum,					itm_det_minimum, 
										itm_det_acct_type,			itm_det_eoq,					itm_det_ttl_oh,						itm_det_issue_price, 
										itm_det_item_cost,			itm_det_ttl_soft_resrv,			itm_det_ttl_hard_resrv,				itm_det_ttl_short, 
										itm_det_ytd_usage,			itm_det_ytd_turns,				itm_det_ytd_stockouts,				itm_det_lastyr_usage, 
										itm_det_lastyr_turns,		itm_det_lastyr_stkouts,			itm_det_taxable,					itm_det_std_cost, 
										itm_det_avg_cost,			itm_det_last_cost,				itm_det_pr_due_in,					itm_det_due_in, 
										itm_det_cr_code,			itm_det_safestk_level,			itm_det_stk_parentid,				itm_det_ttl_repair, 
										itm_det_tax_cd,				itm_det_varchar1,				itm_det_varchar2,					itm_det_varchar3, 
										itm_det_varchar4,			itm_det_varchar5,				itm_det_varchar6,					itm_det_varchar7, 
										itm_det_varchar8,			itm_det_varchar9,				itm_det_varchar10,					itm_det_numeric1, 
										itm_det_numeric2,			itm_det_numeric3,				itm_det_numeric4,					itm_det_numeric5, 
										itm_det_datetime1,			itm_det_datetime2,				itm_det_datetime3,					itm_det_datetime4, 
										itm_det_datetime5,			itm_det_note1,					audit_user,							audit_date, 
										column1,					column2,						column3,							column4, 
										column5 ) 

							VALUES (	?,							?,							?,										?,
										?,							?,							?,										?, 
										?,							?,							?,										NULL, 
										?,							?,							?,										NULL,
										?,							?,							?,										NULL, 
										?,							NULL,						NULL,									NULL,
										NULL,						NULL,						NULL,									NULL,
										NULL,						NULL,						NULL,									NULL, 
										NULL,						NULL,						0,										?, 
										?,							?,							NULL,									NULL, 
										?,							NULL,						NULL,									NULL,
										?,							?,							?,										?, 
										?,							?,							?,										?, 
										?,							?,							?,										?, 
										?,							?,							?,										?, 
										?,							?,							?,										?, 
										?,							?,							?,										GetDate(),
										NULL,						NULL,						NULL,									NULL, 
										NULL )	";


$params_itm_det = array(				$site_cd,					$ROW_ID,						$itm_det_issue_uom,					$itm_det_rcv_uom, 
										$itm_det_lastcntdate,		$itm_det_lastactdate,			$itm_det_next_cnt_date,				$itm_det_hzd_mtl, 
										$itm_det_auto_spare,		$itm_det_critical_spare,		$itm_det_abc_class,
										$itm_det_storage_type,		$itm_det_cube,					$itm_det_shelf_life,
										$itm_det_part_deac_status,	$itm_det_order_pt,				$itm_det_maximum,			
										$itm_det_acct_type,																					
																																		
																																	
																																		$itm_det_std_cost, 
										$itm_det_avg_cost,			$itm_det_last_cost,																						
										$itm_det_cr_code,																				
										$itm_det_tax_cd,			$itm_det_varchar1,				$itm_det_varchar2,					$itm_det_varchar3,
										$itm_det_varchar4,			$itm_det_varchar5,				$itm_det_varchar6,					$itm_det_varchar7,
										$itm_det_varchar8,			$itm_det_varchar9,				$itm_det_varchar10,					$itm_det_numeric1, 
										$itm_det_numeric2,			$itm_det_numeric3,				$itm_det_numeric4,					$itm_det_numeric5, 
										$itm_det_datetime1,			$itm_det_datetime2,				$itm_det_datetime3,					$itm_det_datetime4, 
										$itm_det_datetime5,			$itm_det_note1,					$audit_user								 
										) ;	
							
$stmt_itm_det = sqlsrv_query( $conn,	$sql_insert_itm_det,	$params_itm_det);	
if( !$stmt_itm_det ) {
	$error_message = "Error insert table (INSERT Table itm_det)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_itm_det);




//STEP-04
$sql_insert_itm_loc = "INSERT INTO itm_loc 
							(	site_cd,							itm_loc_stk_loc,				mst_RowID,								itm_loc_part_no, 
								itm_loc_special_idno,				itm_loc_oh_qty,					itm_loc_item_cost,						itm_loc_costcenter, 
								itm_loc_account,					itm_loc_create_date,			itm_loc_lastactdate,					itm_loc_lastcntdate, 
								itm_loc_stock_cost_flag,			itm_loc_order_rule,				itm_loc_lockout4count,					itm_loc_order_pt, 
								itm_loc_maximum,					itm_loc_minimum,				itm_loc_inc_ttloh,						itm_loc_mtl_usage,						
								itm_loc_supplier_partno,			itm_loc_prim_locn_flg,			itm_loc_next_cnt_date,					itm_loc_pr_due_in,						
								itm_loc_due_in,						itm_loc_hard_resrv,				itm_loc_short_qty,						itm_loc_varchar1,						
								itm_loc_varchar2,					itm_loc_varchar3,				itm_loc_varchar4,						itm_loc_varchar5,						
								itm_loc_varchar6,					itm_loc_varchar7,				itm_loc_varchar8,						itm_loc_varchar9,					
								itm_loc_varchar10,					itm_loc_numeric1,				itm_loc_numeric2,						itm_loc_numeric3,					
								itm_loc_numeric4,					itm_loc_numeric5,				itm_loc_datetime1,						itm_loc_datetime2,				
								itm_loc_datetime3,					itm_loc_datetime4,				itm_loc_datetime5,						audit_user,							
								audit_date,							column1,						column2,								column3,								
								column4,							column5 ) 

					VALUES (	?,									0,								?,										NULL, 
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									NULL,
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									NULL, 
								NULL,								NULL,							NULL,									?, 
								GetDate(),							NULL,							NULL,									NULL, 
								NULL,								NULL )";	
				
$params_itm_loc = array(		$site_cd,															$ROW_ID,									 
																																																									
																																			$audit_user,																											
																		) ;	
							
$stmt_itm_loc = sqlsrv_query( 	$conn,		$sql_insert_itm_loc,	$params_itm_loc);	
if( !$stmt_itm_loc ) {
	$error_message = "Error insert table (INSERT Table itm_loc)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt( $stmt_itm_loc);


	
	
	
	
if($stmt_itm_mst &&  $stmt_itm_det &&  $stmt_itm_loc ){
	
	
	if ($cnt_mst_numbering == "A")
        {

            $sql = "UPDATE 	cnt_mst WITH (UPDLOCK)
				SET 	cnt_mst_counter = cnt_mst_counter + 1
				WHERE 	site_cd ='" . $site_cd . "' 
				AND 	cnt_mst_module_cd = 'ITM'";

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

                $error_message = "(" . $now . ") Error updating table (itm_typ)";
                returnError($error_message);
            }
            sqlsrv_free_stmt($stmt);

        }
	 
	 sqlsrv_commit( $conn );
	 sqlsrv_close( $conn);	
	 returnData($ROW_ID, $itm_mst_stockno);
	 
 }else{
	sqlsrv_rollback( $conn );
	$error_message = "Transaction rolled back.<br />";
	returnError($error_message);
 }
 
 
	
function returnData($ROW_ID, $itm_mst_stockno){
	
	$returnData = array(
	'status' => 'SUCCESS',
	'ROW_ID'=>	$ROW_ID,
	'message' => 'Inventory Number : ' .$itm_mst_stockno . ' created successfully');
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