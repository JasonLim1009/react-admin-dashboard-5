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


$key[0] = "wkr_ls2_varchar1";
$key[1] = "wkr_ls2_varchar2";
$key[2] = "wkr_ls2_varchar3";
$key[3] = "wkr_ls2_datetime1";
$key[4] = "wkr_ls2_datetime2";
$key[5] = "wkr_ls2_datetime3";
$key[6] = "wkr_ls2_numeric1";
$key[7] = "wkr_ls2_numeric2";



$sql= "	SELECT 
				wkr_ls2_varchar1,
				wkr_ls2_varchar2,
				wkr_ls2_varchar3,
				wkr_ls2_datetime1,
				wkr_ls2_datetime2,
				wkr_ls2_datetime3,
				wkr_ls2_numeric1,
				wkr_ls2_numeric2
				
		FROM wkr_ls2
		
		
		WHERE 	wkr_ls2.site_cd = '".$site_cd."'
		AND 	wkr_ls2.mst_RowID = '".$RowID."'";

	$stmt_wkr_ls2 = sqlsrv_query( $conn, $sql);

	if( !$stmt_wkr_ls2 ) {
		 $error_message = "Error selecting table (wkr_ls2)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_wkr_ls2, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_wkr_ls2));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_wkr_ls2 = sqlsrv_query($conn, $sql);

        if (!$stmt_wkr_ls2) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_wkr_ls2, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_wkr_ls2));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_wkr_ls2);
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