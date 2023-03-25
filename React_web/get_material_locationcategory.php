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


$key[0] = "loc_cat_loc_cat";
$key[1] = "loc_cat_desc";
$key[2] = "loc_cat_inc_ttloh";
$key[3] = "loc_cat_mtl_usage";
$key[4] = "loc_cat_inc_ttl_val";
$key[5] = "loc_cat_inc_rcv";
$key[6] = "loc_cat_consigned";
$key[7] = "loc_cat_disable_flag";
$site_cd = $_REQUEST['site_cd'];




$sql= "	SELECT * 
		FROM loc_cat (NOLOCK)
		WHERE loc_cat.site_cd = '".$site_cd."'ORDER BY loc_cat_loc_cat";

	$stmt_loc_cat = sqlsrv_query( $conn, $sql);

	if( !$stmt_loc_cat ) {
		 $error_message = "Error selecting table (loc_cat Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $row_end = [];
     $header_end = [];

	do {
		 while ($row = sqlsrv_fetch_array($stmt_loc_cat, SQLSRV_FETCH_ASSOC)) {	
		 
			    $row_result["col1"] = $row[$key[0]];
			    $row_result["col2"] = $row[$key[1]];
				$row_result["col3"] = $row[$key[2]];
				$row_result["col4"] = $row[$key[3]];
				$row_result["col5"] = $row[$key[4]];
				$row_result["col6"] = $row[$key[5]];
				$row_result["col7"] = $row[$key[6]];
				$row_result["col8"] = $row[$key[7]];
				$row_result["col9"] = $row["RowID"];
				
				
				array_push($row_end, $row_result);
				 $result = [];
		
		 }
	} while ( sqlsrv_next_result($stmt_loc_cat) );
	
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

sqlsrv_free_stmt($stmt_loc_cat);
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