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


$key[0] = "prm_fcd_freq_code";
$key[1] = "prm_fcd_freq_type";
$key[2] = "prm_fcd_desc";
$key[3] = "prm_fcd_cal_days";
$key[4] = "prm_fcd_band";
$key[5] = "prm_fcd_lead_pct";
$key[6] = "prm_fcd_usg";
$key[7] = "prm_fcd_usg_uom";
$key[8] = "prm_fcd_dayofweek";
$key[9] = "prm_fcd_dayofmonth";
$key[10] = "prm_fcd_weekofmonth";
$key[11] = "prm_fcd_disable_flag";
$site_cd = $_REQUEST['site_cd'];




$sql= "	SELECT * 
		FROM  prm_fcd (NOLOCK)
		WHERE prm_fcd.site_cd = '".$site_cd."'ORDER BY prm_fcd_freq_code";

	$stmt_prm_fcd = sqlsrv_query( $conn, $sql);

	if( !$stmt_prm_fcd ) {
		 $error_message = "Error selecting table (prm_fcd Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $row_end = [];
     $header_end = [];

	do {
		 while ($row = sqlsrv_fetch_array($stmt_prm_fcd, SQLSRV_FETCH_ASSOC)) {	
		 
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
				$row_result["col13"] = $row["RowID"];
				
				
				array_push($row_end, $row_result);
				 $result = [];
		
		 }
	} while ( sqlsrv_next_result($stmt_prm_fcd) );
	
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

sqlsrv_free_stmt($stmt_prm_fcd);
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