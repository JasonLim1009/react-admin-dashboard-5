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


$site_cd = $_REQUEST['site_cd'];
$RowID = $_REQUEST['RowID'];




$sql= "	SELECT 	 prm_fcd.site_cd,   
				 prm_fcd.prm_fcd_freq_code,   
				 prm_fcd.prm_fcd_freq_type, 
				 prm_fcd.prm_fcd_desc, 
				 prm_fcd.prm_fcd_cal_days,
				 prm_fcd.prm_fcd_band,   
				 prm_fcd.prm_fcd_lead_pct,   
				 prm_fcd.prm_fcd_usg, 
				 prm_fcd.prm_fcd_usg_uom, 
				 prm_fcd.prm_fcd_dayofweek,
				 prm_fcd.prm_fcd_dayofmonth,
				 prm_fcd.prm_fcd_weekofmonth,
				 prm_fcd.prm_fcd_disable_flag,
				 prm_fcd.audit_user,   
				 prm_fcd.audit_date,   				 
				 prm_fcd.column1,   
				 prm_fcd.column2,   
				 prm_fcd.column3,   
				 prm_fcd.column4,   
				 prm_fcd.column5,   
				 prm_fcd.RowID 
				 
		FROM 	prm_fcd (NOLOCK)
		WHERE 	prm_fcd.site_cd = '".$site_cd."'
		and 	prm_fcd.RowID='".$RowID."'ORDER BY prm_fcd_freq_code";

	$stmt_prm_fcd = sqlsrv_query( $conn, $sql);

	if( !$stmt_prm_fcd) {
		 $error_message = "Error selecting table (prm_fcd Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $FrequencyCode = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_prm_fcd, SQLSRV_FETCH_ASSOC)) {	
		 
			   $FrequencyCode[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_prm_fcd) );
	
	
returnData($FrequencyCode);

sqlsrv_free_stmt($stmt_prm_fcd);
sqlsrv_close($conn);

function returnData($FrequencyCode)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$FrequencyCode
    ];

   

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