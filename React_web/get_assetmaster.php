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
$key[1] = "ast_mst_asset_no";
$key[2] = "ast_mst_asset_grpcode";
$key[3] = "ast_mst_asset_type";
$key[4] = "ast_mst_asset_code";
$key[5] = "ast_mst_asset_status";
$key[6] = "ast_mst_cri_factor";
$key[7] = "ast_mst_cost_center";
$key[8] = "ast_mst_wrk_grp";
$key[9] = "ast_mst_asset_shortdesc";
$key[10] = "ast_mst_asset_longdesc";

$key[11] = "ast_mst_work_area";
$key[12] = "ast_mst_asset_locn";
$key[13] = "ast_mst_ast_lvl";
$key[14] = "ast_mst_perm_id";
$key[15] = "ast_mst_parent_flag";
$key[16] = "ast_mst_parent_id";
$key[17] = "ast_mst_print_count";
$key[18] = "ast_mst_safety_rqmts";
$key[19] = "ast_det_asset_cost";
$key[20] = "ast_det_mtdlabcost";

$key[21] = "ast_det_mtdmtlcost";
$key[22] = "ast_det_mtdconcost";
$key[23] = "ast_det_ytdlabcost";
$key[24] = "ast_det_ytdmtlcost";
$key[25] = "ast_det_ytdconcost";
$key[26] = "ast_det_ltdlabcost";
$key[27] = "ast_det_ltdmtlcost";
$key[28] = "ast_det_ltdconcost";
$key[29] = "ast_det_repl_cost";
$key[30] = "ast_det_warranty_date";

$key[31] = "ast_det_depr_term";
$key[32] = "ast_det_l_account";
$key[33] = "ast_det_m_account";
$key[34] = "ast_det_c_account";
$key[35] = "ast_mst_fda_code";
$key[36] = "ast_det_varchar1";
$key[37] = "ast_det_varchar2";
$key[38] = "ast_det_varchar3";
$key[39] = "ast_det_varchar4";
$key[40] = "ast_det_varchar5";

$key[41] = "ast_det_varchar6";
$key[42] = "ast_det_varchar7";
$key[43] = "ast_det_varchar8";
$key[44] = "ast_det_varchar9";
$key[45] = "ast_det_varchar10";
$key[46] = "ast_det_numeric1";
$key[47] = "ast_det_numeric2";
$key[48] = "ast_det_numeric3";
$key[49] = "ast_det_numeric4";
$key[50] = "ast_det_numeric5";

$key[51] = "ast_det_datetime1";
$key[52] = "ast_det_datetime2";
$key[53] = "ast_det_datetime3";
$key[54] = "ast_det_datetime4";
$key[55] = "ast_det_datetime5";
$key[56] = "ast_det_note1";
$key[57] = "ast_det_note2";
$key[58] = "ast_mst_create_by";
$key[59] = "ast_mst_create_date";
$key[60] = "ast_mst_assigned_to";
$key[61] = "RowID";


$page 		= $_REQUEST['page'];
$pageSize 	= $_REQUEST['pageSize'];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	
	$sql= "select totalPages = Count(*)/ '".$pageSize."' from ast_mst (NOLOCK)";

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
		
	
	
    $sql ="SELECT 	
	
				ast_mst.site_cd,
				ast_mst_asset_no,
				ast_mst_asset_grpcode,
				ast_mst_asset_type,
				ast_mst_asset_code,
				ast_mst_asset_status,
				ast_mst_cri_factor,
				ast_mst_cost_center,
				ast_mst_wrk_grp,
				ast_mst_asset_shortdesc,
				ast_mst_asset_longdesc,
				ast_mst_work_area,
				ast_mst_asset_locn,
				ast_mst_ast_lvl,
				ast_mst_perm_id,
				ast_mst_parent_flag,
				ast_mst_parent_id,
				ast_mst_print_count,
				ast_mst_safety_rqmts,
				ast_det_asset_cost,
				ast_det_mtdlabcost,
				ast_det_mtdmtlcost,
				ast_det_mtdconcost,
				ast_det_ytdlabcost,
				ast_det_ytdmtlcost,
				ast_det_ytdconcost,
				ast_det_ltdlabcost,
				ast_det_ltdmtlcost,
				ast_det_ltdconcost,
				ast_det_repl_cost,
				ast_det_warranty_date,
				ast_det_depr_term,
				ast_det_l_account,
				ast_det_m_account,
				ast_det_c_account,
				ast_mst_fda_code,
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
				ast_det_numeric1,
				ast_det_numeric2,
				ast_det_numeric3,
				ast_det_numeric4,
				ast_det_numeric5,
				ast_det_datetime1,
				ast_det_datetime2,
				ast_det_datetime3,
				ast_det_datetime4,
				ast_det_datetime5,
				ast_det_note1,
				ast_det_note2,
				ast_mst_create_by,
				ast_mst_create_date,
				ast_mst_assigned_to,
				ast_mst.RowID


			FROM 	ast_mst(NOLOCK),
					ast_det(NOLOCK),
					ast_sts(NOLOCK)
			WHERE 	(ast_mst.site_cd = ast_det.site_cd)
			AND 	(ast_mst.rowid = ast_det.mst_rowid)
			AND 	(ast_mst.site_cd = ast_sts.site_cd)
			AND 	(ast_mst.ast_mst_asset_status = ast_sts.ast_sts_status)
			AND 	(ast_mst.site_cd = '".$site_cd."')
			AND 	ast_mst_asset_grpcode IS NOT NULL
			AND		ast_mst_asset_type IS NOT NULL ORDER BY ast_mst_asset_no OFFSET ".($page  -1)*$pageSize." ROWS FETCH NEXT ".$pageSize." ROWS ONLY";

    $stmt = sqlsrv_query($conn, $sql);

    if (!$stmt) {
        $error_message = "Error selecting table (ast_mst)";
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