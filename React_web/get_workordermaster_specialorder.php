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
//$key[1] = "wko_ls3_assetno";
$key[1] = "wko_ls3_rec_supplier";

$key[2] = "wko_ls3_descr";
//$key[4] = "wko_ls3_tax_cd";
$key[3] = "wko_ls3_mtl_uom";
$key[4] = "wko_ls3_qty_needed";
$key[5] = "wko_ls3_item_cost";
//$key[8] = "wko_ls3_chg_costcenter";
//$key[9] = "wko_ls3_chg_account";
$key[6] = "wko_ls3_pr_no";
$key[7] = "wko_ls3_pr_lineno";
$key[8] = "pur_mst_purq_approve";
$key[9] = "pur_ls1_po_no";
//$key[14] = "pur_ls1_po_lineno";
//$key[15] = "wko_ls3_po_no";
//$key[16] = "wko_ls3_po_lineno";
$key[10] = "RowID";





$sql= "		SELECT 	
				wko_ls3.site_cd,   
				
				wko_ls3_rec_supplier,
				
				wko_ls3_descr,
				
				wko_ls3_mtl_uom,
				wko_ls3_qty_needed,
				wko_ls3_item_cost,
				
				wko_ls3_pr_no,
				wko_ls3_pr_lineno,
				pur_mst.pur_mst_purq_approve,
				pur_ls1.pur_ls1_po_no,
				
				wko_ls3_assetno,
				wko_ls3_tax_cd,
				wko_ls3_chg_costcenter,
				wko_ls3_chg_account,
				pur_ls1_po_lineno,
				wko_ls3_po_no,
				wko_ls3_po_lineno
		 
	FROM 		wko_ls3

	LEFT 
	OUTER 
	JOIN		pur_mst
	ON			pur_mst.site_cd = wko_ls3.site_cd
	AND			pur_mst.pur_mst_porqnnum =  wko_ls3.wko_ls3_pr_no

	LEFT 
	OUTER 
	JOIN		pur_ls1
	ON			pur_mst.site_cd = pur_ls1.site_cd
	AND			pur_mst.RowID =  pur_ls1.mst_RowID
	AND			pur_ls1.pur_ls1_pr_lineno =  wko_ls3.wko_ls3_pr_lineno	
				
				
		WHERE 	wko_ls3.site_cd = '".$site_cd."'
		AND 	wko_ls3.mst_RowID = '".$RowID."'";

	$stmt_wko_ls3 = sqlsrv_query( $conn, $sql);

	if( !$stmt_wko_ls3 ) {
		 $error_message = "Error selecting table (wko_ls3)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_wko_ls3, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_wko_ls3));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_wko_ls3 = sqlsrv_query($conn, $sql);

        if (!$stmt_wko_ls3) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_wko_ls3, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_wko_ls3));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_wko_ls3);
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