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

$sql = "select customize_label  from cf_label (NOLOCK) where language_cd ='DEFAULT'  and table_name='wko_ls8' ";

$stmt_wko_ls8 = sqlsrv_query($conn, $sql);

if (!$stmt_wko_ls8) {
	$error_message = "Error selecting table (dft_mst)";
	returnError($error_message);
	die(print_r(sqlsrv_errors(), true));
}

do {
	while ($row = sqlsrv_fetch_array($stmt_wko_ls8, SQLSRV_FETCH_ASSOC)) {
		$header_result[ $row["customize_label"]] = $row["customize_label"];
	   //$header_result[  $key[$x]] = $row["customize_header"];
	   // $header_result["accessor"] = "col" . ($x + 1);
	   

		//array_push($header_end, $header_result);
	}
} while (sqlsrv_next_result($stmt_wko_ls8));

$final_headername["header"] = $header_result;
	
returnData($final_headername);

sqlsrv_free_stmt($stmt_wko_ls8);
sqlsrv_close($conn);

function returnData($final_headername)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
    ];

    $returnData["data"] = array_merge($final_headername);

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