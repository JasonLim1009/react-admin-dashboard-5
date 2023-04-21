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


$key[0] = "prm_mst_pm_no";
$key[1] = "prm_mst_curr_wo";
$key[2] = "prm_mst_freq_code";
$key[3] = "prm_mst_desc";
$key[4] = "prm_mst_meter_id";
$key[5] = "prm_mst_lpm_usg";
$key[6] = "prm_mst_lpm_uom";
$key[7] = "prm_mst_next_create";



$sql= "			SELECT 	prm_mst.site_cd,   
				prm_mst.prm_mst_type,   
				prm_mst.prm_mst_pm_no,   
				prm_mst.prm_mst_assetno,   
				prm_mst.prm_mst_pm_grp,   
				prm_mst.prm_mst_freq_code,   
				prm_mst.prm_mst_pm_date,   
				prm_mst.prm_mst_lpm_date,   
				prm_mst.prm_mst_meter_id,   
				prm_mst.prm_mst_lpm_usg,   
				prm_mst.prm_mst_lpm_uom,   
				prm_mst.prm_mst_flt_code,   
				prm_mst.prm_mst_curr_wo,   
				prm_mst.prm_mst_shadow_grp,   
				prm_mst.prm_mst_override_date,   
				prm_mst.prm_mst_next_create,   
				prm_mst.prm_mst_next_due,   
				prm_mst.prm_mst_lpm_closed_date,   
				prm_mst.prm_mst_closed_loop,   
				prm_mst.prm_mst_cal_startdate,   
				prm_mst.prm_mst_dflt_status,   
				prm_mst.prm_mst_plan_priority,   
				prm_mst.prm_mst_assetlocn,   
				prm_mst.prm_mst_desc,   
				prm_mst.audit_user,   
				prm_mst.audit_date,   
				prm_mst.column1,   
				prm_mst.column2,   
				prm_mst.column3,   
				prm_mst.column4,   
				prm_mst.column5,   
				prm_mst.RowID  
	FROM 		prm_mst    
	WHERE 		( prm_mst.site_cd = '".$site_cd."' )
	AND			( prm_mst.prm_mst_assetno = '' )
	UNION ALL
		SELECT 	prm_mst.site_cd,   
				prm_mst.prm_mst_type,   
				prm_mst.prm_mst_pm_no,   
				prm_mst.prm_mst_assetno,   
				prm_mst.prm_mst_pm_grp,   
				prm_mst.prm_mst_freq_code,   
				prm_mst.prm_mst_pm_date,   
				prm_mst.prm_mst_lpm_date,   
				prm_mst.prm_mst_meter_id,   
				prm_mst.prm_mst_lpm_usg,   
				prm_mst.prm_mst_lpm_uom,   
				prm_mst.prm_mst_flt_code,   
				prm_mst.prm_mst_curr_wo,   
				prm_mst.prm_mst_shadow_grp,   
				prm_mst.prm_mst_override_date,   
				prm_mst.prm_mst_next_create,   
				prm_mst.prm_mst_next_due,   
				prm_mst.prm_mst_lpm_closed_date,   
				prm_mst.prm_mst_closed_loop,   
				prm_mst.prm_mst_cal_startdate,   
				prm_mst.prm_mst_dflt_status,   
				prm_mst.prm_mst_plan_priority,   
				prm_mst.prm_mst_assetlocn,   
				prm_mst.prm_mst_desc,   
				prm_mst.audit_user,   
				prm_mst.audit_date,   
				prm_mst.column1,   
				prm_mst.column2,   
				prm_mst.column3,   
				prm_mst.column4,   
				prm_mst.column5,   
				prm_mst.RowID  
	FROM 		prm_mst ,
				grp_ast
	WHERE 		( prm_mst.site_cd = grp_ast.site_cd )
	AND			( prm_mst.prm_mst_pm_grp = grp_ast.grp_ast_grp_cd )
	AND			( prm_mst.site_cd = '".$site_cd."' )
	AND			( grp_ast.grp_ast_asset_no = '".$RowID."' )";

	$stmt_prm_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_prm_mst ) {
		 $error_message = "Error selecting table (prm_mst)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_prm_mst, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_prm_mst));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_prm_mst = sqlsrv_query($conn, $sql);

        if (!$stmt_prm_mst) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_prm_mst, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_prm_mst));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_prm_mst);
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