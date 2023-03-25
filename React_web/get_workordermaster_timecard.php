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


$key[0] = "wko_ls8_assetno";
$key[1] = "wko_ls8_empl_id";

$key[2] = "wko_ls8_craft";
//$key[3] = "wko_ls8_datetime1";
$key[3] = "wko_ls8_hours_type";
$key[4] = "wko_ls8_hrs";
$key[5] = "wko_ls8_rate";
$key[6] = "wko_ls8_multiplier";
$key[7] = "wko_ls8_adder";
$key[8] = "wko_ls8_act_cost";
$key[9] = "wko_ls8_chg_costcenter";
$key[10] = "wko_ls8_chg_account";
$key[11] = "wko_ls8_crd_costcenter";
$key[12] = "wko_ls8_crd_account";
$key[13] = "wko_ls8_time_card_no";



$site_cd = $_REQUEST['site_cd'];




$sql= "	SELECT * 
		FROM wko_ls8 (NOLOCK)
		WHERE wko_ls8.site_cd = '".$site_cd."'ORDER BY wko_ls8_assetno";

	$stmt_wko_ls8 = sqlsrv_query( $conn, $sql);

	if( !$stmt_wko_ls8 ) {
		 $error_message = "Error selecting table (asset_type Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $row_end = [];
     $header_end = [];

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wko_ls8, SQLSRV_FETCH_ASSOC)) {	
		 
			    $row_result["col1"] = $row[$key[0]];
			    $row_result["col2"] = $row[$key[1]];
				$row_result["col3"] = $row[$key[2]];
				$row_result["col4"] = $row[$key[3]];
				$row_result["col5"] = $row[$key[4]];
				$row_result["col6"] = $row[$key[5]];
				$row_result["col7"] = $row[$key[6]];
				$row_result["col8"] = $row[$key[7]];
				$row_result["col9"] = $row[$key[8]];
				$row_result["col0"] = $row[$key[9]];
				$row_result["col11"] = $row[$key[10]];
				$row_result["col12"] = $row[$key[11]];
				$row_result["col13"] = $row[$key[12]];
				
				$row_result["col14"] = $row["RowID"];
				
				
				array_push($row_end, $row_result);
				 $result = [];
		
		 }
	} while ( sqlsrv_next_result($stmt_wko_ls8) );
	
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

sqlsrv_free_stmt($stmt_wko_ls8);
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