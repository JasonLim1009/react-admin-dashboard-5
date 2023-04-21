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


$key[0] = "ast_ls1_stock_no";
$key[1] = "ast_ls1_varchar1";
$key[2] = "ast_ls1_desc";
$key[3] = "ast_ls1_qty_needed";
$key[4] = "itm_mst_ttl_oh";



$sql= "	SELECT 
				ast_ls1.ast_ls1_stock_no,
				ast_ls1.ast_ls1_varchar1,
				ast_ls1.ast_ls1_desc,
				ast_ls1.ast_ls1_qty_needed,
				itm_mst.itm_mst_ttl_oh
		
				
		FROM 	ast_ls1 (NOLOCK)
		
		LEFT 
		OUTER 
		JOIN 		itm_mst
		ON 			ast_ls1.site_cd = itm_mst.site_cd 
		AND 		ast_ls1.RowID = itm_mst.RowID
		
		
		WHERE 	ast_ls1.site_cd = '".$site_cd."'
		AND 	ast_ls1.mst_RowID = '".$RowID."'";

	$stmt_ast_ls1 = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_ls1 ) {
		 $error_message = "Error selecting table (ast_ls1)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_ast_ls1, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_ast_ls1));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_ast_ls1 = sqlsrv_query($conn, $sql);

        if (!$stmt_ast_ls1) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_ast_ls1, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_ast_ls1));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_ast_ls1);
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