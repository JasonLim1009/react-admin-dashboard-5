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



$key[0] = "site_cd";
$key[1] = "wkr_mst_wr_no"; 
$key[2] = "wkr_mst_wr_descs";
$key[3] = "wkr_mst_wr_status";
$key[4] = "wkr_mst_assetno"; 
$key[5] = "wkr_mst_chg_costcenter";
$key[6] = "wkr_mst_work_area";
$key[7] = "wkr_mst_assetlocn";
$key[8] = "wkr_mst_location";
$key[9] = "wkr_mst_temp_asset";
$key[10] = "wkr_mst_email_notification";

$key[11] = "wkr_mst_work_type";
$key[12] = "wkr_mst_work_class";
$key[13] = "wkr_mst_work_group";
$key[14] = "wkr_mst_wo_status";
$key[15] = "wkr_mst_projectid";
$key[16] = "wkr_mst_originator";
$key[17] = "wkr_mst_phone";

$key[18] = "wkr_det_wo";
$key[19] = "wkr_det_approver";
$key[20] = "wkr_det_appr_date";

$key[21] = "wkr_det_reject_desc";
$key[22] = "wkr_det_reject_by";
$key[23] = "wkr_det_reject_date";
$key[24] = "wkr_mst_orig_priority";
$key[25] = "wkr_mst_due_date";

$key[26] = "wkr_mst_fault_code";
$key[27] = "wkr_mst_create_by";
$key[28] = "wkr_mst_create_date";
$key[29] = "RowID";

$page 		= $_REQUEST['page'];
$pageSize 	= $_REQUEST['pageSize'];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	
	$sql= "select totalPages = Count(*)/ '".$pageSize."' from wkr_mst (NOLOCK)";

	$stmt = sqlsrv_query( $conn, $sql);

	if( !$stmt ) {
		 $error_message = "Error selecting table (Total Pages SQL)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
	}

	do {
		 while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
		 $totalPages = $row['totalPages'];
		 }
	} while ( sqlsrv_next_result($stmt) );
		
	

	
    $sql ="	SELECT 
					wkr_mst.RowID,
					wkr_det.mst_RowID,
					wkr_mst_wr_no,
					wkr_mst_wr_descs,
					wkr_mst_wr_status,
					wkr_mst_assetno,
					wkr_mst_chg_costcenter,
					wkr_mst_work_area,
					wkr_mst_assetlocn,
					wkr_mst_location,
					wkr_mst_temp_asset,
					wkr_mst_email_notification,
					wkr_mst_work_type,
					wkr_mst_work_class,
					wkr_mst_work_group,
					wkr_mst_wo_status,
					wkr_mst_projectid,
					wkr_mst_originator,
					wkr_mst_phone,
					wkr_det_wo,
					wkr_det_approver,
					wkr_det_appr_date,
					wkr_det_reject_desc,
					wkr_det_reject_by,
					wkr_det_reject_date,
					wkr_mst_orig_priority,

					wkr_mst_due_date,
					wkr_mst_fault_code,
					wkr_mst_create_by,
					wkr_mst_create_date,
					wkr_mst.site_cd
					
					
					
			FROM	wkr_mst,  				
					wkr_det     
			WHERE	( wkr_mst.site_cd = wkr_det.site_cd ) 
			AND  ( 	wkr_mst.rowid = wkr_det.mst_rowid ) 
			AND  ( 	wkr_mst.site_cd = '".$site_cd."' ) 
			AND 	wkr_mst_wr_status IS NOT NULL ORDER BY wkr_mst_wr_no OFFSET ".($page  -1)*$pageSize." ROWS FETCH NEXT ".$pageSize." ROWS ONLY";


				// Remember above wkr_mst_wr_status and  wkr_mst_wr_no if other module must check and change

    $stmt = sqlsrv_query($conn, $sql);

    if (!$stmt) {
        $error_message = "Error selecting table (dft_mst)";
        returnError($error_message);
        die(print_r(sqlsrv_errors(), true));
    }

    $row_end = [];
    $header_end = [];
		$header_result=[];

    do {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt));

    $final_result["result"] = $row_end;

    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_header  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt = sqlsrv_query($conn, $sql);

        if (!$stmt) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_header"]] = $row["customize_header"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt));

        $final_headername["header"] = $header_result;
    }
}

returnData($final_headername, $final_result,$key,$totalPages);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

function returnData($final_headername, $final_result,$key,$totalPages)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"header_count"=>sizeof($key),
		"totalPages"=>$totalPages,
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
