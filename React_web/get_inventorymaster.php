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
$key[1] = "itm_mst_type";
$key[2] = "itm_mst_stockno";
$key[3] = "itm_mst_mstr_locn";
$key[4] = "itm_mst_costcenter";
$key[5] = "itm_mst_account";
$key[6] = "itm_mst_desc";
$key[7] = "itm_mst_issue_price";
$key[8] = "itm_mst_ttl_oh";
$key[9] = "itm_mst_order_rule";
$key[10] = "itm_mst_partno";

$key[11] = "itm_mst_com_code";
$key[12] = "itm_mst_itm_grp";
$key[13] = "itm_mst_serialize_counter";
$key[14] = "itm_det_issue_uom";
$key[15] = "itm_det_rcv_uom";
$key[16] = "itm_det_auto_spare";
$key[17] = "itm_det_critical_spare";
$key[18] = "itm_det_abc_class";
$key[19] = "itm_det_storage_type";
$key[20] = "itm_det_tax_cd";

$key[21] = "itm_det_part_deac_status";
$key[22] = "itm_det_order_pt";
$key[23] = "itm_det_maximum";
$key[24] = "itm_det_ytd_stockouts";
$key[25] = "itm_det_std_cost";
$key[26] = "itm_det_avg_cost";
$key[27] = "itm_det_last_cost";
$key[28] = "itm_det_ttl_hard_resrv";
$key[29] = "itm_det_ttl_short";
$key[30] = "itm_det_ttl_repair";

$key[31] = "itm_det_varchar1";
	
$key[32] = "itm_det_varchar2";
$key[33] = "itm_det_varchar3";
$key[34] = "itm_det_varchar4";
$key[35] = "itm_det_varchar5";
$key[36] = "itm_det_varchar6";
$key[37] = "itm_det_varchar7";
$key[38] = "itm_det_varchar8";

$key[39] = "itm_det_varchar9";
$key[40] = "itm_det_varchar10";
$key[41] = "itm_det_numeric1";
$key[42] = "itm_det_numeric2";
$key[43] = "itm_det_numeric3";
$key[44] = "itm_det_numeric4";
$key[45] = "itm_det_numeric5";
$key[46] = "itm_det_datetime1";
$key[47] = "itm_det_datetime2";
$key[48] = "itm_det_datetime3";

$key[49] = "itm_det_datetime4";
$key[50] = "itm_det_datetime5";
$key[51] = "itm_mst_create_by";
$key[52] = "itm_mst_create_date";

$key[53] = "RowID";



$page 		= $_REQUEST['page'];
$pageSize 	= $_REQUEST['pageSize'];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	
	$sql= "select totalPages = Count(*)/ '".$pageSize."' from itm_mst (NOLOCK)";

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
					itm_mst.RowID,
					itm_det.mst_RowID,
					itm_mst_type,
					itm_mst_stockno,
					itm_mst_mstr_locn,
					itm_mst_costcenter,
					itm_mst_itm_grp,
					itm_mst_itm_use,
					itm_mst_com_code,
					itm_mst_account,
					itm_mst_ttl_oh,
					itm_mst_desc,

					itm_mst_ext_desc,
					itm_mst_issue_price,
					itm_mst_order_rule,
					itm_mst_partno,
					itm_mst_serialize_counter,
					itm_det_issue_uom,
					itm_det_rcv_uom,
					itm_det_auto_spare,
					itm_det_critical_spare,
					itm_det_abc_class,

					itm_det_storage_type,
					itm_det_tax_cd,
					itm_det_part_deac_status,
					itm_det_order_pt,
					itm_det_maximum,
					itm_det_ytd_stockouts,
					itm_det_std_cost,
					itm_det_avg_cost,
					itm_det_last_cost,
					itm_det_ttl_hard_resrv,

					itm_det_ttl_short,
					itm_det_ttl_repair,
					itm_det_varchar1,
					itm_det_varchar2,
					itm_det_varchar3,
					itm_det_varchar4,
					itm_det_varchar5,
					itm_det_varchar6,

					itm_det_varchar7,
					itm_det_varchar8,
					itm_det_varchar9,
					itm_det_varchar10,
					itm_det_numeric1,
					itm_det_numeric2,
					itm_det_numeric3,
					itm_det_numeric4,
					itm_det_numeric5,
					itm_det_datetime1,

					itm_det_datetime2,
					itm_det_datetime3,
					itm_det_datetime4,
					itm_det_datetime5,

					itm_mst_create_by,
					itm_mst_create_date,
					itm_mst.site_cd



			FROM 	itm_mst,  			itm_det,  			itm_loc   
			WHERE	( itm_mst.site_cd = itm_det.site_cd ) 
			AND		( itm_mst.rowid = itm_det.mst_rowid ) 
			AND		( itm_mst.site_cd = itm_loc.site_cd ) 
			AND		( itm_mst.rowid = itm_loc.mst_rowid ) 
			AND		( itm_mst.site_cd = '".$site_cd."' ) 
			AND 	itm_mst_itm_grp IS NOT NULL ORDER BY itm_mst_type OFFSET ".($page  -1)*$pageSize." ROWS FETCH NEXT ".$pageSize." ROWS ONLY";
				
				// Remember above itm_mst_itm_grp and  itm_mst_type if other module must check and change

    $stmt = sqlsrv_query($conn, $sql);

    if (!$stmt) {
        $error_message = "Error selecting table (dft_mst1)";
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
            $error_message = "Error selecting table (dft_mst2)";
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
