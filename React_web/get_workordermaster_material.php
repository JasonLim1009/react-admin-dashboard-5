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



$key[0] = "site_cd";
/* $key[1] = "wko_ls2_assetno"; */
$key[1] = "wko_ls2_stockno";
$key[2] = "wko_ls2_stk_locn";
$key[3] = "wko_ls2_desc";
/* $key[5] = "wko_ls2_chg_costcenter";
$key[6] = "wko_ls2_chg_account"; */
$key[4] = "wko_ls2_qty_needed";
$key[5] = "wko_ls2_mtl_uom";
$key[6] = "wko_ls2_item_cost";

$key[7] = "wko_ls2_mr_no";
/* $key[11] = "wko_ls2_mr_lineno"; */
$key[8] = "mtr_mst_status";


/* $key[13] = "mtr_ls1_rcv_qty";
$key[14] = "wko_ls2_po_no";
$key[15] = "wko_ls2_po_lineno"; */
$key[9] = "RowID";



$sql= "	SELECT 
				wko_ls2.site_cd,   
				wko_ls2.mst_RowID,
				
				wko_ls2_stockno,
				wko_ls2_stk_locn,
				wko_ls2_desc,
				
				
				wko_ls2_qty_needed,
				wko_ls2_mtl_uom,
				wko_ls2_item_cost,
				
				wko_ls2_mr_no,
				
				mtr_mst_status,
				wko_ls2_assetno,
				wko_ls2_chg_costcenter,
				wko_ls2_chg_account,
				wko_ls2_mr_lineno,
				mtr_ls1_rcv_qty,
				wko_ls2_po_no,
				wko_ls2_po_lineno
				
				
		FROM 	wko_ls2 (NOLOCK)
		
		LEFT OUTER JOIN mtr_mst
				ON				mtr_mst.site_cd = wko_ls2.site_cd
				AND			mtr_mst.mtr_mst_mtr_no =  wko_ls2.wko_ls2_mr_no

				LEFT OUTER JOIN mtr_ls1
				ON				mtr_mst.site_cd = mtr_ls1.site_cd
				AND			mtr_mst.RowID =  mtr_ls1.mst_RowID
				AND			mtr_ls1.mtr_ls1_mtr_lineno =  wko_ls2.wko_ls2_mr_lineno			
				
				
		WHERE 	wko_ls2.site_cd = '".$site_cd."'
		AND 	wko_ls2.mst_RowID = '".$RowID."'";

	$stmt_wko_ls2 = sqlsrv_query( $conn, $sql);

	if( !$stmt_wko_ls2 ) {
		 $error_message = "Error selecting table (wko_ls2)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_wko_ls2, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_wko_ls2));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_wko_ls2 = sqlsrv_query($conn, $sql);

        if (!$stmt_wko_ls2) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_wko_ls2, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_wko_ls2));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_wko_ls2);
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