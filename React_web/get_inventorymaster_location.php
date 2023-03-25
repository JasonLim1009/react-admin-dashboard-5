<?php
// get these values from your DB.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once('config.php');
$error_message;
$valid = true;


$key[0] = "itm_loc_order_pt";
$key[1] = "itm_loc_lockout4count";
$key[2] = "itm_loc_prim_locn_flg";
$key[3] = "itm_loc_stk_loc";
$key[4] = "itm_loc_inc_ttloh";
$key[5] = "itm_loc_stock_cost_flag";
$key[6] = "itm_loc_oh_qty";
$key[7] = "itm_loc_order_pt";
$key[8] = "itm_loc_maximum";



$key[9] = "itm_loc_hard_resrv";
$key[10] = "itm_loc_short_qty";
//$key[11] = "itm_loc_create_date";
//$key[12] = "itm_loc_lastactdate";
//$key[13] = "itm_loc_lastcntdate";
//$key[14] = "itm_loc_next_cnt_date";

$site_cd = $_REQUEST['site_cd'];




$sql= "	SELECT * 
		FROM itm_loc (NOLOCK)
		WHERE itm_loc.site_cd = '".$site_cd."'ORDER BY itm_loc_order_pt";

	$stmt_itm_loc = sqlsrv_query( $conn, $sql);

	if( !$stmt_itm_loc ) {
		 $error_message = "Error selecting table (asset_type Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $row_end = [];
     $header_end = [];

	do {
		 while ($row = sqlsrv_fetch_array($stmt_itm_loc, SQLSRV_FETCH_ASSOC)) {	
		 
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
				$row_result["col11"] = $row["RowID"];
				
				
				array_push($row_end, $row_result);
				 $result = [];
		
		 }
	} while ( sqlsrv_next_result($stmt_itm_loc) );
	
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
	
	
returnData($final_headername, $final_result);

sqlsrv_free_stmt($stmt_itm_loc);
sqlsrv_close($conn);

function returnData($final_headername, $final_result)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
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