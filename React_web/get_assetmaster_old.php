<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once ('config.php');
require_once ('functions.php');


$key[0] = "ast_mst_asset_no";
$key[1] = "ast_mst_asset_grpcode";
$key[2] = "ast_mst_asset_type";
$key[3] = "ast_mst_asset_code";
$key[4] = "ast_mst_asset_status";
$key[5] = "ast_mst_cri_factor";
$key[6] = "ast_mst_cost_center";
$key[7] = "ast_mst_wrk_grp";
$key[8] = "ast_mst_asset_shortdesc";
$key[9] = "ast_mst_asset_longdesc";
$key[10] = "ast_mst_work_area";
$key[11] = "ast_mst_asset_locn";
$key[12] = "ast_mst_ast_lvl";
$key[13] = "ast_mst_perm_id";
$key[14] = "ast_mst_parent_flag";
$key[15] = "ast_mst_parent_id";
$key[16] = "ast_mst_print_count";
$key[17] = "ast_mst_safety_rqmts";
$key[18] = "ast_det_asset_cost";
$key[19] = "ast_det_mtdlabcost";
$key[20] = "ast_det_mtdmtlcost";
$key[21] = "ast_det_mtdconcost";
$key[22] = "ast_det_ytdlabcost";
$key[23] = "ast_det_ytdmtlcost";
$key[24] = "ast_det_ytdconcost";
$key[25] = "ast_det_ltdlabcost";
$key[26] = "ast_det_ltdmtlcost";
$key[27] = "ast_det_ltdconcost";
$key[28] = "ast_det_repl_cost";
$key[29] = "ast_det_warranty_date";
$key[30] = "ast_det_depr_term";
$key[31] = "ast_det_l_account";
$key[32] = "ast_det_m_account";
$key[33] = "ast_det_c_account";
$key[34] = "ast_mst_fda_code";
$key[35] = "ast_det_varchar1";
$key[36] = "ast_det_varchar2";
$key[37] = "ast_det_varchar3";
$key[38] = "ast_det_varchar4";
$key[39] = "ast_det_varchar5";
$key[40] = "ast_det_varchar6";
$key[41] = "ast_det_varchar7";
$key[42] = "ast_det_varchar8";
$key[43] = "ast_det_varchar9";
$key[44] = "ast_det_varchar10";
$key[45] = "ast_det_numeric1";
$key[46] = "ast_det_numeric2";
$key[47] = "ast_det_numeric3";
$key[48] = "ast_det_numeric4";
$key[49] = "ast_det_numeric5";
$key[50] = "ast_det_datetime1";
$key[51] = "ast_det_datetime2";
$key[52] = "ast_det_datetime3";
$key[53] = "ast_det_datetime4";
$key[54] = "ast_det_datetime5";
$key[55] = "ast_det_note1";
$key[56] = "ast_det_note2";
$key[57] = "ast_mst_create_by";
$key[58] = "ast_mst_create_date";
$key[59] = "ast_mst_assigned_to";
$key[60]="RowID";


$site_cd 	= $_REQUEST['site_cd'];
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
		
	

	
    $sql ="	SELECT 	*
			FROM 	ast_mst(NOLOCK),
					ast_det(NOLOCK),
					ast_sts(NOLOCK)
			WHERE (ast_mst.site_cd = ast_det.site_cd)
			AND (ast_mst.rowid = ast_det.mst_rowid)
			AND (ast_mst.site_cd = ast_sts.site_cd)
			AND (ast_mst.ast_mst_asset_status = ast_sts.ast_sts_status)
			AND (ast_mst.site_cd = '".$site_cd."')
			AND ast_mst_asset_grpcode IS NOT NULL
			AND ast_mst_asset_type IS NOT NULL ORDER BY ast_mst_asset_no OFFSET ".($page  -1)*$pageSize." ROWS FETCH NEXT ".$pageSize." ROWS ONLY";

    $stmt = sqlsrv_query($conn, $sql);

    if (!$stmt) {
        $error_message = "Error selecting table (dft_mst)";
        returnError($error_message);
        die(print_r(sqlsrv_errors(), true));
    }

    $row_end = [];
    $header_end = [];

    do {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $row_result["col1"] = $row[$key[0]];
            $row_result["col2"] = $row[$key[1]];
            $row_result["col3"] = $row[$key[2]];
			$row_result["col4"] = $row[$key[3]];
			$row_result["col5"] = $row[$key[4]];
			$row_result["col6"] = $row[$key[5]];
			$row_result["col7"] = $row[$key[6]];
			$row_result["col8"] = $row[$key[7]];
			$row_result["col9"] = $row[$key[8]];
			$row_result["col10"] = $row[$key[9]];
			
			$row_result["col11"] = $row[$key[10]];
            $row_result["col12"] = $row[$key[11]];
            $row_result["col13"] = $row[$key[12]];
			$row_result["col14"] = $row[$key[13]];
			$row_result["col15"] = $row[$key[14]];
			$row_result["col16"] = $row[$key[15]];
			$row_result["col17"] = $row[$key[16]];
			$row_result["col18"] = $row[$key[17]];
			$row_result["col19"] = $row[$key[18]];
			$row_result["col20"] = $row[$key[19]];
			
			/* $date = new DateTime("now", new DateTimeZone('America/New_York') );
			echo $date->format('Y-m-d H:i:s'); */


			$row_result["col21"] = $row[$key[20]];
            $row_result["col22"] = $row[$key[21]];
            $row_result["col23"] = $row[$key[22]];
			$row_result["col24"] = $row[$key[23]];
			$row_result["col25"] = $row[$key[24]];
			$row_result["col26"] = $row[$key[25]];
			$row_result["col27"] = $row[$key[26]];
			$row_result["col28"] = $row[$key[27]];
			$row_result["col29"] = $row[$key[28]];
			$row_result["col30"] = validate_date($row[$key[29]]);
			
			$row_result["col31"] = $row[$key[30]];
            $row_result["col32"] = $row[$key[31]];
            $row_result["col33"] = $row[$key[32]];
			$row_result["col34"] = $row[$key[33]];
			$row_result["col35"] = $row[$key[34]];
			$row_result["col36"] = $row[$key[35]];
			$row_result["col37"] = $row[$key[36]];
			$row_result["col38"] = $row[$key[37]];
			$row_result["col39"] = $row[$key[38]];
			$row_result["col40"] = $row[$key[39]];
			
			$row_result["col41"] = $row[$key[40]];
            $row_result["col42"] = $row[$key[41]];
            $row_result["col43"] = $row[$key[42]];
			$row_result["col44"] = $row[$key[43]];
			$row_result["col45"] = $row[$key[44]];
			$row_result["col46"] = $row[$key[45]];
			$row_result["col47"] = $row[$key[46]];
			$row_result["col48"] = $row[$key[47]];
			$row_result["col49"] = $row[$key[48]];
			$row_result["col50"] = $row[$key[49]];
			
			$row_result["col51"] = validate_date($row[$key[50]]);
            $row_result["col52"] = validate_date($row[$key[51]]);
            $row_result["col53"] = validate_date($row[$key[52]]);
			$row_result["col54"] = validate_date($row[$key[53]]);
			$row_result["col55"] = validate_date($row[$key[54]]);
			$row_result["col56"] = $row[$key[55]];
			$row_result["col57"] = $row[$key[56]];
			$row_result["col58"] = $row[$key[57]];
			$row_result["col59"] = validate_date($row[$key[58]]);
			$row_result["col60"] = $row[$key[59]];
			$row_result["col61"] = $row[$key[60]];
			
			

            array_push($row_end, $row_result);

            $result = [];
        }
    } while (sqlsrv_next_result($stmt));

    $final_result["result"] = $row_end;

    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_header  from cf_label (NOLOCK) where column_name ='" .
            $key[$x] .
            "' and language_cd ='DEFAULT'";

        $stmt = sqlsrv_query($conn, $sql);

        if (!$stmt) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $header_result["Header"] = $row["customize_header"];
                $header_result["accessor"] = "col" . ($x + 1);

                array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt));

        $final_headername["header"] = $header_end;
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