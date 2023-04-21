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


$key[0] = "ast_ls2_meter_id";
$key[1] = "ast_ls2_usage_uom";
$key[2] = "ast_ls2_incr_usage_flag";
$key[3] = "ast_ls2_meter_point";
$key[4] = "ast_ls2_meter_desc";
$key[5] = "ast_ls2_meter_install_date";
$key[6] = "ast_ls2_usage_date";
$key[7] = "ast_ls2_usage_reading";
$key[8] = "ast_ls2_avg_usage";
$key[9] = "ast_ls2_old_ltd_usage";
$key[10] = "ast_ls2_ltd_usage";
$key[11] = "ast_ls2_max_avg_usage";
$key[12] = "ast_ls2_meter_maximum";
$key[13] = "ast_ls2_warranty_usage";
$key[14] = "ast_ls2_alert_ma_flag";
$key[15] = "ast_ls2_alert_ro_flag";
$key[16] = "ast_ls2_meter_install_wo";



$sql= "	SELECT 
				ast_ls2_meter_id,
				ast_ls2_usage_uom,
				ast_ls2_incr_usage_flag,
				ast_ls2_meter_point,
				ast_ls2_meter_desc,
				ast_ls2_meter_install_date,
				ast_ls2_usage_date,
				ast_ls2_usage_reading,
				ast_ls2_avg_usage,
				ast_ls2_old_ltd_usage,
				ast_ls2_ltd_usage,
				ast_ls2_max_avg_usage,
				ast_ls2_meter_maximum,
				ast_ls2_warranty_usage,
				ast_ls2_alert_ma_flag,
				ast_ls2_alert_ro_flag,
				ast_ls2_meter_install_wo
		
				
		FROM 	ast_ls2 (NOLOCK)
		
		
		WHERE 	ast_ls2.site_cd = '".$site_cd."'
		AND 	ast_ls2.mst_RowID = '".$RowID."'";

	$stmt_ast_ls2 = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_ls2 ) {
		 $error_message = "Error selecting table (ast_ls2)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_ast_ls2, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_ast_ls2));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_ast_ls2 = sqlsrv_query($conn, $sql);

        if (!$stmt_ast_ls2) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_ast_ls2, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_ast_ls2));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_ast_ls2);
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