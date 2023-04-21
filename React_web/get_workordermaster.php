<?php
// get these values from your DB.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once ('config.php');
require_once ('functions.php');

$error_message;
$valid = true;


$site_cd = $_REQUEST['site_cd'];



$key[0] = "site_cd";
$key[1] = "wko_mst_wo_no";
$key[2] = "wko_mst_assetno";
$key[3] = "wko_det_parent_wo";
$key[4] = "wko_mst_pm_grp";
$key[5] = "wko_mst_status";
$key[6] = "wko_mst_descs";
$key[7] = "wko_mst_chg_costcenter";
$key[8] = "wko_mst_org_date";
$key[9] = "wko_mst_due_date";
$key[10] = "wko_det_cmpl_date";

$key[11] = "wko_det_clo_date";
$key[12] = "wko_det_assign_to";
$key[13] = "wko_det_planner";
$key[14] = "wko_mst_flt_code";
$key[15] = "wko_det_cause_code";
$key[16] = "wko_det_act_code";
$key[17] = "wko_det_corr_action";
$key[18] = "wko_mst_originator";
$key[19] = "wko_mst_phone";
$key[20] = "wko_mst_project_id";

$key[21] = "wko_mst_work_area";
$key[22] = "wko_mst_asset_location";
$key[23] = "wko_mst_asset_level";
$key[24] = "wko_mst_asset_group_code";
$key[25] = "wko_mst_orig_priority";
$key[26] = "wko_mst_plan_priority";
$key[27] = "wko_det_temp_asset";
$key[28] = "wko_det_wr_no";

$key[29] = "wko_det_perm_id";
$key[30] = "wko_det_wr_org_date";
$key[31] = "wko_det_wr_due_date";
$key[32] = "wko_det_work_type";

$key[33] = "wko_det_work_class";
$key[34] = "wko_det_work_grp";
$key[35] = "wko_det_sc_date";
$key[36] = "wko_det_sched_date";
$key[37] = "wko_det_exc_date";
$key[38] = "wko_det_contract_no";

$key[39] = "wko_det_delay_cd";
$key[40] = "wko_det_customer_cd";
$key[41] = "wko_det_supv_id";
$key[42] = "wko_det_est_con_cost";
$key[43] = "wko_det_con_cost";

$key[44] = "wko_det_est_mtl_cost";
$key[45] = "wko_det_mtl_cost";
$key[46] = "wko_det_est_lab_cost";
$key[47] = "wko_det_lab_cost";
$key[48] = "wko_det_varchar1";

$key[49] = "wko_det_varchar2";
$key[50] = "wko_det_varchar3";
$key[51] = "wko_det_varchar4";
$key[52] = "wko_det_varchar5";
$key[53] = "wko_det_varchar6";
$key[54] = "wko_det_varchar7";
$key[55] = "wko_det_varchar8";
$key[56] = "wko_det_varchar9";
$key[57] = "wko_det_varchar10";
$key[58] = "wko_det_numeric1";

$key[59] = "wko_det_numeric2";
$key[60] = "wko_det_numeric3";
$key[61] = "wko_det_numeric4";
$key[62] = "wko_det_numeric5";
$key[63] = "wko_det_datetime1";

$key[64] = "wko_det_datetime2";
$key[65] = "wko_det_datetime3";
$key[66] = "wko_det_datetime4";
$key[67] = "wko_det_datetime5";
$key[68] = "wko_mst_create_by";
$key[69] = "wko_mst_create_date";
$key[70] = "RowID";


$page 		= $_REQUEST['page'];
$pageSize 	= $_REQUEST['pageSize'];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	
	$sql= "select totalPages = Count(*)/ '".$pageSize."' from wko_mst (NOLOCK)";

	$stmt = sqlsrv_query( $conn, $sql);

	if( !$stmt ) {
		 $error_message = "Error selecting table (Total Pages SQL)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
	}

	do {
		 while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
		 $totalPages = $row['totalPages'];
		 }
	} while ( sqlsrv_next_result($stmt) );
		
	

	
    $sql ="	SELECT 	
					wko_mst.RowID,
					wko_det.mst_RowID,
					wko_mst_wo_no,
					wko_mst_assetno,
					wko_det_parent_wo,
					wko_mst_pm_grp,
					wko_mst_status,
					wko_mst_descs,
					wko_mst_chg_costcenter,
					wko_mst_org_date,
					wko_mst_due_date,
					wko_det_cmpl_date,

					wko_det_clo_date,
					wko_mst_originator,

					wko_det_assign_to,

					wko_det_planner,
					wko_mst_flt_code,
					wko_det_cause_code,
					wko_det_act_code,
					wko_det_corr_action,

					wko_mst_phone,
					wko_mst_project_id,
					wko_mst_work_area,
					wko_mst_asset_location,
					wko_mst_asset_level,
					wko_mst_asset_group_code,
					wko_mst_orig_priority,
					wko_mst_plan_priority,
					wko_det_temp_asset,
					wko_det_wr_no,

					wko_det_perm_id,
					wko_det_wr_org_date,
					wko_det_wr_due_date,
					wko_det_work_type,
					wko_det_work_class,
					wko_det_work_grp,
					wko_det_sc_date,
					wko_det_sched_date,
					wko_det_exc_date,
					wko_det_contract_no,
					wko_det_delay_cd,
					wko_det_customer_cd,
					wko_det_supv_id,

					wko_det_est_con_cost,
					wko_det_con_cost,
					wko_det_est_mtl_cost,
					wko_det_mtl_cost,
					wko_det_est_lab_cost,
					wko_det_lab_cost,
					wko_det_varchar1,
					wko_det_varchar2,
					wko_det_varchar3,
					wko_det_varchar4,
					wko_det_varchar5,

					wko_det_varchar6,
					wko_det_varchar7,
					wko_det_varchar8,
					wko_det_varchar9,
					wko_det_varchar10,
					wko_det_numeric1,
					wko_det_numeric2,
					wko_det_numeric3,
					wko_det_numeric4,
					wko_det_numeric5,

					wko_det_datetime1,
					wko_det_datetime2,
					wko_det_datetime3,
					wko_det_datetime4,
					wko_det_datetime5,

					wko_mst_create_by,
					wko_mst_create_date,
					wko_mst.site_cd
					
					

			FROM 	wko_mst (NOLOCK),     					
					wko_det (NOLOCK),  						
					wrk_sts (NOLOCK)   
			WHERE  ( wko_mst.site_cd = wko_det.site_cd ) 
			AND  ( wko_mst.rowid = wko_det.mst_rowid ) 
			AND  ( wko_mst.site_cd = wrk_sts.site_cd ) 
			AND  ( wko_mst.wko_mst_status = wrk_sts.wrk_sts_status ) 
			AND  ( wko_mst.site_cd = '".$site_cd."' ) 
			AND 	wko_mst_status IS NOT NULL ORDER BY wko_mst_wo_no OFFSET ".($page  -1)*$pageSize." ROWS FETCH NEXT ".$pageSize." ROWS ONLY";
				
				// Remember above wko_mst_status and  wko_mst_wo_no if other module must check and change

    $stmt = sqlsrv_query($conn, $sql);

    if (!$stmt) {
        $error_message = "Error selecting table (dft_mst)";
        returnError($error_message);
        die(print_r(sqlsrv_errors(), true));
    }

    $row_end = [];
    $header_end = [];
		$header_result=[];

    do {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt));

    $final_result["result"] = $row_end;

    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_header  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt = sqlsrv_query($conn, $sql);

        if (!$stmt) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_header"]] = $row["customize_header"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt));

        $final_headername["header"] = $header_result;
    }
}

returnData($final_headername, $final_result,$key,$totalPages);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

function returnData($final_headername, $final_result,$key,$totalPages)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"header_count"=>sizeof($key),
		"totalPages"=>$totalPages,
    ];

    $returnData["data"] = array_merge($final_headername, $final_result);

    echo json_encode($returnData);
}

function returnError($error_message)
{
    $json = [];

    $returnData = [
        "status" => "ERROR",
        "message" => $error_message,
        "data" => $json,
    ];

    echo json_encode($returnData);
    exit();
}

?>
