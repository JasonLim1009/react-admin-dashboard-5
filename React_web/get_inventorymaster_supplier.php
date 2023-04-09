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


$key[0] = "itm_sup_mfgrank";
$key[1] = "itm_sup_supplier";
$key[2] = "itm_sup_tax_cd";
$key[3] = "itm_sup_supplier_partno";
$key[4] = "itm_sup_partmfg";
$key[5] = "itm_sup_file_name";
$key[6] = "itm_sup_last_itemcost";
$key[7] = "itm_sup_retail_price";
$key[8] = "itm_sup_last_rcvd_date";
$key[9] = "itm_sup_order_uom";
$key[10] = "itm_sup_min_orderqty";
$key[11] = "itm_sup_rcpts_ctr";
$key[12] = "itm_sup_discount_pct";
$key[13] = "itm_sup_ord_qty";
$key[14] = "itm_sup_rcv_qty";
$key[15] = "itm_sup_late_qty";
$key[16] = "itm_sup_high_qty";
$key[17] = "itm_sup_di";
$key[18] = "itm_sup_ci";




$sql= "	SELECT 
				itm_sup_mfgrank, 
				itm_sup_supplier,
				itm_sup_tax_cd,
				itm_sup_supplier_partno,
				itm_sup_partmfg,
				itm_sup_file_name,
				itm_sup_last_itemcost,
				itm_sup_retail_price,
				itm_sup_last_rcvd_date,
				itm_sup_order_uom,
				itm_sup_min_orderqty,
				itm_sup_rcpts_ctr,
				itm_sup_discount_pct,
				itm_sup_ord_qty,
				itm_sup_rcv_qty,
				itm_sup_late_qty,
				itm_sup_high_qty,
				itm_sup_di,
				itm_sup_ci
				
			
				
				
		FROM 	itm_sup (NOLOCK)
		
		
		WHERE 	itm_sup.site_cd = '".$site_cd."'
		AND 	itm_sup.mst_RowID = '".$RowID."'";

	$stmt_itm_sup = sqlsrv_query( $conn, $sql);

	if( !$stmt_itm_sup ) {
		 $error_message = "Error selecting table (itm_sup)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_itm_sup, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_itm_sup));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_itm_sup = sqlsrv_query($conn, $sql);

        if (!$stmt_itm_sup) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_itm_sup, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_itm_sup));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_itm_sup);
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