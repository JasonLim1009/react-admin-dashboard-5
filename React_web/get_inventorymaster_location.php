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
$RowID = $_REQUEST['RowID'];


//$key[0] = "itm_loc_order_pt";
$key[0] = "itm_loc_lockout4count";
$key[1] = "itm_loc_prim_locn_flg";
$key[2] = "itm_loc_stk_loc";
$key[3] = "itm_loc_inc_ttloh";
$key[4] = "itm_loc_stock_cost_flag";
$key[5] = "itm_loc_oh_qty";
$key[6] = "itm_loc_order_pt";
$key[7] = "itm_loc_maximum";

$key[8] = "itm_loc_pr_due_in";
$key[9] = "itm_loc_due_in";
$key[10] = "itm_loc_hard_resrv";
$key[11] = "itm_loc_short_qty";
$key[12] = "itm_loc_create_date";
$key[13] = "itm_loc_lastactdate";
$key[14] = "itm_loc_lastcntdate";
$key[15] = "itm_loc_next_cnt_date";






$sql= "	SELECT 
				
				itm_loc_lockout4count,
				itm_loc_prim_locn_flg,
				itm_loc_stk_loc,
				itm_loc_inc_ttloh,
				itm_loc_stock_cost_flag,
				itm_loc_oh_qty,
				itm_loc_order_pt,
				itm_loc_maximum,
				
				itm_loc_pr_due_in,
				itm_loc_due_in,
				itm_loc_hard_resrv,
				itm_loc_short_qty,
				itm_loc_create_date,
				itm_loc_lastactdate,
				itm_loc_lastcntdate,
				itm_loc_next_cnt_date

				
		FROM 	itm_loc (NOLOCK)
		
		
		WHERE 	itm_loc.site_cd = '".$site_cd."'
		AND 	itm_loc.mst_RowID = '".$RowID."'";

	$stmt_itm_loc = sqlsrv_query( $conn, $sql);

	if( !$stmt_itm_loc ) {
		 $error_message = "Error selecting table (itm_loc)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_itm_loc, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_itm_loc));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_itm_loc = sqlsrv_query($conn, $sql);

        if (!$stmt_itm_loc) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_itm_loc, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_itm_loc));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_itm_loc);
sqlsrv_close($conn);

function returnData($final_headername, $final_result,$key)
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