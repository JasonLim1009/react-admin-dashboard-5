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



$key[0] = "wko_ls5_assetno";
$key[1] = "wko_ls5_desc";
$key[2] = "wko_ls5_date";
$key[3] = "wko_ls5_uom";
$key[4] = "wko_ls5_qty";
$key[5] = "wko_ls5_item_cost";
$key[6] = "wko_ls5_est_amt";
$key[7] = "wko_ls5_costcenter";
$key[8] = "wko_ls5_account";






$sql= "	SELECT 
				wko_ls5.site_cd,   
				wko_ls5.mst_RowID,
				wko_ls5_assetno,
				wko_ls5_desc,
				wko_ls5_date,
				wko_ls5_uom,
				wko_ls5_qty,
				wko_ls5_item_cost,
				wko_ls5_est_amt,
				wko_ls5_costcenter,
				wko_ls5_account
				
		FROM	wko_ls5  
		
		
		WHERE 		wko_ls5.site_cd = '".$site_cd."'
		AND 		wko_ls5.mst_RowID = '".$RowID."'";
		
	$stmt_wko_ls5 = sqlsrv_query( $conn, $sql);


	if( !$stmt_wko_ls5 ) {
		 $error_message = "Error selecting table (wko_ls5)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_wko_ls5, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_wko_ls5));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_wko_ls5 = sqlsrv_query($conn, $sql);

        if (!$stmt_wko_ls5) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_wko_ls5, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_wko_ls5));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_wko_ls5);
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